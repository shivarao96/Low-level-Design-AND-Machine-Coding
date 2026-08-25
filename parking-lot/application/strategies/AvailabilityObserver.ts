import type { ParkingFloor } from "../../domain/entities/ParkingFloor.js";
import type { ParkingObserver } from "../ports/ParkingObserver.js";

export class AvailabilityObserver implements ParkingObserver {
    public onAvailability(floor: ParkingFloor): void {
        const counts = floor.getAvailableCountByType();
        console.log(
            `[Availability] floor=${floor.getId()} compact=${counts.COMPACT} regular=${counts.REGULAR} large=${counts.LARGE}`,
        );
    }
}