import type { ParkingTicket } from "../../domain/entities/ParkingTicket.js";
import type { PricingStrategy } from "../ports/PricingStrategy.js";

export class HourlyPricingStrategy implements PricingStrategy {
    public calculate(ticket: ParkingTicket, exitTime: Date): number {
        const durationMs = Math.max(0, exitTime.getTime() - ticket.entryTime.getTime());
        const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
        return hours * this.hourlyRate;
    }

    constructor(public readonly hourlyRate: number) {
        if (hourlyRate < 0) throw new Error("Hourly rate cannot be negative");
    }
}