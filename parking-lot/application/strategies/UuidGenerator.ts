import { randomUUID } from "node:crypto";
import type { IdGenerator } from "../ports/IdGenerator.js";

export class UuidGenerator implements IdGenerator {
    public next(): string {
        return randomUUID();
    }
}