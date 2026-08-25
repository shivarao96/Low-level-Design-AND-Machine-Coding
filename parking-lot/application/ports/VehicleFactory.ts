import type { Vehicle } from "../../domain/entities/Vehicle.js";
import type { VehicleType } from "../../domain/enums/VehicleType.js";

export interface VehicleFactory {
    create (type: VehicleType, licensePlate: string): Vehicle;
}