# Game design

*Working draft — the direction for Fiefmarch, not a finished specification.*

Fiefmarch is a turn-based medieval strategy game about positioning a small army, developing territory, and deciding what ground is worth holding. It draws broad inspiration from *Feudal*, *Catan*, and *Age of Empires II*, but isn't meant to recreate any of them.

## What should matter

A match begins with secret placement of each player's keep and starting army. Choosing where to settle should matter: access to gold might favor specialized units, while forests and stone might favor building defenses.

The map should feel different each game without handing one player a better starting position. Terrain and resources are generated from a seed and mirrored to give opponents comparable opportunities.

We want short, consequential turns. Players should make a few decisions at a time rather than move an entire army before anyone else can respond. Terrain, positioning, and unit matchups should matter more than stacking raw strength.

Expansion should create both opportunities and risks. Farms, camps, quarries, and mines provide resources, but also give opponents targets beyond the army itself. A keep supplies enough baseline income that losing an outlying site doesn't make recovery impossible.

## Players and format

The long-term target is 2–4 players: head-to-head, 2v2, and four-player free-for-all. We'll start by testing 1v1 rules. Three-player fairness and how larger matches should handle turn order still need work.

Fiefmarch should also be playable with physical pieces and resource cards. We should be skeptical of rules that demand constant arithmetic, hidden digital counters, or routine troop upkeep. Deterministic combat and small movement allowances help keep play understandable at the table.

## What we haven't settled

The game still needs a victory condition, a complete command structure, and a combat formula. Board size, starting armies, building costs, production rates, and the exact capture rules also need playtesting. We'll settle those deliberately rather than let the first implementation decide for us.

The [working rules](rules.md) collect the mechanics and trial values discussed so far.
