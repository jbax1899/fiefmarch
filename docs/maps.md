# Maps

Standard maps use seeded square grids with **exact rotational symmetry**. Terrain, resources, keeps, and starting units are rotated from one region into the others.

- 1v1: 12×12 board, 180° symmetry.
- 2v2 and four-player free-for-all: 16×16 board, 90° symmetry.
- In 2v2, teammates start in opposite corners.

Starting keeps sit one tile in from each corner. Using zero-based coordinates, they occupy (1,1) and (10,10) on 12×12 maps, or (1,1), (14,1), (14,14), and (1,14) on 16×16 maps. Infantry starts diagonally inward from the keep; the worker starts inside.

## Terrain

| Terrain  | Movement cost | Resource                     |
| -------- | ------------: | ---------------------------- |
| Plains   |             1 | Marked fertile sites         |
| Forest   |             2 | Marked timber sites          |
| Desert   |             1 | None                         |
| Mountain |    Impassable | Marked Stone or Gold deposit |
| Water    |    Impassable | Marked fish deposit          |

Mountains form ranges, water forms connected lakes or coastlines, and forests grow in clusters. Only marked plains and forest tiles provide Food or Wood. Terrain crossing a symmetry boundary must connect. Rivers can use connected water tiles. Players build roads during matches.

## Required resource access

Each keep's 6×6 corner home zone must have:

| Resource sites | Sites per zone | Maximum worker travel cost from keep |
| -------------- | -------------: | -----------------------------------: |
| Food           |            2–3 |                                    4 |
| Wood           |            2–3 |                                    5 |
| Stone          |            1–2 |                                    7 |

Gold sits outside home zones, toward the center and opponents. Each keep must have a usable Gold mine location 6–8 worker movement points away, and none may be within 6 points of any starting keep.

Distances use the shortest legal worker path to a camp tile, without roads. Farms and lumber camps occupy marked resource tiles; fish, Stone, and Gold camps use an adjacent passable tile.

Every site needs a legal camp tile. All sites must be workable at once without sharing camp tiles. Each deposit supports only one camp.

Maps must also have:

- At least one farm site in each home zone.
- No more than 25% impassable tiles in a home zone.
- At least three passable tiles orthogonally adjacent to each starting keep for recruitment.
- Two separate passable routes from each keep toward the center, excluding the keep tile.
- Resource sites reachable without roads or passing through enemy starting positions.
- Additional resource sites near the center to reward expansion.
- Identical starting terrain and resource sites after rotation.

Generate connected terrain first, then resources. Reject seeds that fail these checks or leave a single tile as the only route between two players.

Handcrafted maps use the same tile format and checks.
