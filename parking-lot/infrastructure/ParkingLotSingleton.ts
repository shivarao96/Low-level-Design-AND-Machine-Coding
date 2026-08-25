import type { IdGenerator } from "../application/ports/IdGenerator.js";
import type { PricingStrategy } from "../application/ports/PricingStrategy.js";
import type { SpotAllocationStrategy } from "../application/ports/SpotAllocationStrategy.js";
import { ParkingLotService, type ParkingLotConfig } from "../services/ParkingLotService.js";

export class ParkingSingleton {
    private static instance: ParkingLotService | null = null;
    private constructor() { }

    public static getInstance(
        config: ParkingLotConfig,
        allocationStrategy: SpotAllocationStrategy,
        pricingStrategy: PricingStrategy,
        idGenerator: IdGenerator
    ): ParkingLotService {
        if (!this.instance) {
            this.instance = new ParkingLotService(
                config,
                allocationStrategy,
                pricingStrategy,
                idGenerator
            )
        }
        return this.instance;
    }

    public static resetForTests(): void {
        this.instance = null;
    }
}