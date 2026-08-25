import { spotRank, SpotType } from "../enums/SpotType.js";
import { VehicleType } from "../enums/VehicleType.js";
import type { Vehicle } from "./Vehicle.js";

export class ParkingSpot {
    private vehicle: Vehicle | null = null;

    public constructor(
        private readonly id: number,
        private readonly type: SpotType
    ) {}

    public getId(): number {
        return this.id;
    }

    public getType(): SpotType {
        return this.type;
    }

    public isAvailable(): boolean {
        return this.vehicle === null;
    }

    public getVehicle(): Vehicle | null {
        return this.vehicle;
    }

    public canFit(vehicle: Vehicle): boolean {
        const required = this.requiredSpots(vehicle);
        return spotRank[this.type] >= spotRank[required];
    }

    public park(vehicle: Vehicle): void {
        if (!this.isAvailable()) {
            throw new Error(`Spot ${this.id} is already occupied`);
        }
        if(!this.canFit(vehicle)) {
            throw new Error(`Vehicle ${vehicle.getLicensePlate()} cannot fit in spot ${this.id}`);
        }
        this.vehicle = vehicle;
    }

    public removeVehicle(): Vehicle {
        if (!this.vehicle){
            throw new Error(`Spot ${this.id} is already empty`)
        }
        const vehicle = this.vehicle;
        this.vehicle = null;
        return vehicle;
    }

    // -- privates
    private requiredSpots(vehicle: Vehicle): SpotType {
        switch(vehicle.getType()) {
            case VehicleType.MOTORCYCLE:
                return SpotType.COMPACT;
            case VehicleType.CAR:
                return SpotType.REGULAR;
            case VehicleType.TRUCK:
                return SpotType.LARGE;
            default:
                throw new Error(`Unsupported vehicle type : ${vehicle.getType()}`)
        }
    }
}