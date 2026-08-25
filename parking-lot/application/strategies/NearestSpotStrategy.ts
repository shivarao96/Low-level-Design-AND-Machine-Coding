import type { ParkingFloor } from "../../domain/entities/ParkingFloor.js";
import type { ParkingSpot } from "../../domain/entities/ParkingSpot.js";
import type { Vehicle } from "../../domain/entities/Vehicle.js";
import type { SpotAllocationStrategy } from "../ports/SpotAllocationStrategy.js";

export class NearestSpotStrategy implements SpotAllocationStrategy {
    public findSpot(floors: readonly ParkingFloor[], vehicle: Vehicle): ParkingSpot | null {
        for (const floor of floors) {
            for (const spot of floor.getSpots()) {
                if (spot.isAvailable() && spot.canFit(vehicle)) {
                    return spot;
                }
            }
        }
        return null;
    }
}