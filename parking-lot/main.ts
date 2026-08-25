/**
 * Requirements:
 * -------------
 * 1. The parking lot consists of multiple levels, and each level has a configurable number of parking spots.
 * 2. The system must support various types of vehicles: Car, Motorcycle, and Truck.
 * 3. Each parking spot supports a specific vehicle type.
 * 4. The system should be able to:
 * -> Assign a parking spot to an incoming vehicle.
 * -> Free a spot when a vehicle exits.
 * -> Track and report spot availability in real time.
 * 5. The system should support multiple entry and exit points with concurrent access handling (simulate multi-threading behavior where needed).
 * 6. The design must showcase solid TypeScript OOP principles: classes, interfaces, abstract classes, and enums.
 * 
 * 
 * Design patterns used:
 * ---------------------
 * 1. Use TypeScript with classes, interfaces, and enums.
 * -> Singleton: Ensure only one instance of the ParkingLot exists.
 * -> Factory(optional): For creating vehicles dynamically.
 * -> Observer(optional): To notify users when a spot becomes available.
 * 2. Ensure thread-safety where required using appropriate concurrency-safe constructs (e.g., Mutex simulation, Promise control).
 * 
 */

import { AvailabilityObserver } from "./application/strategies/AvailabilityObserver.js";
import { HourlyPricingStrategy } from "./application/strategies/HourlyPricingStrategy.js";
import { NearestSpotStrategy } from "./application/strategies/NearestSpotStrategy.js";
import { UuidGenerator } from "./application/strategies/UuidGenerator.js";
import { VehicleType } from "./domain/enums/VehicleType.js";
import { DefaultVehicleFactory } from "./factories/DefaultVehicleFactory.js";
import { ParkingLotBuilder } from "./infrastructure/ParkingLotBuilder.js";
import { ParkingSingleton } from "./infrastructure/ParkingLotSingleton.js";
import type { ParkingLotService } from "./services/ParkingLotService.js";

export function main() {
    const floors = ParkingLotBuilder.buildFloors([
        { compact: 2, regular: 3, large: 1 },
        { compact: 1, regular: 2, large: 1 },
    ]);
    const parkingLot: ParkingLotService = ParkingSingleton.getInstance(
        { floors },
        new NearestSpotStrategy(),
        new HourlyPricingStrategy(50),
        new UuidGenerator()
    )
    parkingLot.addObserver(new AvailabilityObserver());
    // --- 
    const vehicleFactory = new DefaultVehicleFactory();
    const car = vehicleFactory.create(VehicleType.CAR, 'OD-01-AA-1111');
    const motorcycle = vehicleFactory.create(
        VehicleType.MOTORCYCLE,
        "OD-01-BB-2222",
    );
    const truck = vehicleFactory.create(VehicleType.TRUCK, "OD-01-CC-3333");

    const carParkingTicket = parkingLot.park(car);
    console.log(`Car parked: ticket=${carParkingTicket.id}, spot=${carParkingTicket.spot.getId()}`);
    const motorCycleParkingTicket = parkingLot.park(motorcycle);
    console.log(
        `Motorcycle parked: ticket=${motorCycleParkingTicket.id}, spot=${motorCycleParkingTicket.spot.getId()}`,
    );
    const truckParkingTicket = parkingLot.park(truck);
    console.log(`Truck parked: ticket=${truckParkingTicket.id}, spot=${truckParkingTicket.spot.getId()}`);

    console.log(
        `Capacity=${parkingLot.getTotalCapacity()}, available=${parkingLot.getAvailableSpots()}`,
    );

    const result = parkingLot.unpark("OD-01-AA-1111", new Date(carParkingTicket.entryTime.getTime() + 2 * 60 * 60 * 1000));
    console.log(`Car exited: fee=${result.fee}`);

}