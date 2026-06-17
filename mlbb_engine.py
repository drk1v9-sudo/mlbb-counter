"""
MLBB Draft Counter Picker Engine (Local, no web scraping)
All hero data, counter logic, and analysis built-in.
"""

import re

# ─── HERO DATABASE ────────────────────────────────────────────────────────────

HERO_ROLES = {
    # ROAM
    "khufra":     ("roam", "exp", "physical", "low", "high", "high", "high"),
    "minsitthar": ("roam", "exp", "physical", "low", "high", "high", "high"),
    "franco":     ("roam", "exp", "physical", "low", "high", "medium", "medium"),
    "diggie":     ("roam", "mid", "magic", "low", "high", "low", "low"),
    "atlas":      ("roam", "exp", "magic", "low", "high", "high", "high"),
    "tigreal":    ("roam", "exp", "magic", "low", "high", "high", "high"),
    "akai":       ("roam", "jungle", "physical", "high", "high", "high", "high"),
    "kaja":       ("roam", "exp", "magic", "high", "high", "medium", "medium"),
    "carmilla":   ("roam", "mid", "magic", "medium", "high", "medium", "medium"),
    "rafaela":    ("roam", "mid", "magic", "high", "medium", "low", "low"),
    "estes":      ("roam", "mid", "magic", "low", "low", "low", "low"),
    "angela":     ("roam", "mid", "magic", "high", "low", "low", "low"),
    "mathilda":   ("roam", "exp", "magic", "high", "medium", "low", "low"),
    "baxia":      ("roam", "jungle", "physical", "high", "medium", "high", "high"),
    "hylos":      ("roam", "exp", "magic", "low", "high", "high", "high"),
    "belerick":   ("roam", "exp", "magic", "low", "high", "high", "high"),
    "lolita":     ("roam", "exp", "magic", "low", "high", "high", "high"),
    "gloo":       ("roam", "exp", "magic", "low", "high", "high", "high"),
    "johnson":    ("roam", "exp", "physical", "low", "high", "high", "high"),
    # EXP
    "chou":       ("exp", "roam", "physical", "high", "high", "medium", "medium"),
    "ruby":       ("exp", "roam", "physical", "medium", "high", "high", "high"),
    "esmeralda":  ("exp", "mid", "magic", "medium", "medium", "high", "high"),
    "yu_zhong":   ("exp", "jungle", "physical", "medium", "medium", "high", "high"),
    "uranus":     ("exp", "roam", "magic", "low", "medium", "high", "high"),
    "terizla":    ("exp", "roam", "physical", "low", "medium", "high", "high"),
    "thamuz":     ("exp", "jungle", "physical", "low", "low", "high", "high"),
    "paquito":    ("exp", "roam", "physical", "high", "high", "medium", "medium"),
    "benedetta":  ("exp", "jungle", "physical", "high", "medium", "medium", "low"),
    "cici":       ("exp", "gold", "physical", "high", "medium", "medium", "low"),
    "dyrroth":    ("exp", "jungle", "physical", "medium", "low", "medium", "medium"),
    "barats":     ("exp", "roam", "physical", "low", "high", "high", "high"),
    "grock":      ("exp", "roam", "magic", "medium", "high", "high", "high"),
    "aldous":     ("exp", "jungle", "physical", "low", "low", "high", "high"),
    "alpha":      ("exp", "jungle", "physical", "medium", "low", "medium", "medium"),
    "masha":      ("exp", "jungle", "physical", "high", "low", "high", "medium"),
    "edith":      ("exp", "roam", "magic", "medium", "high", "high", "high"),
    "silvanna":   ("exp", "mid", "magic", "high", "medium", "medium", "medium"),
    "x_borg":     ("exp", "jungle", "physical", "medium", "low", "medium", "medium"),
    "lapu_lapu":  ("exp", "jungle", "physical", "medium", "medium", "medium", "medium"),
    "jawhead":    ("exp", "roam", "physical", "high", "high", "medium", "medium"),
    "freya":      ("exp", "jungle", "physical", "medium", "medium", "medium", "medium"),
    "argus":      ("exp", "jungle", "physical", "medium", "low", "medium", "medium"),
    "sun":        ("exp", "jungle", "physical", "high", "low", "medium", "low"),
    "zilong":     ("exp", "jungle", "physical", "high", "low", "low", "low"),
    "hilda":      ("exp", "roam", "physical", "medium", "low", "high", "high"),
    "balmond":    ("exp", "jungle", "physical", "low", "low", "high", "high"),
    # JUNGLE
    "fanny":      ("jungle", "exp", "physical", "very_high", "low", "low", "low"),
    "ling":       ("jungle", "exp", "physical", "very_high", "low", "low", "low"),
    "hayabusa":   ("jungle", "exp", "physical", "high", "low", "low", "low"),
    "lancelot":   ("jungle", "exp", "physical", "very_high", "low", "low", "low"),
    "gusion":     ("jungle", "mid", "magic", "high", "low", "low", "low"),
    "martis":     ("jungle", "exp", "physical", "high", "high", "medium", "medium"),
    "roger":      ("jungle", "gold", "physical", "high", "low", "medium", "low"),
    "yin":        ("jungle", "exp", "physical", "high", "high", "medium", "medium"),
    "hanzo":      ("jungle", "exp", "physical", "high", "low", "low", "low"),
    "helcurt":    ("jungle", "exp", "physical", "high", "high", "low", "low"),
    "natalia":    ("jungle", "exp", "physical", "high", "low", "low", "low"),
    "alucard":    ("jungle", "exp", "physical", "high", "low", "high", "medium"),
    "harley":     ("jungle", "mid", "magic", "high", "low", "low", "low"),
    "lunox":      ("jungle", "mid", "magic", "high", "low", "low", "low"),
    "karrie":     ("jungle", "gold", "true_dmg", "medium", "low", "low", "low"),
    # MID
    "valentina":  ("mid", "exp", "magic", "high", "low", "low", "low"),
    "kagura":     ("mid", "exp", "magic", "high", "medium", "low", "low"),
    "lylia":      ("mid", "exp", "magic", "high", "low", "high", "low"),
    "chang_e":    ("mid", "gold", "magic", "high", "low", "low", "low"),
    "eudora":     ("mid", "roam", "magic", "low", "very_high", "low", "low"),
    "aurora":     ("mid", "roam", "magic", "low", "very_high", "low", "low"),
    "kadita":     ("mid", "exp", "magic", "medium", "high", "low", "low"),
    "selena":     ("mid", "roam", "magic", "medium", "very_high", "low", "low"),
    "saber":      ("mid", "jungle", "physical", "high", "very_high", "low", "low"),
    "nana":       ("mid", "roam", "magic", "low", "very_high", "low", "low"),
    "yve":        ("mid", "gold", "magic", "low", "medium", "low", "low"),
    "pharsa":     ("mid", "gold", "magic", "low", "low", "low", "low"),
    "alice":      ("mid", "exp", "magic", "high", "medium", "high", "high"),
    "valir":      ("mid", "roam", "magic", "low", "high", "low", "low"),
    "novaria":    ("mid", "gold", "magic", "high", "low", "low", "low"),
    "joy":        ("mid", "jungle", "magic", "high", "medium", "medium", "low"),
    "cecilion":   ("mid", "gold", "magic", "low", "low", "low", "low"),
    "vexana":     ("mid", "roam", "magic", "low", "high", "low", "low"),
    "luo_yi":     ("mid", "gold", "magic", "low", "medium", "low", "low"),
    "zhask":      ("mid", "gold", "magic", "low", "low", "low", "low"),
    "gord":       ("mid", "gold", "magic", "low", "low", "low", "low"),
    "odette":     ("mid", "roam", "magic", "low", "high", "low", "low"),
    "harith":     ("mid", "gold", "magic", "high", "medium", "medium", "low"),
    "xavier":     ("mid", "gold", "magic", "low", "medium", "low", "low"),
    "faramis":    ("mid", "roam", "magic", "medium", "high", "high", "medium"),
    "cyclops":    ("mid", "jungle", "magic", "medium", "low", "low", "low"),
    "kai":        ("mid", "gold", "physical", "medium", "medium", "low", "low"),
    "kamila":     ("mid", "roam", "magic", "high", "high", "medium", "medium"),
    # GOLD
    "claude":     ("gold", "jungle", "physical", "high", "low", "low", "low"),
    "beatrix":    ("gold", "exp", "physical", "low", "low", "low", "low"),
    "brody":      ("gold", "exp", "physical", "low", "low", "medium", "low"),
    "wanwan":     ("gold", "exp", "physical", "high", "medium", "low", "low"),
    "clint":      ("gold", "exp", "physical", "low", "low", "low", "low"),
    "natan":      ("gold", "mid", "magic", "medium", "low", "medium", "low"),
    "lesley":     ("gold", "jungle", "physical", "low", "low", "low", "low"),
    "layla":      ("gold", "mid", "physical", "low", "low", "low", "low"),
    "miya":       ("gold", "jungle", "physical", "low", "low", "low", "low"),
    "irithel":    ("gold", "jungle", "physical", "medium", "low", "low", "low"),
    "melissa":    ("gold", "exp", "physical", "medium", "low", "low", "low"),
    "popol":      ("gold", "exp", "physical", "medium", "medium", "low", "low"),
    "ixia":       ("gold", "exp", "physical", "low", "medium", "low", "low"),
    "fredrinn":   ("roam", "exp", "physical", "low", "high", "high", "high"),
    # ADDITIONAL HEROES
    "aamon":      ("jungle", "mid", "magic", "high", "low", "low", "low"),
    "arlott":     ("exp", "jungle", "physical", "high", "medium", "medium", "medium"),
    "aulus":      ("exp", "jungle", "physical", "medium", "low", "high", "high"),
    "badang":     ("exp", "roam", "physical", "low", "high", "medium", "medium"),
    "bane":       ("exp", "mid", "magic", "low", "medium", "medium", "medium"),
    "bruno":      ("gold", "jungle", "physical", "low", "low", "low", "low"),
    "chip":       ("roam", "exp", "magic", "medium", "high", "high", "high"),
    "floryn":     ("roam", "mid", "magic", "low", "low", "low", "low"),
    "gatotkaca":  ("roam", "exp", "magic", "low", "high", "high", "high"),
    "granger":    ("gold", "jungle", "physical", "low", "low", "low", "low"),
    "guinevere":  ("exp", "mid", "magic", "high", "high", "low", "low"),
    "hanabi":     ("gold", "exp", "physical", "low", "low", "low", "low"),
    "julian":     ("mid", "exp", "magic", "high", "medium", "medium", "low"),
    "karina":     ("jungle", "mid", "magic", "high", "low", "low", "low"),
    "khaleed":    ("exp", "roam", "physical", "medium", "low", "high", "high"),
    "kimmy":      ("gold", "mid", "magic", "low", "low", "low", "low"),
    "leomord":    ("exp", "jungle", "physical", "high", "low", "high", "high"),
    "lukas":      ("exp", "jungle", "physical", "high", "medium", "high", "medium"),
    "marcel":     ("mid", "roam", "magic", "medium", "high", "medium", "low"),
    "minotaur":   ("roam", "exp", "physical", "low", "high", "high", "high"),
    "moskov":     ("gold", "jungle", "physical", "low", "low", "low", "low"),
    "nolan":      ("jungle", "exp", "physical", "high", "low", "low", "low"),
    "phoveus":    ("exp", "roam", "magic", "low", "high", "high", "high"),
    "suyou":      ("exp", "jungle", "physical", "high", "medium", "medium", "medium"),
    "vale":       ("mid", "roam", "magic", "low", "high", "low", "low"),
    "yi_sun_shin":("gold", "jungle", "physical", "high", "low", "low", "low"),
    "zhuxin":     ("mid", "roam", "magic", "high", "high", "low", "low"),
}

# Tags
MOBILE = {k for k, v in HERO_ROLES.items() if v[3] in ("high", "very_high")}
ANTI_DASH = {"khufra", "minsitthar"}
CC_TANKS = {"atlas", "tigreal", "khufra", "minsitthar", "franco", "akai", "kaja", "grock", "lolita", "gloo", "johnson", "minotaur", "gatotkaca", "chip"}
HEALERS = {"estes", "rafaela", "angela", "floryn"}
TRUE_DMG = {"karrie", "lunox", "dyrroth", "alpha"}
SUSTAIN_TANKS = {"uranus", "esmeralda", "hylos", "belerick", "barats", "grock", "terizla", "thamuz", "gloo", "gatotkaca", "minotaur", "khaleed", "leomord", "phoveus"}
POKE_MAGES = {"yve", "pharsa", "novaria", "xavier", "cecilion", "gord", "zhask", "luo_yi"}
DIVE_ASSASSINS = {"fanny", "ling", "hayabusa", "lancelot", "benedetta", "gusion", "yin", "helcurt", "aamon", "karina", "nolan", "suyou"}
BURST_MAGES = {"eudora", "aurora", "kadita", "selena", "saber", "harley", "odette", "vexana", "vale", "zhuxin"}
SETUP_MAGES = {"atlas", "tigreal", "kaja", "carmilla", "khufra"}
PURIFY_COUNTERS = {"atlas", "tigreal", "kaja", "khufra", "chou"}

ALIASES = {}
ALIASES.update({k: k for k in HERO_ROLES})
ALIASES.update({
    "esme": "esmeralda", "yuzhong": "yu_zhong", "uranus": "uranus", "urasmus": "uranus",
    "bene": "benedetta", "haya": "hayabusa", "lance": "lancelot",
    "bea": "beatrix", "nova": "novaria", "vale": "valentina",
    "change": "chang_e", "min": "minsitthar", "john": "johnson", "jonson": "johnson",
    "kupa": "popol", "popol": "popol", "xborg": "x_borg",
    "lapu": "lapu_lapu", "ceci": "cecilion", "luoyi": "luo_yi",
    "ixia": "ixia", "fred": "fredrinn", "fredrinn": "fredrinn",
    "gloo": "gloo", "gloom": "gloo",
    "aamon": "aamon", "arlott": "arlott", "aulus": "aulus",
    "badang": "badang", "bane": "bane", "bruno": "bruno",
    "chip": "chip", "floryn": "floryn", "flo": "floryn",
    "gatot": "gatotkaca", "gatotkaca": "gatotkaca",
    "granger": "granger", "guinevere": "guinevere", "guin": "guinevere",
    "hanabi": "hanabi", "julian": "julian",
    "karina": "karina", "khaleed": "khaleed",
    "kimmy": "kimmy", "leomord": "leomord", "leo": "leomord",
    "lukas": "lukas", "marcel": "marcel",
    "minotaur": "minotaur", "mino": "minotaur",
    "moskov": "moskov", "nolan": "nolan",
    "phoveus": "phoveus", "phov": "phoveus",
    "suyou": "suyou", "soyou": "suyou",
    "vale": "vale", "yisunshin": "yi_sun_shin", "yi sun shin": "yi_sun_shin",
    "zhuxin": "zhuxin",
})


def normalize(name):
    n = name.strip().lower().replace(" ", "_").replace("-", "_")
    if n in ALIASES:
        return ALIASES[n]
    for alias, canon in ALIASES.items():
        if n == alias[:len(n)] or alias == n[:len(alias)]:
            return canon
    return n


def get_info(hero):
    return HERO_ROLES.get(hero, (None,)*7)


# ─── ITEM DATABASE ────────────────────────────────────────────────────────────

ITEM_RECOMMENDATIONS = {
    "roam": {
        "vs_healer": ["Dominance Ice", "Antique Cuirass", "Athena's Shield", "Immortality"],
        "vs_physical": ["Blade Armor", "Antique Cuirass", "Dominance Ice", "Immortality"],
        "vs_magic": ["Athena's Shield", "Radiant Armor", "Dominance Ice", "Immortality"],
        "vs_mixed": ["Athena's Shield", "Antique Cuirass", "Dominance Ice", "Immortality"],
        "vs_crit": ["Twilight Armor", "Antique Cuirass", "Blade Armor", "Immortality"],
        "general": ["Tough Boots", "Dominance Ice", "Antique Cuirass", "Athena's Shield", "Immortality"],
    },
    "exp": {
        "vs_physical": ["Warrior Boots", "Blade of Despair", "Antique Cuirass", "Dominance Ice", "Immortality"],
        "vs_magic": ["Tough Boots", "Blade of Despair", "Athena's Shield", "Radiant Armor", "Immortality"],
        "vs_sustain": ["Warrior/Tough Boots", "Blade of Despair", "Dominance Ice", "Sea Halberd", "Immortality"],
        "general": ["Tough Boots", "Blade of Despair", "War Ax", "Immortality"],
    },
    "jungle": {
        "squishy": ["Raptor Machete", "Swift Boots", "Blade of Despair", "Berserker's Fury", "Malefic Roar", "Immortality"],
        "tanky": ["Raptor Machete", "Swift Boots", "Demon Hunter Sword", "Malefic Roar", "Blade of Despair", "Immortality"],
        "burst": ["Raptor Machete", "Arcane Boots", "Lightning Truncheon", "Holy Crystal", "Divine Glaive", "Immortality"],
        "general": ["Raptor Machete", "Swift Boots", "Blade of Despair", "Berserker's Fury", "Malefic Roar", "Immortality"],
    },
    "mid": {
        "burst": ["Arcane Boots", "Lightning Truncheon", "Holy Crystal", "Divine Glaive", "Blood Wings", "Immortality"],
        "sustain": ["Arcane Boots", "Clock of Destiny", "Lightning Truncheon", "Holy Crystal", "Divine Glaive", "Immortality"],
        "vs_tanks": ["Arcane Boots", "Genius Wand", "Divine Glaive", "Holy Crystal", "Lightning Truncheon", "Immortality"],
        "general": ["Arcane Boots", "Lightning Truncheon", "Holy Crystal", "Divine Glaive", "Blood Wings", "Immortality"],
    },
    "gold": {
        "tanky": ["Swift Boots", "Demon Hunter Sword", "Scarlet Phantom", "Berserker's Fury", "Malefic Roar", "Immortality"],
        "crit": ["Swift Boots", "Scarlet Phantom", "Berserker's Fury", "Blade of Despair", "Malefic Roar", "Immortality"],
        "safe": ["Swift Boots", "Wind of Nature", "Scarlet Phantom", "Berserker's Fury", "Blade of Despair", "Immortality"],
        "general": ["Swift Boots", "Scarlet Phantom", "Berserker's Fury", "Blade of Despair", "Malefic Roar", "Immortality"],
    },
}

# ─── COUNTER KNOWLEDGE ────────────────────────────────────────────────────────

COUNTER_KNOWLEDGE = {
    "fanny": (["khufra", "minsitthar", "franco", "kaja", "nana"],
              "Khufra S2 cancels her cables. Franco hooks her mid-flight. Nana Molina blocks cables."),
    "ling": (["khufra", "minsitthar", "aurora", "ruby"],
             "Khufra S2 stops wall jumps. Aurora freezes his landing. Ruby's AoE hits him on walls."),
    "hayabusa": (["minsitthar", "khufra", "akai", "carmilla", "saber"],
                 "Minsitthar traps him. Saber ults him when he reappears. Khufra cancels shadow dashes."),
    "lancelot": (["khufra", "minsitthar", "ruby", "akai"],
                 "Any anti-dash stops his I-frames. Minsitthar ult traps his reset."),
    "benedetta": (["khufra", "minsitthar", "franco", "valir"],
                  "Anti-dash makes her useless. Valir pushes her away during charge."),
    "gusion": (["khufra", "minsitthar", "akai", "saber", "nana"],
               "Anti-dash. Nana Molina blocks his daggers. Saber ults him mid-combo."),
    "chou": (["minsitthar", "diggie", "akai", "ruby", "valir"],
             "Minsitthar stops his escape. Diggie ult negates his CC. Ruby out-sustains."),
    "paquito": (["minsitthar", "khufra", "ruby", "cici", "benedetta"],
                "Anti-dash + Rubys CC. Benedetta's S2 immune to his combo."),
    "esmeralda": (["dyrroth", "cici", "thamuz", "baxia", "benedetta", "karrie"],
                  "True damage > her shield. Baxia reduces shield gain. Cici % HP damage."),
    "uranus": (["thamuz", "dyrroth", "cici", "karrie", "lunox"],
               "True damage melts his HP. Baxia anti-heal. Dominance Ice."),
    "yu_zhong": (["terizla", "ruby", "dyrroth", "valir"],
                 "Terizla wins slugfest. Ruby heals through his DoT. Valir pushes away."),
    "terizla": (["cici", "lunox", "karrie", "benedetta"],
                "Kite him. Cici % damage. True damage ignores his passive."),
    "ruby": (["yu_zhong", "esmeralda", "thamuz", "paquito"],
             "Out-damage her sustain. Esmeralda shield > Ruby heal."),
    "alice": (["kadita", "eudora", "aurora", "saber", "harley"],
              "Burst her before she ults. Anti-heal + cc lock."),
    "yve": (["fanny", "ling", "hayabusa", "lancelot", "benedetta"],
            "Dive her immediately. She is immobile with no escape."),
    "pharsa": (["fanny", "ling", "lancelot", "kadita", "saber"],
               "Same as Yve. Any gap-closer kills her."),
    "novaria": (["fanny", "ling", "hayabusa", "benedetta"],
                "Mobile dive assassins ignore her poke and reach her instantly."),
    "aldous": (["diggie", "valentina", "burst mages", "cici"],
               "Valentina steals his ult. Burst him before he stacks. CC lock early game."),
    "estes": (["baxia", "lunox", "kadita", "selena", "eudora", "karrie"],
              "Baxia reduces heal. True damage ignores heal. Burst him or his carry."),
    "rafaela": (["baxia", "chou", "tigreal", "atlas", "franco"],
                "CC lock her before she ults. Baxia for anti-heal."),
    "angela": (["baxia", "cici", "benedetta", "long_range_mm"],
               "Kill her teammate while she's attached. Baxia anti-heal."),
    "atlas": (["diggie", "valir", "franco", "nana"],
              "DIGGIE = hard counter. His ult = useless. Valir pushes mid-ult. Franco hook cancels."),
    "tigreal": (["diggie", "valir", "nana", "kagura"],
                "Same as Atlas. Diggie best counter. Valir pushes him away."),
    "johnson": (["valentina", "minsitthar", "franco", "diggie", "ruby"],
                "Valentina steals his car. Minsitthar traps landing zone. Franco hooks mid-drive."),
    "khufra": (["valir", "kagura", "lylia", "diggie", "chang_e"],
               "Ranged mages with no dash. Avoid blinking near him."),
    "kaja": (["diggie", "rafaela", "lylia", "kagura", "valir"],
             "Diggie ult removes suppression. Lylia ult saves. Kite him."),
    "claude": (["khufra", "minsitthar", "saber", "kaja", "eudora"],
               "Anti-dash. Eudora stun + burst. Saber ults him before he curls."),
    "wanwan": (["franco", "kaja", "khufra", "aurora"],
               "Point-click CC. Franco hook ignores her jump. Aurora freeze before she ults."),
    "beatrix": (["fanny", "ling", "hayabusa", "lancelot"],
                "She has no escape. Any dive assassin kills her easily."),
    "brody": (["khufra", "chou", "kaja", "fanny", "ling"],
              "Dive him before he stacks. His damage is front-loaded — survive first burst then kill."),
    "lesley": (["fanny", "ling", "hayabusa", "natalia"],
               "Zero escape. Any assassin. Twilight Armor + dive."),
    "layla": (["fanny", "ling", "hayabusa", "natalia", "helcurt"],
              "Free kill for any assassin. No escape ability."),
    "miya": (["khufra", "aurora", "atlas", "tigreal"],
             "She needs to stand still to damage. AoE CC lock kills her."),
    "natan": (["franco", "kaja", "valir", "khufra"],
              "CC lock him. Valir pushes him away. His damage is proximity-based."),
    "lunox": (["saber", "eudora", "aurora", "kaja", "franco"],
              "CC lock before she goes into chaos mode. Burst > her light ult."),
    "valentina": (["kagura", "lylia", "saber", "nana"],
                  "Saber ults her instantly. Nana Molina. Avoid clumping (she copies AoE ults)."),
    "kagura": (["saber", "eudora", "aurora", "franco"],
               "Burst + point-click CC. Don't chase — she escapes easily."),
    "lylia": (["saber", "kadita", "selena", "eudora"],
              "Burst her before she stacks orbs. She's weak early game."),
    "baxia": (["valentina", "kagura", "lylia", "chang_e"],
              "He's tanky but lacks hard CC. Mobile mages ignore him. Kite him."),
    "grock": (["valir", "ruby", "chou", "cici"],
              "Valir pushes him away from walls. Cici % damage. Kite him."),
    "barats": (["cici", "karrie", "lunox", "valir", "franco"],
               "True damage. Valir pushes. Franco hooks before he stacks."),
    "hylos": (["karrie", "lunox", "baxia", "cici"],
              "HP-based damage. Karrie DHS + true damage. Anti-heal."),
    "belerick": (["karrie", "lunox", "dyrroth", "baxia"],
                 "True damage ignores his passive reflect. Range him."),
    "lolita": (["yve", "pharsa", "novaria", "valir"],
               "AoE magic damage ignores her shield. Non-projectile mages."),
    "cici": (["ruby", "esmeralda", "terizla", "benedetta", "khufra"],
             "Ruby's CC stops her dashes. Terizla out-trades. Khufra cancels her."),
    "dyrroth": (["ruby", "esmeralda", "cici", "benedetta"],
                "Dodge his S2 (his burst). Sustain through his combo. Kite him after his burst."),
    "thamuz": (["benedetta", "cici", "valir", "dyrroth"],
               "Kite him. He has no gap closer. Dyrroth out-damages him in short trades."),
    "ixia": (["fanny", "ling", "hayabusa", "lancelot", "benedetta"],
             "She has no escape. Dive assassins kill her before she stacks passive."),
    "fredrinn": (["diggie", "valir", "cici", "karrie", "lunox"],
                 "Diggie ult cleanses his taunt. True damage ignores his tankiness. Kite him."),
    "aamon": (["diggie", "rafaela", "lylia", "saber", "nana"],
              "His invisibility is his only defense. Diggie ult reveals him. Saber ults him on sight."),
    "arlott": (["ruby", "cici", "esmeralda", "benedetta", "minsitthar"],
               "His combos need precise timing. Ruby's CC+heal out-sustains. Cici pokes him safely."),
    "aulus": (["cici", "benedetta", "esmeralda", "ruby"],
              "Aulus needs to stack his passive. Kite + burst him before he stacks."),
    "badang": (["diggie", "valir", "esmeralda", "khufra", "nana"],
               "His wall trap is devastating in narrow spaces. Diggie ult + Valir push counter him hard."),
    "bane": (["kagura", "lylia", "valentina", "nana"],
             "Bane's skills are telegraphed. Mobile mages dodge his ult easily."),
    "bruno": (["fanny", "ling", "hayabusa", "lancelot", "chou"],
              "No escape. Any assassin kills him. His only defense is his ult knockback — bait it first."),
    "chip": (["diggie", "franco", "kaja", "valir"],
             "Chip portals his team around. Franco hooks him during portal setup. Diggie ult counters his ganks."),
    "floryn": (["baxia", "lunox", "kadita", "karrie", "diggie"],
               "Floryn's heals are global but she's immobile. Baxia anti-heal. True damage ignores heal."),
    "gatotkaca": (["diggie", "cici", "karrie", "lunox", "valir"],
                  "Gatot's taunt is his main threat. Diggie ult cleanses it. True damage shreds him."),
    "gloo": (["valir", "cici", "karrie", "lunox", "baxia"],
             "Gloo sticks to heroes and heals. Valir pushes him off. True damage + anti-heal kill him."),
    "granger": (["fanny", "ling", "hayabusa", "lancelot", "chou"],
                "Low mobility marksman with burst. Dive him before he reloads his ult."),
    "guinevere": (["khufra", "minsitthar", "diggie", "nana", "franco"],
                  "Her jump + knockup combo is deadly. Khufra/Minsitthar anti-dash stops her jump."),
    "hanabi": (["khufra", "atlas", "aurora", "chou", "saber"],
               "Her shield reflects basic attacks — don't hit her when shielded. CC lock her after shield breaks."),
    "julian": (["khufra", "minsitthar", "ruby", "saber", "nana"],
               "Julian's enhanced skills reset. Anti-dash stops his engage. Saber ults him mid-combo."),
    "karina": (["diggie", "nana", "saber", "akai", "kaja"],
               "Karina resets on kills. Nana's Molina + Diggie ult deny her. CC lock before she resets."),
    "khaleed": (["baxia", "thamuz", "cici", "karrie", "luo_yi"],
                "Khaleed heals in sand. Baxia anti-heal. True damage + % HP damage > his sustain."),
    "kimmy": (["fanny", "ling", "hayabusa", "lancelot", "chou"],
              "Kimmy moves while attacking but has no escape. Fanny kills her instantly. Avoid standing in her S1."),
    "leomord": (["valir", "cici", "karrie", "lunox", "diggie"],
                "Leomord's horse mode is dangerous. Valir pushes him away. Kite him during his ult."),
    "lukas": (["ruby", "cici", "benedetta", "esmeralda", "khufra"],
              "Lukas transforms with enhanced skills. Ruby's CC locks him down. Khufra cancels his dashes."),
    "marcel": (["diggie", "franco", "saber", "kaja", "lylia"],
               "Marcel uses soul photography to trap enemies. Diggie ult cleanses his setup. Franco hooks him."),
    "minotaur": (["diggie", "valir", "nana", "kagura", "franco"],
                 "Minotaur's rage mode is devastating. Diggie ult counters his AoE knockup. Valir pushes him away."),
    "moskov": (["fanny", "ling", "hayabusa", "lancelot", "chou"],
               "Moskov pierces with his attacks but has no escape. Fanny/Ling kill him before he stacks."),
    "nolan": (["khufra", "minsitthar", "saber", "nana", "franco"],
              "Nolan dashes through enemies. Anti-dash stops his resets. Saber ults him."),
    "phoveus": (["diggie", "valir", "franco", "cici", "karrie"],
                "Phoveus is an anti-dash fighter. Don't pick dash heroes against him. Ranged poke destroys him."),
    "suyou": (["khufra", "minsitthar", "ruby", "cici", "valir"],
              "Suyou switches between ranged and melee. Anti-dash stops his engages. Poke him in ranged form."),
    "vale": (["saber", "eudora", "aurora", "nana", "kaja"],
             "Vale has high burst + CC but low mobility. Point-click assassins kill him. Saber ults on sight."),
    "yi_sun_shin": (["fanny", "ling", "hayabusa", "lancelot", "saber"],
                    "Yi Sun-shin has a global ult but low close-range defense. Dive him before he ults."),
    "zhuxin": (["saber", "eudora", "aurora", "nana", "lylia"],
               "Zhuxin uses paper talismans for CC. Burst mages outrange her. Saber deletes her instantly."),
}


# ─── ANALYSIS ─────────────────────────────────────────────────────────────────

def analyze_team(enemy_heroes):
    roles_present = set()
    dmg_types = set()
    mobility_count = 0
    sustain_count = 0
    cc_count = 0

    for h in enemy_heroes:
        info = get_info(h)
        if info[0]:
            roles_present.add(info[0])
            roles_present.add(info[1])
            dmg_types.add(info[2])
            if info[3] in ("high", "very_high"):
                mobility_count += 1
            if info[5] in ("high", "very_high"):
                sustain_count += 1
            if info[4] in ("high", "very_high"):
                cc_count += 1

    has_healer = any(h in HEALERS for h in enemy_heroes)
    has_diver = any(h in DIVE_ASSASSINS for h in enemy_heroes)
    has_poke = any(h in POKE_MAGES for h in enemy_heroes)
    has_sustain = any(h in SUSTAIN_TANKS for h in enemy_heroes)
    has_cc_tank = any(h in CC_TANKS for h in enemy_heroes)
    has_setup = any(h in SETUP_MAGES for h in enemy_heroes)
    has_purify_threat = any(h in PURIFY_COUNTERS for h in enemy_heroes)
    has_anti_dash_threat = any(h in ANTI_DASH for h in enemy_heroes)
    has_true_dmg = any(h in TRUE_DMG for h in enemy_heroes)

    n_phys = sum(1 for h in enemy_heroes if get_info(h)[2] == "physical")
    n_magic = sum(1 for h in enemy_heroes if get_info(h)[2] == "magic")
    n_tanks = sustain_count
    n_squishy = 5 - n_tanks

    return {
        "roles": roles_present, "dmg_types": dmg_types,
        "has_healer": has_healer, "has_diver": has_diver,
        "has_poke": has_poke, "has_sustain": has_sustain,
        "has_cc_tank": has_cc_tank, "has_setup": has_setup,
        "has_purify_threat": has_purify_threat,
        "has_anti_dash_threat": has_anti_dash_threat,
        "has_true_dmg": has_true_dmg,
        "mobility_count": mobility_count, "sustain_count": sustain_count,
        "cc_count": cc_count,
        "n_phys": n_phys, "n_magic": n_magic,
        "n_tanks": n_tanks, "n_squishy": n_squishy,
    }


# ─── SUGGESTIONS ──────────────────────────────────────────────────────────────

def suggest_roles(enemy_heroes, analysis):
    results = {}

    # ROAM
    roam = []
    if analysis["has_healer"]:
        roam = [("Baxia", "Anti-heal shuts down their sustain. Core pick.")]
    if analysis["has_cc_tank"] or analysis["has_setup"]:
        roam.insert(0, ("Diggie", "Ult makes their main engage useless. Best counter vs setup tanks."))
    if analysis["has_diver"] and not analysis["has_anti_dash_threat"]:
        if not any("Khufra" in r[0] for r in roam):
            roam.append(("Khufra", "S2 cancels ALL their dashes. Fanny/Ling/Lance = useless."))
        roam.append(("Minsitthar", "Ult traps their mobile heroes. Taunt stops resets."))
    if analysis["has_poke"]:
        roam.append(("Fanny (roam)", "Instant engage past their poke. Fly straight to backline."))
        roam.append(("Kaja", "Flicker ult their carry. Ignore their poke tank."))
    if not roam:
        roam = [("Franco", "Always useful. Hook wins games."),
                ("Atlas", "Game-changing AoE setup."),
                ("Khufra", "Anti-dive insurance.")]

    # EXP
    enemy_exp_names = [h for h in enemy_heroes if get_info(h)[0] == "exp"]
    exp_picks = []
    if any(h == "esmeralda" for h in enemy_exp_names):
        exp_picks = [("Dyrroth", "Abyssal damage shreds her shield. True dmg > shield."),
                     ("Cici", "% HP poke ignores her shield. Kite her."),
                     ("Thamuz", "Out-sustains her. True damage burns through her.")]
    elif any(h in SUSTAIN_TANKS for h in enemy_exp_names):
        exp_picks = [("Thamuz", "True damage melts sustain tanks."),
                     ("Cici", "% HP damage destroys tanks."),
                     ("Dyrroth", "Abyssal blade shreds any tank.")]
    elif any(h in ("chou", "paquito") for h in enemy_exp_names):
        exp_picks = [("Ruby", "Sustain through burst + CC lock him. Wins extended trade."),
                     ("Benedetta", "S2 immune to his combo. Outplay potential."),
                     ("Esmeralda", "Shield absorbs his burst. Scales better.")]
    elif any(h == "benedetta" for h in enemy_exp_names):
        exp_picks = [("Minsitthar", "Anti-dash makes her useless in lane."),
                     ("Khufra (exp)", "Also works. Bounces her dashes.")]
    elif any(h == "cici" for h in enemy_exp_names):
        exp_picks = [("Ruby", "CC locks her dashes. Sustain through her poke."),
                     ("Esmeralda", "Shield absorbs her % damage. Outscales.")]
    if not exp_picks:
        exp_picks = [("Ruby", "Safe first pick. Never bad. Sustain + CC."),
                     ("Esmeralda", "Good vs most matchups. Scales well."),
                     ("Cici", "Mobile + % damage. Flexible.")]

    # JUNGLE
    jungle = []
    if analysis["n_tanks"] >= 2:
        jungle = [("Karrie (jungle)", "TRUE DAMAGE shreds tanks. DHS melts them in 3s."),
                  ("Lunox (jungle)", "Chaos ult = true damage. Destroys frontlines."),
                  ("Fed", "True damage + anti-heal. Good vs tanks.")]
    elif analysis["n_squishy"] >= 3:
        jungle = [("Ling", "Ignores walls. Deletes backline. Best vs squishy."),
                  ("Fanny", "Fastest clear. Uncatchable. One-shots all."),
                  ("Hayabusa", "Safe + lethal. Good vs teams with no CC.")]
    if analysis["has_anti_dash_threat"]:
        jungle = [h for h in jungle if not any(d in h[0].lower() for d in ["fanny", "ling", "lancelot", "benedetta"])]
        if not jungle:
            jungle = [("Hayabusa", "Safer than Fanny/Ling vs Khufra."),
                      ("Fed", "True damage. Not affected by anti-dash."),
                      ("Martis", "CC immune ult. Ignore Khufra.")]

    # MID
    mid = []
    enemy_jung = [h for h in enemy_heroes if get_info(h)[0] == "jungle"]
    enemy_roam = [h for h in enemy_heroes if get_info(h)[0] == "roam"]

    for j in enemy_jung:
        if j in DIVE_ASSASSINS:
            mid = [("Saber (mid)", "Point-click ult stops their combo completely."),
                   ("Nana", "Molina blocks their dashes. Survive."),
                   ("Aurora", "Freeze them mid-dive. Burst.")]
            break
    for r in enemy_roam:
        if r in ("atlas", "tigreal"):
            mid = [("Diggie (mid)", "Ult makes their engage useless. Hard counter."),
                   ("Valir", "Push them away mid-ult."),
                   ("Kagura", "S2 dodges their setup.")]
            break
        elif r in ("khufra",):
            mid = [("Valir", "No dash needed. Ranged poke."),
                   ("Kagura", "Dodges his S2 bounce."),
                   ("Chang'e", "Range + no dash. Immune while casting.")]
            break
        elif r in HEALERS:
            mid = [("Lunox", "True damage ignores their heals."),
                   ("Kadita", "One-shot before heals come."),
                   ("Selena", "Stun + burst.")]
            break
    if not mid:
        mid = [("Valentina", "Safe first pick. Copies best enemy ult."),
               ("Kagura", "Never feeds. Always useful."),
               ("Lylia", "High damage + survival ult.")]

    # GOLD
    gold = []
    if analysis["n_tanks"] >= 2:
        gold = [("Karrie", "TRUE DAMAGE. DHS + passive shreds tanks."),
                ("Claude", "DHS clone destroys frontlines. Safe.")]
    elif analysis["has_diver"] or analysis["has_anti_dash_threat"]:
        gold = [("Claude", "S2 dodge. Curls past divers. Safest MM vs dive."),
                ("Wanwan", "Jump over everything. Purify built-in."),
                ("Natan", "Ult makes him untargetable. Kites divers.")]
    elif analysis["has_cc_tank"]:
        gold = [("Claude", "Best vs CC tanks. S2 + Purify."),
                ("Beatrix", "Purify + shotgun combo.")]
    if not gold:
        gold = [("Claude", "Always relevant. Safe in any comp."),
                ("Beatrix", "Highest damage. Flexible builds."),
                ("Brody", "Tanky + lane bully.")]

    # ITEMS
    item_sets = {}
    for role, build_key in [("roam", "vs_mixed"), ("exp", "general"),
                            ("jungle", "general"), ("mid", "general"),
                            ("gold", "general")]:
        if role == "roam":
            if analysis["n_phys"] >= 3:
                build_key = "vs_physical"
            elif analysis["n_magic"] >= 3:
                build_key = "vs_magic"
            elif analysis["has_healer"]:
                build_key = "vs_healer"
        elif role == "gold":
            if analysis["n_tanks"] >= 2:
                build_key = "tanky"
            elif analysis["has_diver"]:
                build_key = "safe"
        elif role == "mid":
            if analysis["n_tanks"] >= 2:
                build_key = "vs_tanks"
        elif role == "jungle":
            if analysis["n_tanks"] >= 2:
                build_key = "tanky"
            elif analysis["n_squishy"] >= 3:
                build_key = "squishy"
        elif role == "exp":
            if analysis["has_healer"]:
                build_key = "vs_sustain"
            elif analysis["n_magic"] >= 3:
                build_key = "vs_magic"
            elif analysis["n_phys"] >= 3:
                build_key = "vs_physical"

        item_sets[role] = ITEM_RECOMMENDATIONS[role].get(build_key, ITEM_RECOMMENDATIONS[role]["general"])

    return {
        "roam": roam[:3],
        "exp": exp_picks[:3],
        "jungle": jungle[:3],
        "mid": mid[:3],
        "gold": gold[:3],
        "items": item_sets,
    }


# ─── PLAYSTYLE GUIDE ──────────────────────────────────────────────────────────

def generate_playstyle(enemy_heroes, role_picks, analysis):
    guide = {"early": [], "mid": [], "late": [], "wincon": [], "danger": []}

    our_picks = []
    for role in ("roam", "exp", "jungle", "mid", "gold"):
        for h, _ in role_picks.get(role, []):
            our_picks.append(h.lower().replace(" (jungle)", "").replace(" (mid)", "").replace(" (roam)", "").replace(" (exp)", ""))

    # Early game
    our_early_power = [h for h in our_picks if h in {"martis", "hilda", "valir", "khaleed", "paquito", "dyrroth", "roger", "arlott", "badang", "aulus"}]
    enemy_early_power = [h for h in enemy_heroes if h in {"martis", "hilda", "valir", "khaleed", "paquito", "dyrroth", "roger", "arlott", "badang", "aulus"}]

    if our_early_power and not enemy_early_power:
        guide["early"].append("YOU WIN EARLY. Invade their jungle. Force fights. Contest all turtles.")
        guide["early"].append(f"Your early threats: {', '.join(h.title() for h in our_early_power[:3])}")
    elif enemy_early_power and not our_early_power:
        guide["early"].append("THEY WIN EARLY. Play safe. Freeze lane. Don't contest first turtle.")
        guide["early"].append(f"Avoid: {', '.join(h.title() for h in enemy_early_power[:3])} in early fights.")
    elif our_early_power and enemy_early_power:
        guide["early"].append("EARLY GAME IS EVEN. Focus on farm. First turtle depends on rotation speed.")
    else:
        guide["early"].append("BOTH SCALE. Farm efficiently. Look for picks, not teamfights.")

    # Mid game
    our_pickoff = [h for h in our_picks if h in {"franco", "saber", "selena", "kaja", "natalia", "helcurt", "aamon", "karina", "nolan"}]
    our_teamfight = [h for h in our_picks if h in {"atlas", "tigreal", "khufra", "minsitthar", "odette", "pharsa", "yve", "aurora", "carmilla", "gatotkaca", "minotaur", "badang"}]
    our_splitpush = [h for h in our_picks if h in {"hayabusa", "zilong", "sun", "ling", "yi_sun_shin", "leomord", "lukas", "suyou"}]
    enemy_teamfight = [h for h in enemy_heroes if h in {"atlas", "tigreal", "odette", "pharsa", "yve", "aurora", "carmilla", "minotaur", "gatotkaca"}]

    if our_pickoff and not enemy_teamfight:
        guide["mid"].append("ROTATE AS 5. Look for picks on isolated enemies. Don't show on map.")
        guide["mid"].append(f"Your pickers: {', '.join(h.title() for h in our_pickoff[:3])}")
    elif our_teamfight and not our_pickoff:
        guide["mid"].append("GROUP UP. Force 5v5 fights around objectives. Your teamfight wins.")
        guide["mid"].append(f"Ult combo: {', '.join(h.title() for h in our_teamfight[:3])}")
    elif our_splitpush and not enemy_teamfight:
        guide["mid"].append("SPLIT PUSH. Avoid 5v5. Create pressure on both side lanes.")
        guide["mid"].append(f"Splitter: {', '.join(h.title() for h in our_splitpush[:3])}")
    else:
        guide["mid"].append("PLAY FOR PICKS. Rotate as 2-3. Catch them rotating. Don't force bad fights.")

    # Late game
    our_scalers = [h for h in our_picks if h in {"karrie", "lunox", "claude", "aldous", "cecilion", "hanabi", "moskov", "bruno", "granger", "kagura", "lylia", "julian", "zhuxin"}]
    enemy_scalers = [h for h in enemy_heroes if h in {"karrie", "lunox", "claude", "aldous", "cecilion", "hanabi", "moskov", "bruno", "granger", "kagura", "lylia", "julian", "zhuxin"}]

    if our_scalers and not enemy_scalers:
        guide["late"].append(f"YOU OUTSCALE. Protect {our_scalers[0].title()}. Delay game to late. Don't throw.")
    elif enemy_scalers and not our_scalers:
        guide["late"].append(f"YOU NEED TO END EARLY. Enemy has {enemy_scalers[0].title()} who scales hard.")
        guide["late"].append("Take Lord. Siege. Don't let it reach 15 min.")
    elif our_scalers and enemy_scalers:
        guide["late"].append(f"BOTH SCALE. Better teamfight or pick wins. Protect your {our_scalers[0].title()}.")
    else:
        guide["late"].append("LATE GAME IS EVEN. Winning depends on Lord control and pickoffs.")

    # Win condition
    wincons = []
    for h in enemy_heroes:
        if h == "fanny":
            wincons.append("KILL FANNY BEFORE Lv4. Invade her blue. Ward her camps.")
            wincons.append("Stick together after Lv4. Don't let her pick off isolated targets.")
        elif h == "ling":
            wincons.append("DENY LING'S BLUE BUFF. He's useless without energy.")
        elif h == "estes":
            wincons.append("PICK OFF ESTES FIRST in every fight. Buy anti-heal immediately.")
        elif h == "atlas":
            wincons.append("DON'T CLUMP. Atlas ult = instant wipe. Diggie ult counters him.")
        elif h == "aldous":
            wincons.append("DESTROY ALDOUS EARLY. Gank him repeatedly before he stacks.")
        elif h == "claude":
            wincons.append("CC CLAUDE WHEN HE CURLS. He's vulnerable during S2 animation.")
        elif h == "beatrix":
            wincons.append("DIVE BEATRIX. She has no escape. Bait her ult then engage.")
        elif h == "moskov":
            wincons.append("DON'T STAND IN A LINE. Moskov pierces. Spread out in fights.")
        elif h == "phoveus":
            wincons.append("DON'T DASH AROUND PHOVEUS. He punishes mobility. Pick ranged heroes.")

    for h in our_picks:
        if h == "diggie" and any(e in {"atlas", "tigreal", "johnson"} for e in enemy_heroes):
            wincons.append("FORCE FIGHTS. Enemy's main engage is useless with Diggie ult.")
        if h == "khufra" and any(e in {"fanny", "ling", "lancelot"} for e in enemy_heroes):
            wincons.append("STICK WITH KHUFRA. He protects your backline from their divers.")
        if h == "karrie" and any(e in SUSTAIN_TANKS for e in enemy_heroes):
            wincons.append("PROTECT KARRIE. She's your tank killer. DHS melts them in 3s.")
        if h == "franco":
            wincons.append("FRANCO HOOK WINS GAMES. Hook their carry before objectives.")

    guide["wincon"] = wincons[:5] if wincons else ["PLAY YOUR STRENGTHS. Focus on objectives, not kills."]

    # Dangers
    dangers = []
    for h in enemy_heroes:
        if h in {"atlas", "tigreal"}:
            dangers.append("Don't clump up — their AoE cc = instant teamwipe.")
        if h == "franco":
            dangers.append("Don't stand still — Franco hook ends your life. Always juke.")
        if h in {"fanny", "ling", "hayabusa", "lancelot"}:
            dangers.append(f"Don't roam alone — {h.title()} will pick you off.")
        if h in {"estes", "rafaela", "floryn", "angela"}:
            dangers.append("BUY ANTI-HEAL immediately. Dominance Ice / Sea Halberd / Necklace.")
        if h in {"aldous", "hilda", "khaleed"}:
            dangers.append(f"Don't let {h.title()} free farm in lane — gank early.")
        if h == "chou":
            dangers.append("Watch for Chou flicker ult. Stay behind your tank.")
        if h in {"karrie", "lunox", "dyrroth", "alpha"}:
            dangers.append("Enemy has TRUE DAMAGE. Build HP, not armor.")
        if h == "phoveus":
            dangers.append("Phoveus punishes dashes — don't pick dash-heavy lineups.")
        if h == "esmeralda":
            dangers.append("Esmeralda's shield scales with enemy magic — don't stack magic vs her.")

    guide["danger"] = dangers[:5]

    return guide


# ─── SYNERGIES ────────────────────────────────────────────────────────────────

def get_synergies(enemy_heroes, suggestions):
    synergies = []
    role_picks = {role: [h for h, _ in picks] for role, picks in suggestions.items()
                  if isinstance(picks, list)}

    known = {
        ("Diggie", "Claude"): "Diggie ult protects Claude while he ults.",
        ("Diggie", "Wanwan"): "Diggie ult + Wanwan dive cleanup.",
        ("Khufra", "Claude"): "Khufra S2 catches them, Claude curls and kills.",
        ("Baxia", "Karrie"): "Baxia reduces heal, Karrie true damage kills faster.",
        ("Baxia", "Lunox"): "Anti-heal + true damage combo.",
        ("Minsitthar", "Ling"): "Minsitthar traps them, Ling deletes from above.",
        ("Minsitthar", "Hayabusa"): "Minsitthar ult traps, Haya ult kills trapped enemies.",
        ("Diggie", "Ruby"): "Diggie anti-CC + Ruby sustain dive.",
        ("Atlas", "Aurora"): "Atlas sets, Aurora freezes entire team.",
        ("Franco", "Saber"): "Franco hooks, Saber ult = free kill.",
    }

    for (a, b), desc in known.items():
        for role, picks in role_picks.items():
            if a in picks and b in picks:
                synergies.append(f"{a} + {b}: {desc}")

    roam = role_picks.get("roam", [])
    jung = role_picks.get("jungle", [])
    gold = role_picks.get("gold", [])

    if any("Diggie" in r for r in roam) and any("dive" in str(j) for j in jung):
        synergies.append("Diggie + Dive line: Diggie ult protects your divers.")
    if any("Khufra" in r for r in roam) and any(g == "Claude" for g in gold):
        synergies.append("Khufra + Claude: Khufra catches them, Claude kills.")
    if any("Baxia" in r for r in roam) and any(k == "Karrie" for k in [g for g in gold] + [j for j in jung]):
        synergies.append("Baxia + Karrie: Anti-heal + true damage = deadly combo.")

    return synergies[:5]


# ─── MAIN ENTRY POINT ────────────────────────────────────────────────────────

def run_analysis(hero_names):
    """Main entry: take list of 5 hero names, return full analysis dict."""
    enemy_heroes = []
    unknown = []
    for name in hero_names:
        n = normalize(name)
        if n in HERO_ROLES:
            enemy_heroes.append(n)
        else:
            unknown.append(name)

    if unknown:
        return {"error": f"Unknown heroes: {', '.join(unknown)}"}
    if len(enemy_heroes) < 5:
        return {"error": "Need exactly 5 heroes."}

    analysis = analyze_team(enemy_heroes)
    role_picks = suggest_roles(enemy_heroes, analysis)
    playstyle = generate_playstyle(enemy_heroes, role_picks, analysis)
    synergies = get_synergies(enemy_heroes, role_picks)

    # Build counter specifics
    counter_tips = []
    for h in enemy_heroes:
        if h in COUNTER_KNOWLEDGE:
            counters, strat = COUNTER_KNOWLEDGE[h]
            counter_tips.append({
                "hero": h.replace("_", " ").title(),
                "counters": [c.replace("_", " ").title() for c in counters[:3]],
                "strategy": strat,
            })

    # Build items guide
    items_guide = []
    if analysis["has_healer"]:
        items_guide.append("VITAL: Anti-heal for EVERYONE")
    if analysis["n_phys"] >= 3:
        items_guide.append("Build Blade Armor (reflects physical damage)")
    if analysis["n_magic"] >= 3:
        items_guide.append("Build Athena's Shield (magic damage shield)")
    if analysis["has_true_dmg"]:
        items_guide.append("True damage present. Build HP, not armor.")
    if analysis["n_tanks"] >= 2:
        items_guide.append("Build Demon Hunter Sword (tank melter)")
    if analysis["has_diver"] or analysis["has_setup"]:
        items_guide.append("Purify battle spell recommended")

    # Badges
    badges = []
    if analysis["has_healer"]:
        badges.append("HEAL")
    if analysis["has_sustain"]:
        badges.append("TANKY")
    if analysis["has_diver"]:
        badges.append("DIVE")
    if analysis["has_poke"]:
        badges.append("POKE")
    if analysis["has_cc_tank"]:
        badges.append("CC")
    if analysis["n_tanks"] >= 2:
        badges.append("2+ TANKS")
    if analysis["n_squishy"] >= 3:
        badges.append("SQUISHY")

    return {
        "enemy_heroes": [h.replace("_", " ").title() for h in enemy_heroes],
        "badges": badges,
        "n_phys": analysis["n_phys"],
        "n_magic": analysis["n_magic"],
        "has_true_dmg": analysis["has_true_dmg"],
        "role_picks": {
            "roam": [{"hero": h, "reason": r} for h, r in role_picks.get("roam", [])],
            "exp": [{"hero": h, "reason": r} for h, r in role_picks.get("exp", [])],
            "jungle": [{"hero": h, "reason": r} for h, r in role_picks.get("jungle", [])],
            "mid": [{"hero": h, "reason": r} for h, r in role_picks.get("mid", [])],
            "gold": [{"hero": h, "reason": r} for h, r in role_picks.get("gold", [])],
        },
        "items": role_picks.get("items", {}),
        "playstyle": playstyle,
        "synergies": synergies,
        "counter_tips": counter_tips,
        "items_guide": items_guide,
    }
