# Edicts

Edicts cost Gold and one action. Each has its own cooldown per player, and different Edicts can be used in the same round. Edicts, Gold balances, and cooldowns are public.

A cooldown of 2 means an Edict used in round 4 is available again in round 6.

| Edict       | Gold | Cooldown | Effect                                                                                                             |
| ----------- | ---: | -------: | ------------------------------------------------------------------------------------------------------------------ |
| Muster      |    1 | 3 rounds | Recruit two infantry from one of your keeps, paying 2 Food                                                         |
| Entrench    |    1 | 2 rounds | Give one friendly infantry or spearman on open ground 1 cover until it moves, attacks, or the cover absorbs damage |
| Rally       |    2 | 3 rounds | Restore 1 HP to up to two friendly military units within 2 orthogonal tiles of a friendly keep                     |
| Border Levy |    2 | 3 rounds | Recruit infantry at a friendly fort, paying 1 Food                                                                 |
| Requisition |    1 | 2 rounds | Gain 3 Food, 2 Wood, or 1 Stone                                                                                    |

## Restrictions

- Muster uses that keep's recruitment for the round. Both infantry need legal spawn tiles and capacity.
- Border Levy spawns inside a friendly fort if possible, otherwise on an adjacent passable tile. It may use a teammate's fort. The issuer pays Gold and Food, owns the infantry, and uses their own unit capacity and cooldown. Forts have no per-round recruitment limit. New infantry cannot act until the next round.
- Entrench works on camps, but not forts or keeps. Its cover cannot stack or be carried onto another tile. Rally can heal an entrenched unit without removing cover.
- In team games, Entrench and Rally may target teammates' units. The issuer pays Gold and uses their own cooldown.
- Rally may use any friendly keep above 0 structural HP, including a teammate's. Its range is two orthogonal steps, including turns.
- Rally cannot heal above 3 HP.
- Edicts cannot bypass attack or construction limits, a keep's recruitment limit, or the delay before new military units can act.
