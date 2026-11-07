# Rules

Fiefmarch is played on a square grid. All combat and resource production are deterministic. Unit positions, resources, and Edict cooldowns are public.

See [maps.md](maps.md) for terrain and generation rules, and [edicts.md](edicts.md) for special actions.

## Match setup

| Mode                     | Board | Target length    |
| ------------------------ | ----- | ---------------- |
| 1v1                      | 12×12 | 10–15 minutes    |
| 2v2                      | 16×16 | About 20 minutes |
| Four-player free-for-all | 16×16 | About 20 minutes |

Each player starts with:

- One keep near an assigned corner.
- One worker inside the keep.
- One infantry on the diagonally inward tile beside the keep.
- 2 Food, 2 Wood, 0 Stone, and 0 Gold.

Starting positions are fixed. A player is eliminated when an enemy destroys and occupies their last keep, or when they resign. Elimination removes their units and buildings and ends their turns. The last surviving player or team wins. There is no round limit. All remaining players must agree to a draw.

## Rounds and actions

Each player gets **three actions per round**. Players take one action at a time in a fixed order chosen at match start. Team turns alternate between teams where possible.

An action can move a unit, attack, recruit, build, pilfer a camp, or issue an Edict. Passing gives up the player's remaining actions. Unused actions do not carry over.

- A unit may move multiple times before taking another activity.
- Attacking and pilfering end a military unit's activity for the round.
- Building ends a worker's activity for the round.
- A military unit attacks at most once per round; a worker builds at most once.
- All units become available again at the start of the next round.

Income is collected at the start of each round, before anyone acts.

## Moving

Movement is orthogonal. Normal tiles cost 1 movement point to enter; forests cost 2. Mountains and water are impassable. Any unit can move one adjacent passable tile even if its cost exceeds its movement allowance.

Friendly military units can pass through one another but cannot end on the same tile. Enemy military units block normal movement. Workers do not block friendly military movement or spawning. One worker and one friendly military unit may share a tile. Enemy military entering an unprotected worker's tile removes the worker.

Two friendly military units starting on orthogonally adjacent tiles may move together for one action. Each uses its own movement allowance and follows normal movement rules. Neither can attack during that action.

A worker and military unit starting together may move along the same path for one action. Each has its own movement allowance; the worker stops when its allowance runs out, and the soldier may continue. A worker cannot follow a unit into an enemy tile. If the soldier attacks, the worker remains on its last legal tile.

### Roads

A worker can lay two connected, orthogonal road tiles for 1 Wood and one action. The first is on or next to the worker; the second connects to it.

A unit already on a road can travel two consecutive connected road tiles for 1 movement point. Entering a road from off-road costs 1 point. Roads ignore forest penalties and may cross camp or fort tiles, but not keeps. Any player can use them.

## Units and combat

| Unit          | Movement | Role                          |
| ------------- | -------: | ----------------------------- |
| Infantry      |        2 | Cheap general-purpose soldier |
| Spearman      |        2 | Strong against cavalry        |
| Archer        |        2 | Ranged attacks                |
| Cavalry       |        3 | Fast; strong against archers  |
| Battering ram |        2 | Attacks fortified positions   |
| Worker        |        2 | Builds; cannot attack         |

Military units have **3 HP**. Normal attacks deal 1 damage, with these exceptions:

- Spearmen deal 2 damage to cavalry.
- Cavalry deal 2 damage to archers.
- Rams deal 2 damage to fortified units and keep structures. They cannot attack unfortified units.
- Archers attack enemy military units one or two tiles away along a row or column. Units and mountains block line of sight. Archers cannot attack workers or keep structures.

For melee attacks, move into the enemy's tile to attack. Movement and the attack cost one action. If the enemy survives, the attacker stays on the last legal tile. If the enemy dies, the attacker enters its tile, unless an intact keep blocks entry. A unit already adjacent may attack without moving. Archers attack from their current tile without moving.

Attacking ends the unit's activity. There is no retaliation or random damage. Units at 0 HP are removed immediately.

Units do not heal on their own. Rally can restore military units' HP.

### Cover

A military unit on its own fort or keep is fortified, even after its cover is used. Entrench does not count as fortification.

A soldier occupying a friendly fort or keep gains 1 cover, which absorbs the first point of damage. Unused cover disappears when the unit leaves. Cover does not regenerate automatically, and returning to the same building in the same round does not renew it. Cover cannot stack.

## Resources and camps

| Resource | Produced by                      | Uses                               |
| -------- | -------------------------------- | ---------------------------------- |
| Food     | Keeps, farm camps, fishing camps | Workers and troops                 |
| Wood     | Lumber camps                     | Camps, roads, buildings, equipment |
| Stone    | Quarry camps                     | Forts, keeps, rams                 |
| Gold     | Mining camps                     | Edicts and keeps                   |

A functioning keep produces 1 Food at the start of each round. Each camp produces 1 of its resource at the same time. Camps do not need a worker after construction. There is no troop upkeep. Only marked resource sites can support camps.

When building a camp, its owner chooses one eligible, unclaimed resource site. The claim stays fixed until the camp is removed. A site can be claimed by only one camp, regardless of owner. One camp cannot work multiple sites.

| Camp    | Location                                                          | Construction cost |
| ------- | ----------------------------------------------------------------- | ----------------- |
| Farm    | Marked fertile plains tile                                        | 1 Food, 1 Wood    |
| Lumber  | Marked timber site in forest                                      | 1 Food            |
| Fishing | Passable shore tile orthogonally beside a fish-bearing water tile | 1 Food, 1 Wood    |
| Quarry  | Passable tile orthogonally beside a Stone deposit in mountains    | 1 Food, 1 Wood    |
| Mine    | Passable tile orthogonally beside a Gold deposit in mountains     | 1 Food, 1 Wood    |

A worker must stand on the tile where it builds a camp, fort, or keep. A camp, fort, or keep cannot share a tile with another building. Roads may overlap camps and forts, but not keeps. Fish, Stone, and Gold deposits cannot be walked on or built over.

### Occupation and pilfering

An enemy military unit occupying a camp stops its production but does not change ownership.

A unit on an enemy camp may spend a separate action to **Pilfer**: remove the camp and take 1 of that resource from the bank. Pilfering ends the unit's activity. The site becomes unclaimed and can be worked again. Workers cannot pilfer.

A unit that moved onto an undefended camp may pilfer later that round. A unit that attacked its defender must wait until the next round because attacking ended its activity. If an occupier leaves or is defeated before pilfering, the camp remains and can resume production at the next income step.

## Forts and keeps

| Building | Cost                    | Effect                                   |
| -------- | ----------------------- | ---------------------------------------- |
| Fort     | 1 Wood, 1 Stone         | Gives its defender cover                 |
| Keep     | 2 Wood, 2 Stone, 2 Gold | Recruitment, 1 Food/round, unit capacity |

Forts may be built on passable tiles without another building. A new fort or keep must have at least one tile of space from opposing forts and keeps horizontally and vertically; diagonal adjacency is allowed. Forts have no structural HP. An enemy entering a fort after defeating any defender destroys it.

Keeps have **2 structural HP**. A defending military unit must be defeated before attackers can damage the structure. Ordinary adjacent attacks deal 1 structural damage; rams deal 2. Archers cannot attack keep structures. Attacking the structure may include movement into range, but the attacker stays outside.

At 0 structural HP, a keep cannot recruit or produce Food. An enemy must enter it in a later movement action to destroy it. Structural HP cannot be repaired.

Players may build up to **three keeps per match**, including the starting keep. A new keep needs a passable tile without a building or road, at least four orthogonal grid steps from every existing keep. A destroyed keep cannot be replaced.

## Unit capacity and recruitment

Each surviving keep supports **five units total**, including **one worker**. Players may have at most three workers. Capacity is shared across the House; units are not tied to a particular keep.

| Keeps | Total units | Maximum workers |
| ----- | ----------: | --------------: |
| 1     |           5 |               1 |
| 2     |          10 |               2 |
| 3     |          15 |               3 |

Losing a keep does not remove units already on the board. If the House is over capacity, it cannot recruit until it has room again.

| Unit     | Food | Wood | Stone |
| -------- | ---: | ---: | ----: |
| Worker   |    1 |    0 |     0 |
| Infantry |    1 |    0 |     0 |
| Spearman |    1 |    1 |     0 |
| Archer   |    1 |    2 |     0 |
| Cavalry  |    2 |    1 |     0 |
| Ram      |    0 |    2 |     2 |

Recruiting costs one action and the listed resources. Each keep may recruit once per round.

A unit appears **inside the keep first**, if its type can fit there. Otherwise, the player chooses one of the four orthogonally adjacent passable tiles. Military units can spawn with friendly workers, and workers with friendly military. Enemy units always block spawning. Military units cannot share a tile with other military units, and workers cannot share a tile with other workers. Recruitment is unavailable without enough resources, unit capacity, or a legal spawn tile. Invalid attempts spend no action or resources and do not use that keep's recruitment for the round. The game must prevent invalid recruitment choices.

New military units can defend immediately but **cannot move, attack, or pilfer until the next round**, including those recruited by Edicts. New workers may move immediately but cannot build until the next round.
