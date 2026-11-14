# Rules

Fiefmarch is a game of _perfect information_ (players have complete knowledge of the game state), where play is _deterministic_ (the outcome of every action is predictable).

Each player starts with a Keep, from which they may spend resources to create new units (military and Workers).

A player is eliminated when an enemy captures their last Keep or when they resign, after which their units and buildings are removed.

The last surviving player or team wins.

## Match setup

| Mode                     | Board | Target length    |
| ------------------------ | ----- | ---------------- |
| 1v1                      | 12×12 | ~15 minutes    |
| 2v2                      | 16×16 | ~20 minutes |
| 4-player free-for-all | 16×16 | ~30 minutes |

Each player starts with:

- A Keep
- A worker on their Keep
- One infantry unit adjacent to their Keep
- 2 Food and 2 Wood

## Turn play

At the start of a player's turn, they first collect resources - one Food for each of their Keeps, one resource for each resource camp building.

Each player may perform up to **three actions per turn**, or none (unspent actions are lost), in any order.

An "action" includes:

- Move to an empty spot
- Move to attack an enemy
- Recruit a unit
- Build with a worker unit
- Pillage a Camp
- Issue an Edict

## Resource collection

Players collect resources each turn to spend on new buildings, units, and Edicts.

Each Keep provides its owner 1 Food at the start of their turn.

Players may also build resource Camp buildings adjacent to unclaimed resource tiles to collect 1 of that resource each at start-of-turn.

| Resource | Location                                                          | Construction cost |
| -------- | ----------------------------------------------------------------- | ----------------- |
| Wood | Forest tile | 1 Food |
| Food | Fertile plains tile | 1 Food, 1 Wood |
| Food | Water tile (with fish) | 1 Food, 1 Wood |
| Stone | Mountain tile | 1 Food, 1 Wood |
| Gold | Gold deposit tile | 1 Food, 1 Wood |

Players may spend an action to remove one of their own buildings if it is not occupied by an enemy military unit. When a Camp is removed this way, that player may take one of that Camp's resource from the bank.

## Moving units

Movement is orthogonal (left/right/up/down); no diagonal moves.

Tiles have different movement costs based on terrain type:

| Terrain Type | Movement Cost |
| ---------------| ---------- |
| Plains | 1 |
| Desert | 1 |
| Forest | 2 |
| Mountains | Impassible |
| Water | Impassible |

Units may always move at least one tile to a valid location, even if that movement cost exceeds their budget (e.g. Battering Rams, with a movement budget of 1, always move 1 tile).

Players may spend an action to swap the positions of two adjacent military units they control.

One worker and one friendly military unit may share a tile. Friendly military units may pass through each other but may not ever share the same tile. 

Adjacent military units may "march," moving together with increased efficiency. First, declare which two adjacent military units are marching. Those units may move in the same direction (once, or some combination) for the cost of a single action, until either unit expends all of its movement budget (any remaining movement budget is lost). Units may not attack in the same action that they march.

A military unit may "escort" a Worker unit sharing its tile, moving together until either unit expends all of its movement budget (any remaining movement budget is lost), for the cost of a single action. An escort and march may happen at the same time at the cost of **two** actions.

### Roads

When a Worker moves, that player can choose to build a road on any of the tiles passed through that do not already have a road for the total cost of 1 Wood.

Roads allow quicker movement: A unit on a road can travel up to three connected road tiles per movement point, ignoring typical terrain costs. All buildings also act as roads. All players can use any roads (except through enemy Keeps).

## Combat

All military units have **3 health points (HP)**. They have varied costs, movement speed, and damage:

| Unit          | Cost | Damage | Special |
| ------------- | ----- | ----- | ------- |
| Infantry      | 1 Food | 1 | ~ |
| Spearman      | 1 Food, 1 Wood | 1 | +1 to Cavalry | 
| Archer        | 1 Food, 2 Wood | 1 | Ranged attack |
| Cavalry       | 2 Food, 1 Wood, 1 Gold | 1 | +1 to Archers |
| Battering Ram | 2 Wood, 1 Stone, 1 Gold | 0 | +2 to Forts & Keeps |

Military units (except Archers) may perform a melee attack on an enemy unit by moving into that enemy's tile. The enemy unit then takes damage equal to the attacking unit's Damage value plus any special bonuses. If the defender is reduced to 0 HP or below, that unit is removed, and the attacker enters the tile (except on a Keep - see that section for special rules).

Archers attack enemy military one or two tiles away in the same row or column (except over Mountains, Forts, and Keeps). Archers may not attack Forts or Keeps, may not attack enemy Workers, and may not melee attack.

Units cannot perform any actions after attacking for the remainder of that turn.

### Keeps and Forts

Keeps and Forts can be built by Workers on passable tiles without another building (excluding roads). Both provide extra defense to military units within; Keeps additionally generate Food, allow unit recruitment, and provide unit capacity.

| Building | Cost                    | Effect                                   | Max Per Player |
| -------- | ----------------------- | ---------------------------------------- | ------------- |
| Keep     | 2 Wood, 2 Stone, 2 Gold | 1 Food/round, Recruitment, unit capacity | 3 |
| Fort     | 1 Wood, 1 Stone         | Gives its defender cover                 | Unlimited |

New Forts and Keeps cannot be built adjacent (horizontally, vertically, or diagonally) to any other Forts or Keeps.

Keeps have **3 HP** themselves. Attackers must defeat any military unit inside before attacking the Keep itself. Archers cannot attack Keeps.

### Unit capacity and recruitment

Each owned Keep supports **five military units** and **one Worker**.

| Keeps | Maximum military | Maximum workers |
| ------------ | ----------: | --------------: |
| 1            |           5 |               1 |
| 2            |          10 |               2 |
| 3            |          15 |               3 |

Losing or disabling a keep does not remove existing units. Recruitment requires free total capacity; the worker limit only restricts new workers, not military recruitment.

Recruitment costs one action and the listed resources. Players may recruit once per round from each of their own keeps.

Units spawn **inside the keep** if there is room for their type, otherwise on a chosen passable tile orthogonally adjacent to it. Military can spawn with friendly workers, and workers with friendly military, including teammates' units. Enemy units block spawning. Two military units or two workers cannot share a tile.

Recruitment requires resources, capacity, and a legal spawn tile. Invalid choices are blocked and cost no action or resources; they do not use the keep's recruitment for the round.

New military can defend immediately but **cannot move, attack, or pilfer until the next round**, even when recruited by Edicts. New workers may move immediately but cannot build until the next round.

### Cover

When each turn begins, any military units within a Keep or Fort gain **Cover**. When that unit is attacked, if they were to take any damage, one damage point is prevented and Cover is removed for the remainder of that turn. Cover is lost if that unit leaves the tile or the building is removed.

### Pillaging

Enemy military units occupying a tile with a resource Camp prevent resource collection from that source. They owner of the military unit can spend an action to **pilfer** the Camp, gaining 1 of its resource from the bank and removing the Camp from play. A Camp cannot be pilfered on the same turn that the unit moved to occupy it.
