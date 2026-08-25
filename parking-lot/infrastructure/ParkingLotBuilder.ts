import { ParkingFloor } from "../domain/entities/ParkingFloor.js";
import { ParkingSpot } from "../domain/entities/ParkingSpot.js";
import { SpotType } from "../domain/enums/SpotType.js";

export interface FloorLayout {
    compact: number;
    regular: number;
    large: number;
}

export class ParkingLotBuilder {
    public static buildFloors(layouts: readonly FloorLayout[]) {
        let spotId = 1;
        return layouts.map((layout, floorIndex) => {
            const spots: ParkingSpot[] = [];
            for(let i = 0;i < layout.compact;i++) {
                spots.push(new ParkingSpot(spotId++, SpotType.COMPACT));
            }
            for(let i = 0;i < layout.regular;i++) {
                spots.push(new ParkingSpot(spotId++, SpotType.REGULAR));
            }
            for(let i = 0;i < layout.large;i++) {
                spots.push(new ParkingSpot(spotId++, SpotType.LARGE));
            }

            return new ParkingFloor(floorIndex + 1, spots);
        })
    }
}