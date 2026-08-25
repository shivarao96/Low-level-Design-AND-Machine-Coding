import type { ParkingFloor } from "../../domain/entities/ParkingFloor.js";

export interface ParkingObserver {
    onAvailability(floor: ParkingFloor): void;
}