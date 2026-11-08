# Edicts

Edicts are public special actions paid for with Gold. They cost one action each. Every Edict has its own cooldown for each player, and a player may use different Edicts in the same round.

A cooldown of 2 means an Edict used in round 4 is available again in round 6. Cooldowns and Gold balances are public. Edicts cannot bypass the once-per-round attack limit or the rule that new military units cannot act until the next round.

| Edict        | Gold | Cooldown | Effect                                                                                                             |
| ------------ | ---: | -------: | ------------------------------------------------------------------------------------------------------------------ |
| Muster       |    1 | 3 rounds | Recruit two infantry from one of your keeps, paying 2 Food                                                         |
| Entrench     |    1 | 2 rounds | Give one friendly infantry or spearman on open ground 1 cover until it moves, attacks, or the cover absorbs damage |
| Rally        |    2 | 3 rounds | Restore 1 HP to up to two friendly military units within 2 orthogonal tiles of a friendly keep                     |
| Border Levy  |    2 | 3 rounds | Recruit infantry at a friendly fort, paying 1 Food                                                                 |
| Requisition  |    1 | 2 rounds | Gain 3 Food, 2 Wood, or 1 Stone                                                                                    |

## Restrictions

- Muster uses that keep's recruitment for the round. Both units need legal spawn tiles and free unit capacity.
- Border Levy follows normal recruitment placement: inside the fort first, then an orthogonally adjacent passable tile. The new infantry is inactive until next round.
- Camps count as open ground for Entrench. Forts and keeps do not. Entrench cannot stack with other cover. Rally can heal an entrenched unit without changing its cover.
- Rally's range counts horizontal and vertical steps, including turns. A unit one tile north and one tile east of a keep is within range.
- Rally cannot restore a unit above 3 HP.
- Edicts do not allow another attack, construction, or recruitment where one has already been used.

Numbers and the roster can change as games are played. Pilfering enemy camps is a normal action, not an Edict.
