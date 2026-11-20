// get tile type/color from map data
/**
 * . = Plains = #A2D149
 * f = Forest = #228B22
 * d = Desert = #EDC9AF
 * m = Mountain = #808080
 * ~ = Water = #1E90FF
 * F = Food = #8B4513
 * G = Gold = #FFD700
 * H = Fish = #008080
 * 1 = Player 1 keep (red 1) = #FF0000
 * 2 = Player 2 keep (blue 2) = #0000FF
 * unknown = #FF00FF (magenta)
 */

type TerrainPlains = "plains" | "fertile plains";

type TerrainForest = "forest";

type TerrainDesert = "desert";

type TerrainMountain = "mountain" | "gold";

type TerrainWater = "ocean" | "lake" | "fish";

export type TerrainKind =
  TerrainPlains | TerrainForest | TerrainDesert | TerrainMountain | TerrainWater | undefined;
