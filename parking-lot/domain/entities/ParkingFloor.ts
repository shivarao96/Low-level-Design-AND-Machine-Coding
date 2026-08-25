import { SpotType } from "../enums/SpotType.js";
import type { ParkingSpot } from "./ParkingSpot.js";

export class ParkingFloor {
    public constructor(
        private readonly id: number,
        private readonly spots: readonly ParkingSpot[]
    ) { }

    public getId(): number {
        return this.id;
    }

    public getSpots(): readonly ParkingSpot[] {
        return this.spots;
    }

    public getAvailableCount(): number {
        return this.spots.filter((spot) => spot.isAvailable()).length;
    }

    public getAvailableCountByType(): Record<SpotType, number> {
        return {
            [SpotType.COMPACT]: this.spots.filter(
                (s) => s.isAvailable() && s.getType() === SpotType.COMPACT,
            ).length,
            [SpotType.REGULAR]: this.spots.filter(
                (s) => s.isAvailable() && s.getType() === SpotType.REGULAR,
            ).length,
            [SpotType.LARGE]: this.spots.filter(
                (s) => s.isAvailable() && s.getType() === SpotType.LARGE,
            ).length,
        }
    }
}