export enum SpotType {
  COMPACT = "COMPACT",
  REGULAR = "REGULAR",
  LARGE = "LARGE",
}

export const spotRank: Record<SpotType, number> = {
  [SpotType.COMPACT]: 1,
  [SpotType.REGULAR]: 2,
  [SpotType.LARGE]: 3,
};