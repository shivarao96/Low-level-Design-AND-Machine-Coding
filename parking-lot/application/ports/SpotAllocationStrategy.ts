import type { ParkingFloor } from "../../domain/entities/ParkingFloor.js";
import type { ParkingSpot } from "../../domain/entities/ParkingSpot.js";
import type { Vehicle } from "../../domain/entities/Vehicle.js";

export interface SpotAllocationStrategy {
    findSpot(floors: readonly ParkingFloor[], vehicle: Vehicle): ParkingSpot | null;
}