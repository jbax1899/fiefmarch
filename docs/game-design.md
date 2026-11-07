# Game design

Fiefmarch is a short, turn-based medieval strategy game. Players build small domains, raise armies, and fight for control of the map.

Each player has three actions per round. Moving an army, recruiting soldiers, building a camp, and issuing an Edict all draw from the same allowance. Players need to grow their economy while keeping enough troops in the field to protect it.

## Matches

Standard 1v1 games use a 12×12 board. Team games and four-player free-for-all use 16×16. The targets are 10–15 minutes for 1v1 and around 20 minutes for four players.

Everyone starts with a keep, a worker, an infantry unit, and a few resources. There is no placement phase. The last player or team with a surviving keep wins.

Maps are generated from seeds with exact rotational symmetry. Each player has reliable access to basic resources, while valuable positions nearer the center give players reasons to advance. Handcrafted maps can follow the same rules.

## Building and fighting

Camps produce Food, Wood, Stone, and Gold. Gold pays for Edicts and additional keeps. Armies protect production, occupy enemy camps, and pilfer them for a small reward. An enemy cannot simply take over a working camp.

Keeps recruit soldiers and raise the owner's unit capacity. New soldiers can defend immediately but cannot move or attack until the next round. Fighting is deterministic, with short movement ranges and a few clear unit matchups.

The game should work on desktop and mobile browsers, and remain manageable as a physical board game. Visually, it takes the form of a medieval tabletop diorama. Most of the setting is serious; House names and small details provide the humor.

See the [rules](rules.md), [map rules](maps.md), and [Edicts](edicts.md).
