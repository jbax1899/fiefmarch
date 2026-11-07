# Maps

Standard maps use a square grid, reproducible seeds, and **exact rotational symmetry**. The generator creates terrain, resource sites, keeps, and starting units in one region, then rotates that region for the other players.

- 1v1: 12×12 board, 180° symmetry.
- 2v2 and four-player free-for-all: 16×16 board, 90° symmetry.
- In 2v2, teammates start in opposite corners.

Starting keeps sit one tile in from each pair of board edges. On a 12×12 board they are at (1,1) and (10,10), using zero-based coordinates. On a 16×16 board they are at (1,1), (14,1), (14,14), and (1,14). Infantry starts on the diagonally inward neighboring tile, and the worker starts in the keep.

## Terrain

| Terrain  | Movement cost | Resource                     |
| -------- | ------------: | ---------------------------- |
| Plains   |             1 | Marked fertile sites         |
| Forest   |             2 | Marked timber sites          |
| Desert   |             1 | None                         |
| Mountain |    Impassable | Marked Stone or Gold deposit |
| Water    |    Impassable | Marked fish deposit          |

Mountains form ranges, water forms connected lakes or coastlines, and forests form clusters. Fertile and timber sites are marked within plains and forests; not every tile produces resources. Features crossing a symmetry boundary must meet cleanly. Rivers may be represented as connected water tiles. Roads are built during play, not generated as starting advantages.

## Required resource access

A home zone is the 6×6 corner around each keep in every standard mode. Each home zone must have:

| Resource sites | Sites per zone | Maximum worker travel cost from keep |
| -------------- | -------------: | -----------------------------------: |
| Food           |            2–3 |                                    4 |
| Wood           |            2–3 |                                    5 |
| Stone          |            1–2 |                                    7 |

Gold is placed outside home zones, toward the board center and opposing players. Each keep must have a usable Gold mine location 6–8 worker movement points away. No Gold mine location may be closer than 6 movement points to any starting keep.

Distance means the shortest legal worker path to a usable camp tile without roads, using terrain movement costs. Farms and lumber camps use marked resource tiles; fish, Stone, and Gold require one orthogonally adjacent, passable camp tile.

Every resource site must have a legal camp location. The map must allow all sites to be worked at once without camps sharing a tile. A deposit supports one camp, even if several tiles could serve it.

The generator also requires:

- At least one farm site in each home zone.
- No more than 25% impassable tiles in a home zone.
- At least three passable orthogonal tiles around each starting keep for recruitment.
- Two independent passable routes from each keep toward the contested middle, excluding the keep tile itself.
- Reachable resource sites without needing roads or crossing enemy starting positions.
- Additional resource sites near the center to reward expansion.
- Exactly matching starting geography and resource sites after rotation.

The map generator should create connected features, then place resources, and reject any seed that fails these checks. A narrow pass can be useful, but no single tile should block every route between two players.

Handcrafted maps use the same tile format and fairness checks.
