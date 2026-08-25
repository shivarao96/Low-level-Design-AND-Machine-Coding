import type { VehicleFactory } from "../application/ports/VehicleFactory.js";
import { Vehicle } from "../domain/entities/Vehicle.js";
import { VehicleType } from "../domain/enums/VehicleType.js";

export class Motorcycle extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate, VehicleType.MOTORCYCLE);
  }
}

export class Car extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate, VehicleType.CAR);
  }
}

export class Truck extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate, VehicleType.TRUCK);
  }
}

export class DefaultVehicleFactory implements VehicleFactory {
    public create(type: VehicleType, licensePlate: string): Vehicle {
        switch(type) {
            case VehicleType.MOTORCYCLE:
                return new Motorcycle(licensePlate);
            case VehicleType.CAR:
                return new Car(licensePlate);
            case VehicleType.TRUCK:
                return new Truck(licensePlate);
            default: {
                throw new Error(`Unsupported vehicle type: ${type}`);
            }
        }
    }
}