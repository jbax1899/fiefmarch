# Game design

Fiefmarch is a turn-based medieval strategy game about commanding a small army, building a settlement, and fighting over territory. It takes some inspiration from _Feudal_, _Catan_, and _Age of Empires II_, but we're developing our own rules and identity.

This document describes the kind of game we're aiming for. The [working rules](rules.md) cover the mechanics we've discussed so far.

## How a match should feel

Players secretly choose where to place their starting keep and army. That first decision should shape their options. A position near gold might help recruit specialized units, while access to forests and stone could make it easier to build defenses.

Maps should change between matches without giving one side a clear advantage. We'll generate terrain and resources from a seed, then mirror the layout so opposing players have comparable starting opportunities.

Turns should be short enough to keep everyone involved. Rather than moving an entire army at once, players would make a few decisions before control passes to someone else. Terrain, positioning, and unit matchups should matter more than sheer numbers.

Holding land needs to be worth the effort. Farms, lumber camps, quarries, and mines bring in resources, but they're also places an opponent can attack. Each keep provides some basic income, so losing an outlying site doesn't leave a player with no way to recover.

## Players and tabletop play

We're aiming for 2–4 players, with 1v1, 2v2, and four-player free-for-all matches. We'll work out the basic rules in 1v1 first. Three-player balance and turn order for larger games still need attention.

The same rules should also work on a physical table. Pieces, resource cards, and a few markers ought to be enough to track a match. That means avoiding constant calculations, routine troop upkeep, and mechanics that are practical only when a computer handles them.

## Still to decide

We haven't chosen a victory condition or settled the command and combat rules. Board size, starting armies, building costs, resource yields, and capture timing also need testing. Those decisions belong in the rules discussion, not in assumptions made while writing the game code.
