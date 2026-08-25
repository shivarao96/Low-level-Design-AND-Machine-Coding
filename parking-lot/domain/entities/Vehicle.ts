import type { VehicleType } from "../enums/VehicleType.js";

export abstract class Vehicle {
    protected constructor(
        private readonly licensePlate: string,
        private readonly type: VehicleType
    ) {
        // if (this.constructor === Vehicle) {
        //     throw new Error("Vehicle abstract class cannot be instantiated");
        // }
        if (!licensePlate.trim()) {
            throw new Error("License plate cannot be empty");
        }
    }

    public getLicensePlate(): string{
        return this.licensePlate;
    }

    public getType(): VehicleType {
        return this.type;
    }
}