import type { ParkingSpot } from "./ParkingSpot.js";
import type { Vehicle } from "./Vehicle.js";

export class ParkingTicket {
    public readonly entryTime: Date;

    public constructor(
        public readonly id: string,
        public readonly vehicle: Vehicle,
        public readonly spot: ParkingSpot,
        entryTime: Date = new Date()
    ) {
        this.entryTime = new Date(entryTime);
    }
}