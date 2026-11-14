# Rules

Fiefmarch is a deterministic game of perfect information: players know the full game state, and every action has a predictable outcome.

Each player starts with a Keep, from which they may spend resources to create new units (military and Workers).

A player is eliminated when an enemy captures their last Keep or when they resign, after which their units and buildings are removed.

The last surviving player or team wins.

## Match setup

| Mode                  | Board | Target length |
| --------------------- | ----- | ------------- |
| 1v1                   | 12×12 | ~15 minutes   |
| 2v2                   | 16×16 | ~20 minutes   |
| 4-player free-for-all | 16×16 | ~30 minutes   |

Each player starts with:

- A Keep
- A worker on their Keep
- One infantry unit adjacent to their Keep
- 2 Food and 2 Wood

Game boards are rotationally symmetric, so every player begins with the same terrain and resources. Some Food, Wood, and Stone are available near each starting Keep, while Gold and additional resources encourage expansion toward the center.

## Turn play

At the start of each player's turn, they first collect resources (see Resource Collection below).

Players may perform up to **three actions per turn** (or none) in any order.

An "action" includes:

- Move to an empty tile
- Move to attack an enemy
- Recruit a unit
- Build with a worker unit
- Remove one of your buildings or roads
- Pillage a Camp
- Issue an Edict

## Resource collection

Each Keep provides its owner 1 Food at the start of their turn.

Players may also build resource Camp buildings adjacent to unclaimed resource tiles to collect 1 of that resource at start of turn.

| Resource | Location               | Construction cost       |
| -------- | ---------------------- | ----------------------- |
| Wood     | Forest tile            | 1 Food                  |
| Food     | Fertile plains tile    | 1 Food, 1 Wood          |
| Food     | Water tile (with fish) | 1 Food, 1 Wood          |
| Stone    | Mountain tile          | 1 Food, 1 Wood          |
| Gold     | Gold deposit tile      | 1 Food, 1 Wood, 1 Stone |

Players may spend an action to remove one of their own buildings or roads while a Worker is on its tile.

## Moving units

Movement is orthogonal (left/right/up/down); no diagonal moves.

Tiles have different movement costs based on terrain type:

| Terrain Type | Movement Cost |
| ------------ | ------------- |
| Plains       | 1             |
| Desert       | 1             |
| Forest       | 2             |
| Mountains    | Impassable    |
| Water        | Impassable    |

Units may always move at least one tile to a valid location, even if that movement cost exceeds their budget (e.g. Battering Rams, with a movement budget of 1, always move 1 tile).

Players may spend an action to swap the positions of two adjacent military units they control.

One worker and one friendly military unit may share a tile. Friendly military units may pass through each other but may not ever share the same tile.

### Marching and escorting

Two adjacent military units you control may "march," taking the same steps together until either exhausts its movement, for one action. Units may not attack in the same action that they march.

A military unit may "escort" a Worker unit sharing its tile, moving together until either unit expends all of its movement budget (any remaining movement budget is lost), for the cost of a single action.

A march and escort may happen at the same time at the cost of **two** actions.

### Roads

Roads allow quicker movement: A unit on a road may travel up to three connected road tiles per movement point, ignoring typical terrain costs. All buildings also act as roads. All players may use any roads (except through enemy Keeps).

When a player moves a Worker, they may choose to build a road on any of the tiles passed through that do not already have a road for the total cost of 1 Stone.

## Combat

All military units have **3 health points (HP)**, and Workers have 1 HP. They have varied costs, movement speed, and damage:

| Unit          | Cost                    | Movement | Damage | Special                                        |
| ------------- | ----------------------- | -------- | ------ | ---------------------------------------------- |
| Worker        | 1 Food                  | 2        | —      | —                                              |
| Infantry      | 1 Food                  | 2        | 1      | —                                              |
| Spearman      | 1 Food, 1 Wood          | 2        | 1      | +1 to Cavalry                                  |
| Archer        | 1 Food, 2 Wood          | 2        | 1      | Ranged attack                                  |
| Cavalry       | 2 Food, 1 Wood, 1 Gold  | 3        | 1      | +1 to Archers                                  |
| Battering Ram | 2 Wood, 1 Stone, 1 Gold | 1        | 0      | +2 to military in Keeps or Forts, and to Keeps |

Military units (except Archers) may perform a melee attack on an enemy unit by moving into that enemy's tile. The enemy unit then takes damage equal to the attacking unit's damage value plus any applicable special bonuses. If the defender is reduced to 0 HP or below, that unit is removed, and the attacker enters the tile (except on a Keep - see that section for special rules).

Archers attack enemy military one or two tiles away in the same row or column (except over Mountains, Forts, and Keeps). Archers may not attack Forts or Keeps, may not attack enemy Workers, and may not melee attack.

Units may not perform any actions after attacking for the remainder of that turn.

### Keeps and Forts

Keeps and Forts may be built by Workers on passable tiles that do not already have a building (excluding roads). Both provide extra defense to military units within; Keeps additionally generate Food, allow unit recruitment, and provide unit capacity.

| Building | Cost                    | Effect                                              | Max Per Player |
| -------- | ----------------------- | --------------------------------------------------- | -------------- |
| Keep     | 2 Wood, 2 Stone, 2 Gold | 1 Food income per turn, Recruitment, unit capacity  | 3              |
| Fort     | 1 Wood, 1 Stone         | Grants military units within Cover at start of turn | Unlimited      |

Keeps also have **3 HP**. Attackers must defeat any military unit inside before attacking the Keep itself.

Forts do not have HP; they are destroyed when an enemy unit moves onto its tile.

New Forts and Keeps may not be built adjacent (horizontally, vertically, or diagonally) to any other Forts or Keeps.

Archers may not attack Keeps or Forts.

### Unit capacity and recruitment

Each owned Keep supports **five military units** (up to 15) and **one Worker** (up to 3).

New units may be recruited at any owned Keep by spending the resource cost and one action each, if doing so would not put that player over their unit capacity for that unit type (military or Workers). Limit of one recruitment per Keep, per turn.

Units are created inside the Keep if able, otherwise on a chosen adjacent passable tile.

New units may not act until your next turn.

### Cover

When your turn begins, your military units within a Keep or Fort gain **Cover**. The next time that unit is attacked and were to take damage, one damage point is prevented and Cover is removed. Cover is lost if that unit moves or the building is removed.

### Pillaging

Enemy military units occupying a tile with a resource Camp prevent resource collection from that source. The owner of the military unit may spend an action to **Pillage** the Camp, gaining 1 of that Camp's resource type from the bank and removing the Camp from play. A Camp may not be Pillaged on the same turn that the unit moved to occupy it.

## Edicts

Edicts may be enacted to trigger special actions by spending one action and the required amount of Gold. Only one Edict may be enacted per turn.

| Edict       | Gold | Effect                                                                             |
| ----------- | ---: | ---------------------------------------------------------------------------------- |
| Rally       |    1 | Restore 1 HP to a friendly military unit                                           |
| Entrench    |    1 | Give one friendly military unit Cover                                              |
| Requisition |    1 | Collect 1 Food, Wood, or Stone                                                     |
| Muster      |    2 | You may recruit at a Keep you own twice this turn, paying the normal resource cost |
| Border Levy |    2 | You may recruit at a Fort you own this turn, paying the normal resource cost       |
| Barrage     |    3 | Does not cost an action; gain one extra action this turn                           |
