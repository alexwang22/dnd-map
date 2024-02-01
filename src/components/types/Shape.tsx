export const CharacterShapes = ["square", "circle"] as const;

export const ObjectShapes = ["square", "circle"] as const;

export const ObstacleShapes = ["rectangle"] as const;

export type Shape =
  | (typeof CharacterShapes)[number]
  | (typeof ObjectShapes)[number]
  | (typeof ObstacleShapes)[number];
