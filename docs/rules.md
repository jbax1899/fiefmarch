# Rules

Fiefmarch is a game of _perfect information_ (players have complete knowledge of the game state), where play is _deterministic_ (the outcome of every action is predictable).

Each player starts with a Keep, from which they can spend resources to create new units.

A player is eliminated when an enemy captures their last Keep or when they resign (their units and buildings are then removed).

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

At the start of a player's turn, they first collect resources - one Food for each of their Keeps, and for each resource camp one of that resource.

Each player can perform up to **three actions per turn**, or none (unspent actions are lost), in any order.

An "action" includes:

- Move to an empty spot
- Move to attack an enemy
- Recruit a unit
- Build with a worker unit
- Pillage a camp
- Issue an [Edict](edicts.md)

## Moving Units

Movement is orthogonal (left/right/up/down); no diagonal moves.

Tiles have different movement costs based on terrain type:

| Terrain Type | Movement Cost |
| ---------------| ---------- |
| Plains | 1 |
| Desert | 1 |
| Forest | 2 |
| Mountains | Impassible |
| Water | Impassible |

Units may always move at least one tile to a valid location, even if that movement cost exceeds their budget (e.g. Rams, with a movement budget of 1, always move 1 tile).

Moving a military unit onto a tile occupied by another military unit swaps their positions.

One worker and one friendly military unit may share a tile. Friendly military units can pass through each other but cannot ever share the same tile. 

Adjacent military units can "march," moving together with increased efficiency. First, declare which two adjacent military units are marching. Those units can move in the same direction (once, or some combination) for the cost of a single action, until either unit expends all of its movement budget (any remaining movement budget is lost). Units cannot attack in the same action that they march.

A military unit can "escort" a Worker unit sharing its tile for the cost of a single action, until either unit expends all of its movement budget (any remaining movement budget is lost). An escort and march can happen at the same time for the cost of **two** actions.

## Resources and camps

Players manage their own resources. Teammates cannot share or transfer them.

| Resource | Produced by                      | Uses                               |
| -------- | -------------------------------- | ---------------------------------- |
| Food     | Keeps, farm camps, fishing camps | Workers and troops                 |
| Wood     | Lumber camps                     | Camps, roads, buildings, equipment |
| Stone    | Quarry camps                     | Forts, keeps, rams                 |
| Gold     | Mining camps                     | Edicts and keeps                   |

At the start of each round, a functioning keep produces 1 Food and each producing camp yields 1 resource. Camps need no worker after construction, and troops have no upkeep. Camps can claim only marked sites.

Each camp claims one eligible, unclaimed resource site when built. Only one camp may claim a site, and the claim lasts until the camp is removed.

| Camp    | Location                                                          | Construction cost |
| ------- | ----------------------------------------------------------------- | ----------------- |
| Farm    | Marked fertile plains tile                                        | 1 Food, 1 Wood    |
| Lumber  | Marked timber site in forest                                      | 1 Food            |
| Fishing | Passable shore tile orthogonally beside a fish-bearing water tile | 1 Food, 1 Wood    |
| Quarry  | Passable tile orthogonally beside a Stone deposit in mountains    | 1 Food, 1 Wood    |
| Mine    | Passable tile orthogonally beside a Gold deposit in mountains     | 1 Food, 1 Wood    |

Workers build on their own tile. Camps, forts, and keeps cannot share tiles with other buildings. Roads may overlap camps and forts, but not keeps. Fish, Stone, and Gold deposits are impassable and cannot be built on.

Players can demolish their own camps for one action unless occupied by enemy military. They recover one construction resource of their choice, and the site becomes unclaimed.

### Roads

A worker builds a road on its tile for one action and 1 Wood. Roads work on plains, forests, and deserts, but not mountains or water. Only one road may occupy a tile.

A unit on a road can travel up to three connected road tiles per movement point. Entering from off-road costs 1 point. Roads ignore forest penalties and can cross camps and forts, but not keeps. Anyone can use them.

## Combat

| Unit          | Movement | Role                          |
| ------------- | -------: | ----------------------------- |
| Infantry      |        2 | Cheap general-purpose soldier |
| Spearman      |        2 | Strong against cavalry        |
| Archer        |        2 | Ranged attacks                |
| Cavalry       |        3 | Fast; strong against archers  |
| Battering ram |        2 | Attacks fortified positions   |
| Worker        |        2 | Builds; cannot attack         |

Military units have **3 HP**. Attacks deal 1 damage except:

- Spearmen deal 2 damage to cavalry.
- Cavalry deal 2 damage to archers.
- Rams deal 2 damage to fortified units and keeps. They cannot attack unfortified units.
- Archers attack enemy military one or two tiles away in the same row or column. Units and mountains block shots. Archers cannot attack workers or keeps.

A melee attack moves into an enemy's tile and costs one action, including the movement. If the defender survives, the attacker stays on its last legal tile. If the defender dies, the attacker enters, except on a keep. Capturing a keep takes a separate movement action after its structural HP reaches 0. Adjacent units can attack without moving; archers always attack from their own tile.

Attacking ends the unit's activity. There is no retaliation or random damage. Units at 0 HP are removed immediately. Only Rally heals military units.

### Cover

Military units on friendly forts or keeps above 0 structural HP are fortified, even after losing their cover. Entrench does not grant fortification.

A soldier on such a building gains 1 cover, absorbing the first point of damage. Cover refreshes at the start of each round while the soldier stays there, and disappears if it leaves, the building is removed, or the keep reaches 0 HP. Returning that round does not restore cover. Cover cannot stack.

### Occupation and pilfering

Enemy military occupying a camp stops its production without taking ownership.

A military unit on an enemy camp can spend a separate action to **Pilfer**, removing it and gaining 1 of its resource from the bank. The site becomes unclaimed and the unit's activity ends.

A unit can move onto an undefended camp and pilfer later that round. If it fought a defender, it must wait until the next round. A camp resumes production at the next income step if the occupier leaves or dies before pilfering.

## Forts and keeps

| Building | Cost                    | Effect                                   |
| -------- | ----------------------- | ---------------------------------------- |
| Fort     | 1 Wood, 1 Stone         | Gives its defender cover                 |
| Keep     | 2 Wood, 2 Stone, 2 Gold | Recruitment, 1 Food/round, unit capacity |

Forts may be built on passable tiles without another building. New forts and keeps must have at least one tile between them and opposing forts or keeps horizontally and vertically; diagonal adjacency is allowed. Forts have no structural HP. Enemy military destroys a fort by entering its tile after defeating any defender.

Keeps have **2 structural HP**. Attackers must defeat any defender first. Adjacent attacks deal 1 structural damage, or 2 from a ram. Archers cannot attack keeps. An attacker may move into range to strike, but stays outside.

At 0 structural HP, a keep stops recruiting, producing Food, supporting units, and granting cover or fortification. Soldiers may still defend its tile. An enemy must enter in a later movement action to destroy it. Keeps cannot be repaired.

Players may build up to **three keeps per match**, including the starting keep. Each new keep needs an empty, passable tile without a road, at least four orthogonal steps from every existing keep. Destroyed keeps cannot be replaced.

## Unit capacity and recruitment

Each keep above 0 structural HP supports **five units**, with **one worker slot**. Players may have at most three workers. Capacity is shared across the House, not tied to individual keeps.

| Active keeps | Total units | Maximum workers |
| ------------ | ----------: | --------------: |
| 0            |           0 |               0 |
| 1            |           5 |               1 |
| 2            |          10 |               2 |
| 3            |          15 |               3 |

Losing or disabling a keep does not remove existing units. Recruitment requires free total capacity; the worker limit only restricts new workers, not military recruitment.

| Unit     | Food | Wood | Stone |
| -------- | ---: | ---: | ----: |
| Worker   |    1 |    0 |     0 |
| Infantry |    1 |    0 |     0 |
| Spearman |    1 |    1 |     0 |
| Archer   |    1 |    2 |     0 |
| Cavalry  |    2 |    1 |     0 |
| Ram      |    0 |    2 |     2 |

Recruitment costs one action and the listed resources. Players may recruit once per round from each of their own keeps.

Units spawn **inside the keep** if there is room for their type, otherwise on a chosen passable tile orthogonally adjacent to it. Military can spawn with friendly workers, and workers with friendly military, including teammates' units. Enemy units block spawning. Two military units or two workers cannot share a tile.

Recruitment requires resources, capacity, and a legal spawn tile. Invalid choices are blocked and cost no action or resources; they do not use the keep's recruitment for the round.

New military can defend immediately but **cannot move, attack, or pilfer until the next round**, even when recruited by Edicts. New workers may move immediately but cannot build until the next round.
