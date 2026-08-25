import type { ParkingTicket } from "../../domain/entities/ParkingTicket.js";

export interface PricingStrategy {
    calculate(ticket: ParkingTicket, exitTime: Date): number;
}