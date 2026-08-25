import type { IdGenerator } from "../application/ports/IdGenerator.js";
import type { ParkingObserver } from "../application/ports/ParkingObserver.js";
import type { PricingStrategy } from "../application/ports/PricingStrategy.js";
import type { SpotAllocationStrategy } from "../application/ports/SpotAllocationStrategy.js";
import type { ParkingFloor } from "../domain/entities/ParkingFloor.js";
import type { ParkingSpot } from "../domain/entities/ParkingSpot.js";
import { ParkingTicket } from "../domain/entities/ParkingTicket.js";
import type { Vehicle } from "../domain/entities/Vehicle.js";
import type { SpotType } from "../domain/enums/SpotType.js";

export interface ParkingLotConfig {
    floors: readonly ParkingFloor[];
}

export class ParkingLotService {
    private readonly activeTickets = new Map<string, ParkingTicket>();
    private readonly observers = new Set<ParkingObserver>();

    public constructor(
        private readonly config: ParkingLotConfig,
        private readonly allocatedStrategy: SpotAllocationStrategy,
        private readonly pricingStrategy: PricingStrategy,
        private readonly idGenerator: IdGenerator
    ) {}

    public addObserver(observer: ParkingObserver) {
        this.observers.add(observer);
    }

    public removeObserver(observer: ParkingObserver) {
        this.observers.delete(observer);
    }

    public park(vehicle: Vehicle): ParkingTicket {
        if (this.activeTickets.has(vehicle.getLicensePlate())) {
            throw new Error(`Vehicle ${vehicle.getLicensePlate()} is already parked`);
        }

        const spot = this.allocatedStrategy.findSpot(this.config.floors, vehicle);
        if (!spot) {
            throw new Error(`No available spot for ${vehicle.getLicensePlate()}`);
        }

        spot.park(vehicle);
        const ticket = new ParkingTicket(
            this.idGenerator.next(),
            vehicle,
            spot
        )
        this.activeTickets.set(vehicle.getLicensePlate(), ticket);
        this.notifyFloorChanged(spot);
        return ticket;
    }

    public unpark(
        licensePlate: string,
        exitTime: Date = new Date()
    ): {vehicle: Vehicle, fee: number, ticket: ParkingTicket} {
        const ticket = this.activeTickets.get(licensePlate);
        if(!ticket) {
            throw new Error(`Vehicle ${licensePlate} is not parked`);
        }
        const vehicle = ticket.spot.removeVehicle();
        const fee = this.pricingStrategy.calculate(ticket, exitTime);
        this.activeTickets.delete(licensePlate);
        return {vehicle, fee, ticket}
    }

    public findVehicle(licensePlate: string): ParkingSpot | null {
        const ticket = this.activeTickets.get(licensePlate);
        return ticket?.spot || null;
    }

    public getActiveTicket(licensePlate: string): ParkingTicket | null {
        return this.activeTickets.get(licensePlate) || null;
    }

    public getTotalCapacity(): number {
        return this.config.floors.reduce((total, floor)=>{
            return total + floor.getSpots().length
        }, 0)
    }

    public getAvailableSpots(): number {
        return this.config.floors.reduce((total, floor)=>{
            return total + floor.getAvailableCount()
        }, 0)
    }

    public getFloors(): readonly ParkingFloor[] {
        return this.config.floors;
    }

    //-- private
    private notifyFloorChanged(spot: ParkingSpot): void {
        const floor = this.config.floors.find((f) => f.getSpots().some((s) => s.getId() === spot.getId()));
        if (!floor) return;
        for (const observer of this.observers) {
            observer.onAvailability(floor);
        }
    }

}