// MLBB Draft Counter Picker - JavaScript Engine
// Full analysis engine running in-browser, no server needed.

const HERO_ROLES = {
  khufra:["roam","exp","physical","low","high","high","high"],
  minsitthar:["roam","exp","physical","low","high","high","high"],
  franco:["roam","exp","physical","low","high","medium","medium"],
  diggie:["roam","mid","magic","low","high","low","low"],
  atlas:["roam","exp","magic","low","high","high","high"],
  tigreal:["roam","exp","magic","low","high","high","high"],
  akai:["roam","jungle","physical","high","high","high","high"],
  kaja:["roam","exp","magic","high","high","medium","medium"],
  carmilla:["roam","mid","magic","medium","high","medium","medium"],
  rafaela:["roam","mid","magic","high","medium","low","low"],
  estes:["roam","mid","magic","low","low","low","low"],
  angela:["roam","mid","magic","high","low","low","low"],
  mathilda:["roam","exp","magic","high","medium","low","low"],
  baxia:["roam","jungle","physical","high","medium","high","high"],
  hylos:["roam","exp","magic","low","high","high","high"],
  belerick:["roam","exp","magic","low","high","high","high"],
  lolita:["roam","exp","magic","low","high","high","high"],
  gloo:["roam","exp","magic","low","high","high","high"],
  johnson:["roam","exp","physical","low","high","high","high"],
  fredrinn:["roam","exp","physical","low","high","high","high"],
  chip:["roam","exp","magic","medium","high","high","high"],
  minotaur:["roam","exp","physical","low","high","high","high"],
  gatotkaca:["roam","exp","magic","low","high","high","high"],
  chou:["exp","roam","physical","high","high","medium","medium"],
  ruby:["exp","roam","physical","medium","high","high","high"],
  esmeralda:["exp","mid","magic","medium","medium","high","high"],
  yu_zhong:["exp","jungle","physical","medium","medium","high","high"],
  uranus:["exp","roam","magic","low","medium","high","high"],
  terizla:["exp","roam","physical","low","medium","high","high"],
  thamuz:["exp","jungle","physical","low","low","high","high"],
  paquito:["exp","roam","physical","high","high","medium","medium"],
  benedetta:["exp","jungle","physical","high","medium","medium","low"],
  cici:["exp","gold","physical","high","medium","medium","low"],
  dyrroth:["exp","jungle","physical","medium","low","medium","medium"],
  barats:["exp","roam","physical","low","high","high","high"],
  grock:["exp","roam","magic","medium","high","high","high"],
  aldous:["exp","jungle","physical","low","low","high","high"],
  alpha:["exp","jungle","physical","medium","low","medium","medium"],
  masha:["exp","jungle","physical","high","low","high","medium"],
  edith:["exp","roam","magic","medium","high","high","high"],
  silvanna:["exp","mid","magic","high","medium","medium","medium"],
  x_borg:["exp","jungle","physical","medium","low","medium","medium"],
  lapu_lapu:["exp","jungle","physical","medium","medium","medium","medium"],
  jawhead:["exp","roam","physical","high","high","medium","medium"],
  freya:["exp","jungle","physical","medium","medium","medium","medium"],
  argus:["exp","jungle","physical","medium","low","medium","medium"],
  sun:["exp","jungle","physical","high","low","medium","low"],
  zilong:["exp","jungle","physical","high","low","low","low"],
  hilda:["exp","roam","physical","medium","low","high","high"],
  balmond:["exp","jungle","physical","low","low","high","high"],
  arlott:["exp","jungle","physical","high","medium","medium","medium"],
  aulus:["exp","jungle","physical","medium","low","high","high"],
  badang:["exp","roam","physical","low","high","medium","medium"],
  bane:["exp","mid","magic","low","medium","medium","medium"],
  khaleed:["exp","roam","physical","medium","low","high","high"],
  leomord:["exp","jungle","physical","high","low","high","high"],
  lukas:["exp","jungle","physical","high","medium","high","medium"],
  phoveus:["exp","roam","magic","low","high","high","high"],
  suyou:["exp","jungle","physical","high","medium","medium","medium"],
  fanny:["jungle","exp","physical","very_high","low","low","low"],
  ling:["jungle","exp","physical","very_high","low","low","low"],
  hayabusa:["jungle","exp","physical","high","low","low","low"],
  lancelot:["jungle","exp","physical","very_high","low","low","low"],
  gusion:["jungle","mid","magic","high","low","low","low"],

  martis:["jungle","exp","physical","high","high","medium","medium"],
  roger:["jungle","gold","physical","high","low","medium","low"],
  yin:["jungle","exp","physical","high","high","medium","medium"],
  hanzo:["jungle","exp","physical","high","low","low","low"],
  helcurt:["jungle","exp","physical","high","high","low","low"],
  natalia:["jungle","exp","physical","high","low","low","low"],
  alucard:["jungle","exp","physical","high","low","high","medium"],
  harley:["jungle","mid","magic","high","low","low","low"],
  lunox:["jungle","mid","magic","high","low","low","low"],
  karrie:["jungle","gold","true_dmg","medium","low","low","low"],
  aamon:["jungle","mid","magic","high","low","low","low"],
  karina:["jungle","mid","magic","high","low","low","low"],
  nolan:["jungle","exp","physical","high","low","low","low"],
  valentina:["mid","exp","magic","high","low","low","low"],
  kagura:["mid","exp","magic","high","medium","low","low"],
  lylia:["mid","exp","magic","high","low","high","low"],
  chang_e:["mid","gold","magic","high","low","low","low"],
  eudora:["mid","roam","magic","low","very_high","low","low"],
  aurora:["mid","roam","magic","low","very_high","low","low"],
  kadita:["mid","exp","magic","medium","high","low","low"],
  selena:["mid","roam","magic","medium","very_high","low","low"],
  saber:["mid","jungle","physical","high","very_high","low","low"],
  nana:["mid","roam","magic","low","very_high","low","low"],
  yve:["mid","gold","magic","low","medium","low","low"],
  pharsa:["mid","gold","magic","low","low","low","low"],
  alice:["mid","exp","magic","high","medium","high","high"],
  valir:["mid","roam","magic","low","high","low","low"],
  novaria:["mid","gold","magic","high","low","low","low"],
  joy:["mid","jungle","magic","high","medium","medium","low"],
  cecilion:["mid","gold","magic","low","low","low","low"],
  vexana:["mid","roam","magic","low","high","low","low"],
  luo_yi:["mid","gold","magic","low","medium","low","low"],
  zhask:["mid","gold","magic","low","low","low","low"],
  gord:["mid","gold","magic","low","low","low","low"],
  odette:["mid","roam","magic","low","high","low","low"],
  harith:["mid","gold","magic","high","medium","medium","low"],
  xavier:["mid","gold","magic","low","medium","low","low"],
  faramis:["mid","roam","magic","medium","high","high","medium"],
  cyclops:["mid","jungle","magic","medium","low","low","low"],
  julian:["mid","exp","magic","high","medium","medium","low"],
  marcel:["mid","roam","magic","medium","high","medium","low"],
  vale:["mid","roam","magic","low","high","low","low"],
  zhuxin:["mid","roam","magic","high","high","low","low"],
  claude:["gold","jungle","physical","high","low","low","low"],
  beatrix:["gold","exp","physical","low","low","low","low"],
  brody:["gold","exp","physical","low","low","medium","low"],
  wanwan:["gold","exp","physical","high","medium","low","low"],
  clint:["gold","exp","physical","low","low","low","low"],
  natan:["gold","mid","magic","medium","low","medium","low"],
  lesley:["gold","jungle","physical","low","low","low","low"],
  layla:["gold","mid","physical","low","low","low","low"],
  miya:["gold","jungle","physical","low","low","low","low"],
  irithel:["gold","jungle","physical","medium","low","low","low"],
  melissa:["gold","exp","physical","medium","low","low","low"],
  popol:["gold","exp","physical","medium","medium","low","low"],
  ixia:["gold","exp","physical","low","medium","low","low"],
  granger:["gold","jungle","physical","low","low","low","low"],
  hanabi:["gold","exp","physical","low","low","low","low"],
  bruno:["gold","jungle","physical","low","low","low","low"],
  moskov:["gold","jungle","physical","low","low","low","low"],
  kimmy:["gold","mid","magic","low","low","low","low"],
  yi_sun_shin:["gold","jungle","physical","high","low","low","low"],
  floryn:["roam","mid","magic","low","low","low","low"],
  guinevere:["exp","mid","magic","high","high","low","low"],
};

const CC_TANKS=new Set(["atlas","tigreal","khufra","minsitthar","franco","akai","kaja","grock","lolita","gloo","johnson","minotaur","gatotkaca","chip"]);
const HEALERS=new Set(["estes","rafaela","angela","floryn"]);
const TRUE_DMG=new Set(["karrie","lunox","dyrroth","alpha"]);
const SUSTAIN_TANKS=new Set(["uranus","esmeralda","hylos","belerick","barats","grock","terizla","thamuz","gloo","gatotkaca","minotaur","khaleed","leomord","phoveus"]);
const POKE_MAGES=new Set(["yve","pharsa","novaria","xavier","cecilion","gord","zhask","luo_yi"]);
const DIVE_ASSASSINS=new Set(["fanny","ling","hayabusa","lancelot","benedetta","gusion","yin","helcurt","aamon","karina","nolan","suyou"]);
const BURST_MAGES=new Set(["eudora","aurora","kadita","selena","saber","harley","odette","vexana","vale","zhuxin"]);
const SETUP_MAGES=new Set(["atlas","tigreal","kaja","carmilla","khufra"]);
const PURIFY_COUNTERS=new Set(["atlas","tigreal","kaja","khufra","chou"]);
const ANTI_DASH=new Set(["khufra","minsitthar"]);

const ALIASES = {};
Object.keys(HERO_ROLES).forEach(k => ALIASES[k] = k);
Object.assign(ALIASES, {
  esme:"esmeralda",yuzhong:"yu_zhong",urasmus:"uranus",
  bene:"benedetta",haya:"hayabusa",lance:"lancelot",
  bea:"beatrix",nova:"novaria",change:"chang_e",min:"minsitthar",
  john:"johnson",jonson:"johnson",kupa:"popol",xborg:"x_borg",
  lapu:"lapu_lapu",ceci:"cecilion",luoyi:"luo_yi",
  fred:"fredrinn",gloom:"gloo",flo:"floryn",
  gatot:"gatotkaca",guin:"guinevere",leo:"leomord",
  mino:"minotaur",phov:"phoveus",soyou:"suyou",
  "yi sun shin":"yi_sun_shin",
});

// ─── AUTOCOMPLETE ───────────────────────────────────────────────────────────
const HERO_DISPLAY = Object.keys(HERO_ROLES).map(k => ({
  key: k,
  name: k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
  role: HERO_ROLES[k][0].toUpperCase(),
}));

const ROLE_COLORS = {roam:"#55cc55",exp:"#5588ff",jungle:"#ff5555",mid:"#cccc55",gold:"#ff88cc"};

function filterHeroes(query, excludeSet) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return HERO_DISPLAY
    .filter(h => !excludeSet.has(h.key) && (h.key.includes(q) || h.name.toLowerCase().includes(q)))
    .slice(0, 8);
}

let activeAc = null;
let acIndex = -1;

function showDropdown(inputEl, matches) {
  hideDropdown();
  if (!matches.length) return;
  const wrapper = inputEl.closest('.autocomplete-wrapper');
  const list = wrapper.querySelector('.autocomplete-list');
  list.innerHTML = matches.map((m, i) =>
    `<div class="ac-item" data-key="${m.key}" data-idx="${i}">
      <span class="ac-name">${m.name}</span>
      <span class="ac-role" style="background:${ROLE_COLORS[m.role.slice(0,4)]||'#555'}">${m.role}</span>
    </div>`
  ).join("");
  list.classList.add("show");
  activeAc = { inputEl, list, matches };
  acIndex = -1;

  list.querySelectorAll(".ac-item").forEach(item => {
    item.addEventListener("mousedown", e => {
      e.preventDefault();
      inputEl.value = item.dataset.key.replace(/_/g," ");
      hideDropdown();
      inputEl.focus();
    });
  });
}

function hideDropdown() {
  document.querySelectorAll(".autocomplete-list.show").forEach(el => el.classList.remove("show"));
  activeAc = null;
  acIndex = -1;
}

function setupAutocomplete(inputEl, inputId) {
  inputEl.addEventListener("input", () => {
    const exclude = new Set([1,2,3,4,5].filter(i => "h"+i !== inputId).map(i => {
      const v = document.getElementById("h"+i).value.trim();
      return normalize(v);
    }));
    const matches = filterHeroes(inputEl.value, exclude);
    showDropdown(inputEl, matches);
  });

  inputEl.addEventListener("keydown", e => {
    if (!activeAc) return;
    const items = activeAc.list.querySelectorAll(".ac-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      acIndex = Math.min(acIndex + 1, items.length - 1);
      items.forEach((it, i) => it.classList.toggle("active", i === acIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      acIndex = Math.max(acIndex - 1, 0);
      items.forEach((it, i) => it.classList.toggle("active", i === acIndex));
    } else if (e.key === "Enter" && acIndex >= 0) {
      e.preventDefault();
      const chosen = activeAc.matches[acIndex];
      inputEl.value = chosen.key.replace(/_/g, " ");
      hideDropdown();
    } else if (e.key === "Escape") {
      hideDropdown();
    }
  });

  inputEl.addEventListener("blur", () => {
    setTimeout(hideDropdown, 150);
  });
}

function normalize(name) {
  let n = name.trim().toLowerCase().replace(/ /g,"_").replace(/-/g,"_");
  if (ALIASES[n]) return ALIASES[n];
  for (const [alias, canon] of Object.entries(ALIASES)) {
    if (n === alias.slice(0, n.length) || alias === n.slice(0, alias.length)) return canon;
  }
  return n;
}

function getInfo(hero) {
  return HERO_ROLES[hero] || [null,null,null,null,null,null,null];
}

const ITEM_RECOMMENDATIONS = {
  roam:{
    vs_healer:["Dominance Ice","Antique Cuirass","Athena's Shield","Immortality"],
    vs_physical:["Blade Armor","Antique Cuirass","Dominance Ice","Immortality"],
    vs_magic:["Athena's Shield","Radiant Armor","Dominance Ice","Immortality"],
    vs_mixed:["Athena's Shield","Antique Cuirass","Dominance Ice","Immortality"],
    general:["Tough Boots","Dominance Ice","Antique Cuirass","Athena's Shield","Immortality"],
  },
  exp:{
    vs_physical:["Warrior Boots","Blade of Despair","Antique Cuirass","Dominance Ice","Immortality"],
    vs_magic:["Tough Boots","Blade of Despair","Athena's Shield","Radiant Armor","Immortality"],
    vs_sustain:["Tough Boots","Blade of Despair","Dominance Ice","Sea Halberd","Immortality"],
    general:["Tough Boots","Blade of Despair","War Ax","Immortality"],
  },
  jungle:{
    squishy:["Raptor Machete","Swift Boots","Blade of Despair","Berserker's Fury","Malefic Roar","Immortality"],
    tanky:["Raptor Machete","Swift Boots","Demon Hunter Sword","Malefic Roar","Blade of Despair","Immortality"],
    general:["Raptor Machete","Swift Boots","Blade of Despair","Berserker's Fury","Malefic Roar","Immortality"],
  },
  mid:{
    burst:["Arcane Boots","Lightning Truncheon","Holy Crystal","Divine Glaive","Blood Wings","Immortality"],
    vs_tanks:["Arcane Boots","Genius Wand","Divine Glaive","Holy Crystal","Lightning Truncheon","Immortality"],
    general:["Arcane Boots","Lightning Truncheon","Holy Crystal","Divine Glaive","Blood Wings","Immortality"],
  },
  gold:{
    tanky:["Swift Boots","Demon Hunter Sword","Scarlet Phantom","Berserker's Fury","Malefic Roar","Immortality"],
    safe:["Swift Boots","Wind of Nature","Scarlet Phantom","Berserker's Fury","Blade of Despair","Immortality"],
    general:["Swift Boots","Scarlet Phantom","Berserker's Fury","Blade of Despair","Malefic Roar","Immortality"],
  },
};

const COUNTER_KNOWLEDGE = {
  fanny:["Khufra S2 cancels her cables mid-flight — she falls helplessly. Franco hooks her during cable travel. Nana Molina blocks cable paths, forcing her to re-route. Build Blade Armor to reflect her burst damage.","khufra","minsitthar","franco"],
  ling:["Khufra S2 creates a wall that stops wall jumps — he falls and is vulnerable. Aurora freezes him the moment he lands. Minsitthar ult traps him in place. Deny his blue buff — he becomes useless without energy.","khufra","minsitthar","aurora"],
  hayabusa:["Minsitthar ult creates a zone he can't escape from. Saber point-click ults him when he reappears from shadows. Khufra S2 cancels his shadow dashes. CC him right after he uses ult — he's stationary for 1s.","minsitthar","khufra","saber"],
  lancelot:["Any anti-dash stops his infinite I-frame combos. Minsitthar ult traps his reset target. Ruby AoE hits him during dash. He's weakest before level 4 — camp him early.","khufra","minsitthar","ruby"],
  benedetta:["Anti-dash makes her useless — she can't dash, can't charge, can't escape. Valir pushes her away during charge animation. Khufra S2 bounces her every dash attempt.","khufra","minsitthar","valir"],
  gusion:["Anti-dash stops his daggers from returning. Nana Molina blocks his dagger landing spots. Saber ults him mid-combo before he can pick up daggers. Burst him instantly — he's paper-thin.","khufra","minsitthar","saber"],
  chou:["Minsitthar stops his kick-back escape route. Diggie ult makes his entire combo useless — cleanses CC. Ruby out-sustains his burst and heals through his damage. Watch for his flicker-ult — stay behind your tank.","minsitthar","diggie","ruby"],
  esmeralda:["True damage ignores her shield entirely — Karrie passive shreds her. Baxia reduces her shield gain by 50%. Cici %HP damage melts her regardless of shield stacking. Never pick magic damage vs her — she heals from it.","dyrroth","cici","karrie"],
  uranus:["True damage ignores his passive HP regen. Baxia passive reduces all his healing. Dominance Ice cuts his sustain in half. He's tanky but has no damage — ignore him and kill his team first.","thamuz","dyrroth","karrie"],
  atlas:["DIGGIE IS HIS HARD COUNTER — his ult does nothing if Diggie ult is active. Valir pushes him away mid-ultimate animation. Franco hooks him during his setup. Never clump together — his 5-man ult = instant team wipe.","diggie","valir","franco"],
  tigreal:["Same as Atlas — Diggie ult cleanses his push-pull combo. Valir pushes him away before he can set up. Nana Molina blocks his engage path. He's slow and predictable — ward his rotations.","diggie","valir","nana"],
  estes:["Baxia reduces his healing by 50% — core pick. True damage (Karrie, Lunox) ignores his healing entirely. Burst him FIRST in every fight — he's squishy and immobile. Buy anti-heal items immediately.","baxia","lunox","kadita"],
  khufra:["Ranged mages with NO dash counter him — Valir, Kagura, Lylia. Never blink or dash near him — his S2 bounces you. He's useless from range — poke him down before he can engage.","valir","kagura","lylia"],
  kaja:["Diggie ult cleanses his suppression — completely negates his pick. Lylia ult saves whoever he suppresses. He's squishy — burst him before he can drag your teammate into his team.","diggie","rafaela","lylia"],
  claude:["Anti-dash stops his S2 curl escape. Eudora point-click stun + burst kills him before he can ult. Saber ults him during his S2 animation when he's stationary. He's useless without Demon Hunter Sword.","khufra","minsitthar","saber"],
  wanwan:["Franco hook ignores her jump — pulls her straight. Kaja point-click ult drags her out. Aurora freeze before she can activate ult. She needs 5 weakness hits — don't let her stack them on you.","franco","kaja","aurora"],
  beatrix:["She has ZERO escape abilities. Any dive assassin (Fanny, Ling, Hayabusa) kills her instantly. Bait her ult first — she's defenseless during cooldown. Focus her in teamfights — she's the highest damage threat.","fanny","ling","hayabusa"],
  layla:["Zero mobility, zero escape — the easiest kill in the game. Any assassin one-shots her. She scales hard but is useless early. Camp her in lane — she can't run away from anything.","fanny","ling","hayabusa"],
  natan:["CC lock him — he needs proximity to deal damage. Valir pushes him out of range. His damage falls off if he can't stack passive. Franco hook + burst = free kill every time.","franco","kaja","valir"],
  lunox:["CC lock her BEFORE she enters chaos mode — once she's in light ult she's invincible. Burst damage > her light ult healing. She's squishy — one stun = death. Don't let her stack orbs freely.","saber","eudora","aurora"],
  lesley:["Zero escape skills. Any assassin kills her in one combo. Twilight Armor caps her crit damage at 900. She's invisible early game — buy detection wards.","fanny","ling","hayabusa"],
  valentina:["Saber point-click ults her instantly before she can copy. Nana Molina blocks her escape route. She copies your ult — don't pick AoE ults when she's in game. She's weakest before level 4.","saber","nana","kagura"],
  kagura:["Burst + point-click CC kills her. Don't chase her — she escapes easily with S2. Franco hooks her during umbrella animation. She's strongest in mid-game — end early or scale past her.","saber","eudora","franco"],
  lylia:["Burst her before she stacks 5 orbs — she's weak early. Saber ults her before she can ult to safety. She's immobile — any CC kills her. Deny her blue buff — she needs mana badly.","saber","kadita","eudora"],
  ixia:["No escape abilities at all. Dive assassins kill her before she can stack passive. She needs time to ramp up — end fights quickly. Focus her first in every teamfight.","fanny","ling","hayabusa"],
  gloo:["Valir pushes him off his attach target — completely negates his ult. True damage ignores his shield. Anti-heal (Dominance Ice) cuts his sustain. Cici %HP damage shreds him from range.","valir","cici","karrie"],
  floryn:["Baxia reduces her global healing by 50%. True damage ignores her heal entirely. She's immobile — any CC kills her. Burst her first — she's the backbone of their sustain.","baxia","lunox","karrie"],
  gatotkaca:["Diggie ult cleanses his taunt — completely negates his engage. True damage shreds his high HP pool. Cici kites him from range. Don't stand in his S2 — it knocks up everyone.","diggie","cici","karrie"],
  granger:["Low mobility marksman — dive him before he can reload his ult. He's weak in close range — assassins destroy him. Bait his ult then engage. He needs 6 bullets to ult — waste his ammo.","fanny","ling","hayabusa"],
  guinevere:["Her jump + knockup combo is her only engage. Khufra S2 bounces her jump. Minsitthar ult traps her mid-jump. Diggie ult cleanses her knockup. Don't group up — her ult hits AoE.","khufra","minsitthar","diggie"],
  hanabi:["Her shield reflects basic attacks — don't hit her when shielded. CC lock her AFTER shield breaks — she's defenseless. Her damage comes from basic attacks — buy Blade Armor. She has no escape.","khufra","atlas","aurora"],
  julian:["His enhanced skills reset on hits — anti-dash stops his engage. Saber ults him mid-combo before he can reset. Ruby CC locks him down. He's strongest at level 3 — be careful early.","khufra","minsitthar","saber"],
  karina:["She resets on kills — DON'T die near her. Nana Molina + Diggie ult deny her reset window. CC lock her before she can kill your teammate. She's weak to burst — one stun = death.","diggie","nana","saber"],
  khaleed:["Baxia reduces his sand healing by 50%. True damage ignores his sustain. Cici %HP damage kites him. He's immobile in sand form — poke him from range. He heals in ult — burst him after.","baxia","karrie","cici"],
  kimmy:["She moves while attacking but has zero escape. Fanny kills her instantly from range. Avoid standing in her S1 spray — it does massive DoT. She's squishy — one CC = death.","fanny","ling","hayabusa"],
  leomord:["Valir pushes him away during horse mode — completely negates his ult power spike. Cici kites him from range. Kite him during ult — he's fast but predictable. He's weak without his horse.","valir","cici","karrie"],
  moskov:["He pierces through targets — don't stand in a line. Fanny/Ling kill him before he can stack attack speed. He has zero escape — any assassin destroys him. Spread out in teamfights.","fanny","ling","hayabusa"],
  nolan:["He dashes through enemies for resets — anti-dash stops his chain. Saber point-click ults him before he can dash. He's squishy — one CC = death. CC him after his first dash.","khufra","minsitthar","saber"],
  phoveus:["DON'T pick dash heroes against him — he punishes mobility. Ranged poke (Valir, Karrie) destroys him from safe distance. He's weak to sustained damage — kite him. Franco hooks him out of position.","diggie","valir","karrie"],
  suyou:["He switches between ranged and melee — anti-dash stops his engages. Poke him in ranged form before he can switch. Ruby CC locks him down. He's weakest in melee form — keep your distance.","khufra","minsitthar","ruby"],
  bruno:["No escape skills at all. Any assassin kills him easily. Bait his ult knockback first — then he's defenseless. He needs to kick the ball to deal damage — dodge it. He's strong early but falls off.","fanny","ling","hayabusa"],
  aamon:["His invisibility is his only defense — Diggie ult reveals him. Saber ults him on sight. Nana Molina blocks his escape route. He's squishy — one CC = death. He needs to hit shards to go invisible.","diggie","saber","nana"],
  arlott:["Ruby's CC + heal out-sustains his combos. Cici pokes him safely from range. His combos need precise timing — interrupt him. He's weak to sustained damage — don't burst, outlast him.","ruby","cici","esmeralda"],
  aulus:["He needs to stack his passive — burst him before he stacks. Cici kites him from range. Benedetta dodges his combos. He's weak early — camp him in lane before he gets items.","cici","benedetta","esmeralda"],
  badang:["His wall trap is devastating in narrow spaces — fight in open areas. Diggie ult negates his wall stun. Valir pushes him away from walls. He's predictable — dodge his S2 dash.","diggie","valir","khufra"],
  bane:["His skills are telegraphed — dodge them easily. Mobile mages (Kagura, Lylia) avoid his ult. Nana Molina blocks his engage. He's weak to sustained damage — kite him after his burst.","kagura","lylia","nana"],
  chip:["Franco hooks him during portal setup — stops his team rotation. Diggie ult counters his ganks. He's squishy — burst him first. His portals are visible — predict where his team will appear.","diggie","franco","valir"],
  yi_sun_shin:["He has a global ult but low close-range defense. Dive him before he can ult. He's weak in melee — assassins destroy him. Ward his positions — his ult reveals map but leaves him exposed.","fanny","ling","hayabusa"],
  zhuxin:["Burst mages outrange her paper talismans. Saber deletes her instantly. She's squishy — one CC = death. She needs time to set up — rush her before she can place talismans.","saber","eudora","nana"],
  vale:["Low mobility mage — point-click assassins kill him. He's strongest with combo setup — interrupt him. Saber ults him on sight. He's useless if his knockup misses — bait it then engage.","saber","eudora","aurora"],
  minotaur:["Diggie ult counters his AoE knockup entirely. Valir pushes him away before he can set up. Nana Molina blocks his engage path. His rage mode is dangerous — CC him before it activates.","diggie","valir","nana"],
  barats:["True damage ignores his tankiness. Valir pushes him away before he can stack. Franco hooks him before he gets big. He's weak early — camp him before he stacks his passive.","cici","karrie","valir"],
  hylos:["HP-based damage (Karrie DHS) shreds him. True damage ignores his defense. He's slow and predictable — kite him. He burns mana fast — force extended fights to drain him.","karrie","lunox","cici"],
  belerick:["True damage ignores his passive reflect damage. Range him — his reflect only works in melee. Karrie passive shreds him. He's immobile — any CC locks him down.","karrie","lunox","dyrroth"],
  grock:["Valir pushes him away from walls — removes his passive speed boost. Cici %HP damage shreds his HP pool. He's strong near walls — fight in open areas. He's predictable — dodge his S1 charge.","valir","cici","ruby"],
  johnson:["Valentina steals his car ult — drives into his own team. Minsitthar traps his landing zone. Franco hooks him mid-drive. His car path is predictable — dodge sideways. He's useless without ult.","valentina","minsitthar","franco"],
  martis:["Burst him early — he's weak before level 4. CC lock him before he can ult reset. Eudora stun + burst kills him instantly. His ult resets on kills — don't let him get the first kill.","saber","eudora","aurora"],
  thamuz:["Kite him — he has no gap closer. He's strong in sustained fights — burst him quickly. Dyrroth out-damages him in short trades. He's weak to %HP damage — Cici shreds him.","benedetta","cici","valir"],
  dyrroth:["Dodge his S2 — that's his main burst. Sustain through his combo — he falls off after. Ruby out-heals his damage. Cici pokes him from range safely. He's weak after his S2 is on cooldown.","ruby","esmeralda","cici"],
};

function analyzeTeam(heroes) {
  const tags = new Set();
  let mobilityCount=0, sustainCount=0, ccCount=0, nPhys=0, nMagic=0;
  let hasHealer=false, hasDiver=false, hasPoke=false, hasSustain=false, hasCcTank=false;
  let hasSetup=false, hasPurifyThreat=false, hasAntiDash=false, hasTrueDmg=false;

  heroes.forEach(h => {
    const info = getInfo(h);
    if (!info[0]) return;
    if (info[3]==="high"||info[3]==="very_high") mobilityCount++;
    if (info[5]==="high"||info[5]==="very_high") sustainCount++;
    if (info[4]==="high"||info[4]==="very_high") ccCount++;
    if (info[2]==="physical") nPhys++;
    if (info[2]==="magic") nMagic++;
  });

  hasHealer = heroes.some(h => HEALERS.has(h));
  hasDiver = heroes.some(h => DIVE_ASSASSINS.has(h));
  hasPoke = heroes.some(h => POKE_MAGES.has(h));
  hasSustain = heroes.some(h => SUSTAIN_TANKS.has(h));
  hasCcTank = heroes.some(h => CC_TANKS.has(h));
  hasSetup = heroes.some(h => SETUP_MAGES.has(h));
  hasPurifyThreat = heroes.some(h => PURIFY_COUNTERS.has(h));
  hasAntiDash = heroes.some(h => ANTI_DASH.has(h));
  hasTrueDmg = heroes.some(h => TRUE_DMG.has(h));

  const nTanks = sustainCount;
  const nSquishy = 5 - nTanks;

  const badges = [];
  if (hasHealer) badges.push("HEAL");
  if (hasSustain) badges.push("TANKY");
  if (hasDiver) badges.push("DIVE");
  if (hasPoke) badges.push("POKE");
  if (hasCcTank) badges.push("CC");
  if (nTanks>=2) badges.push("2+ TANKS");
  if (nSquishy>=3) badges.push("SQUISHY");

  return {badges,nPhys,nMagic,nTanks,nSquishy,hasHealer,hasDiver,hasPoke,hasSustain,hasCcTank,hasSetup,hasPurifyThreat,hasAntiDash,hasTrueDmg,mobilityCount,sustainCount,ccCount};
}

function suggestRoles(heroes, a) {
  const result = {};
  let roam=[], expPicks=[], jungle=[], mid=[], gold=[];

  // ROAM
  if (a.hasHealer) roam.push(["Baxia","Anti-heal shuts down their sustain."]);
  if (a.hasCcTank||a.hasSetup) roam.unshift(["Diggie","Ult makes their main engage useless."]);
  if (a.hasDiver&&!a.hasAntiDash) {
    if (!roam.some(r=>r[0]==="Khufra")) roam.push(["Khufra","S2 cancels ALL their dashes."]);
    roam.push(["Minsitthar","Ult traps mobile heroes. Taunt stops resets."]);
  }
  if (a.hasPoke) { roam.push(["Kaja","Flicker ult their carry."]); }
  if (!roam.length) roam=[["Franco","Always useful. Hook wins games."],["Atlas","Game-changing AoE setup."],["Khufra","Anti-dive insurance."]];

  // EXP
  const enemyExp = heroes.filter(h=>getInfo(h)[0]==="exp");
  if (enemyExp.includes("esmeralda")) expPicks=[["Dyrroth","Shreds her shield."],["Cici","% HP poke ignores shield."],["Thamuz","True damage burns through."]];
  else if (enemyExp.some(h=>SUSTAIN_TANKS.has(h))) expPicks=[["Thamuz","True damage melts tanks."],["Cici","% HP destroys tanks."],["Dyrroth","Abyssal blade shreds."]];
  else if (enemyExp.some(h=>["chou","paquito"].includes(h))) expPicks=[["Ruby","Sustain + CC lock."],["Benedetta","S2 immune to combo."],["Esmeralda","Shield absorbs burst."]];
  else if (enemyExp.includes("benedetta")) expPicks=[["Minsitthar","Anti-dash makes useless."],["Khufra","Bounces dashes."]];
  else if (enemyExp.includes("cici")) expPicks=[["Ruby","CC locks dashes."],["Esmeralda","Shield absorbs % damage."]];
  if (!expPicks.length) expPicks=[["Ruby","Safe first pick."],["Esmeralda","Scales well."],["Cici","Mobile + % damage."]];

  // JUNGLE
  if (a.nTanks>=2) jungle=[["Karrie (jungle)","TRUE DAMAGE shreds tanks."],["Lunox (jungle)","Chaos ult = true damage."],["Fed","True damage + anti-heal."]];
  else if (a.nSquishy>=3) jungle=[["Ling","Deletes backline."],["Fanny","Fastest clear. Uncatchable."],["Hayabusa","Safe + lethal."]];
  if (a.hasAntiDash) {
    jungle=jungle.filter(h=>!["fanny","ling","lancelot","benedetta"].some(d=>h[0].toLowerCase().includes(d)));
    if (!jungle.length) jungle=[["Hayabusa","Safer vs anti-dash."],["Fed","Not affected by anti-dash."]];
  }

  // MID
  const enemyJung = heroes.filter(h=>getInfo(h)[0]==="jungle");
  const enemyRoam = heroes.filter(h=>getInfo(h)[0]==="roam");
  for (const j of enemyJung) {
    if (DIVE_ASSASSINS.has(j)) { mid=[["Saber (mid)","Point-click ult stops combo."],["Nana","Molina blocks dashes."],["Aurora","Freeze mid-dive."]]; break; }
  }
  for (const r of enemyRoam) {
    if (["atlas","tigreal"].includes(r)) { mid=[["Diggie (mid)","Hard counter."],["Valir","Push mid-ult."],["Kagura","S2 dodges setup."]]; break; }
    if (r==="khufra") { mid=[["Valir","Ranged poke."],["Kagura","Dodges S2 bounce."]]; break; }
    if (HEALERS.has(r)) { mid=[["Lunox","True damage ignores heals."],["Kadita","One-shot before heals."]]; break; }
  }
  if (!mid.length) mid=[["Valentina","Copies best enemy ult."],["Kagura","Never feeds."],["Lylia","High damage + survival ult."]];

  // GOLD
  if (a.nTanks>=2) gold=[["Karrie","TRUE DAMAGE shreds tanks."],["Claude","DHS destroys frontlines."]];
  else if (a.hasDiver||a.hasAntiDash) gold=[["Claude","Safest MM vs dive."],["Wanwan","Jump over everything."],["Natan","Untargetable ult."]];
  else if (a.hasCcTank) gold=[["Claude","Best vs CC tanks."],["Beatrix","Purify + shotgun."]];
  if (!gold.length) gold=[["Claude","Always relevant."],["Beatrix","Highest damage."],["Brody","Tanky + bully."]];

  // ITEMS
  const items = {};
  for (const [role,bk] of [["roam","vs_mixed"],["exp","general"],["jungle","general"],["mid","general"],["gold","general"]]) {
    let key = bk;
    if (role==="roam") { if (a.nPhys>=3) key="vs_physical"; else if (a.nMagic>=3) key="vs_magic"; else if (a.hasHealer) key="vs_healer"; }
    else if (role==="gold") { if (a.nTanks>=2) key="tanky"; else if (a.hasDiver) key="safe"; }
    else if (role==="mid"&&a.nTanks>=2) key="vs_tanks";
    else if (role==="jungle") { if (a.nTanks>=2) key="tanky"; else if (a.nSquishy>=3) key="squishy"; }
    else if (role==="exp") { if (a.hasHealer) key="vs_sustain"; else if (a.nMagic>=3) key="vs_magic"; else if (a.nPhys>=3) key="vs_physical"; }
    items[role] = (ITEM_RECOMMENDATIONS[role][key]||ITEM_RECOMMENDATIONS[role].general).slice(0,4);
  }

  return {roam:roam.slice(0,3),exp:expPicks.slice(0,3),jungle:jungle.slice(0,3),mid:mid.slice(0,3),gold:gold.slice(0,3),items};
}

function generatePlaystyle(heroes, picks, a) {
  const g = {early:[],mid:[],late:[],wincon:[],danger:[]};
  const ourPicks = [];
  ["roam","exp","jungle","mid","gold"].forEach(role => {
    (picks[role]||[]).forEach(p => ourPicks.push(p[0].toLowerCase().replace(/ \(.*\)/g,"")));
  });

  const earlyHeroes = new Set(["martis","hilda","valir","khaleed","paquito","dyrroth","roger","arlott","badang","aulus"]);
  const ourEarly = ourPicks.filter(h=>earlyHeroes.has(h));
  const enemyEarly = heroes.filter(h=>earlyHeroes.has(h));

  if (ourEarly.length&&!enemyEarly.length) {
    g.early.push("YOU WIN EARLY. Your heroes are stronger before level 4. Invade their jungle, steal buffs, and force fights at every objective.");
    g.early.push(`Your early powerhouses: ${ourEarly.slice(0,2).map(h=>h.replace(/\b\w/g,c=>c.toUpperCase())).join(', ')} — use them to snowball.`);
  } else if (enemyEarly.length&&!ourEarly.length) {
    g.early.push("THEY WIN EARLY. Play safe, freeze lane near your tower, and don't contest the first turtle. Survive to mid-game.");
    g.early.push(`Avoid fighting: ${enemyEarly.slice(0,2).map(h=>h.replace(/\b\w/g,c=>c.toUpperCase())).join(', ')} until you have your core items.`);
  } else if (ourEarly.length&&enemyEarly.length) {
    g.early.push("EARLY GAME IS EVEN. Focus on farming efficiently. First turtle depends on which team rotates faster — communicate with your jungle.");
  } else {
    g.early.push("BOTH TEAMS SCALE. Farm safely, look for pick opportunities on isolated enemies, and avoid full teamfights until you have items.");
  }

  const pickoffHeroes = new Set(["franco","saber","selena","kaja","natalia","helcurt","aamon","karina","nolan"]);
  const teamfightHeroes = new Set(["atlas","tigreal","khufra","minsitthar","odette","pharsa","yve","aurora","carmilla","gatotkaca","minotaur"]);
  const enemyTeamfight = heroes.filter(h=>teamfightHeroes.has(h));
  const ourPickoff = ourPicks.filter(h=>pickoffHeroes.has(h));
  const ourTeamfight = ourPicks.filter(h=>teamfightHeroes.has(h));

  if (ourPickoff.length&&!enemyTeamfight.length) {
    g.mid.push("ROTATE AS 2-3 and look for picks on isolated enemies. Don't show on map — create pressure through fog of war.");
    g.mid.push(`Your pickers: ${ourPickoff.slice(0,2).map(h=>h.replace(/\b\w/g,c=>c.toUpperCase())).join(', ')} — ambush them before objectives.`);
  } else if (ourTeamfight.length&&!ourPickoff.length) {
    g.mid.push("GROUP UP as 5 and force teamfights around Lord/Turtle. Your AoE combos will win extended fights.");
    g.mid.push(`Your teamfight ults: ${ourTeamfight.slice(0,2).map(h=>h.replace(/\b\w/g,c=>c.toUpperCase())).join(', ')} — coordinate your engages.`);
  } else {
    g.mid.push("PLAY FOR PICKS. Rotate in pairs, catch enemies rotating to objectives. Don't force 5v5 unless you have positional advantage.");
  }

  const scalers = new Set(["karrie","lunox","claude","aldous","cecilion","moskov","bruno","granger","kagura","lylia","julian","zhuxin"]);
  const ourScalers = ourPicks.filter(h=>scalers.has(h));
  const enemyScalers = heroes.filter(h=>scalers.has(h));
  if (ourScalers.length&&!enemyScalers.length) {
    g.late.push(`YOU OUTSCALE. Your ${ourScalers[0].replace(/\b\w/g,c=>c.toUpperCase())} becomes a monster late game. Play safe, farm efficiently, and delay the game.`);
    g.late.push("Win teamfights at 15+ min when your carries are fully itemized. Don't throw early leads.");
  } else if (enemyScalers.length&&!ourScalers.length) {
    g.late.push(`YOU NEED TO END EARLY. Enemy ${enemyScalers[0].replace(/\b\w/g,c=>c.toUpperCase())} will outscale you. Take Lord, siege base, close the game before 15 min.`);
    g.late.push("Force fights while you're ahead. Don't let the game drag — every minute favors them.");
  } else if (ourScalers.length&&enemyScalers.length) {
    g.late.push("BOTH TEAMS SCALE. The better teamfight composition wins late. Focus on positioning and objective control.");
  } else {
    g.late.push("LATE GAME IS EVEN. Winning depends on Lord control, pickoffs, and which team makes fewer mistakes.");
  }

  const wc = [];
  heroes.forEach(h => {
    if (h==="fanny") { wc.push("KILL FANNY BEFORE LEVEL 4. Invade her blue buff — she's useless without energy after the nerf."); wc.push("After level 4, stick as 5. Don't let her pick off isolated targets with cable combos."); }
    if (h==="ling") { wc.push("DENY LING'S BLUE BUFF. He's energy-dependent — no blue = no damage. Ward his jungle."); wc.push("CC him when he lands from walls — he's stationary for 0.5s. That's your window."); }
    if (h==="estes") { wc.push("PICK OFF ESTES FIRST in every fight. He's the engine of their sustain — kill him and the rest crumble."); wc.push("Buy anti-heal items by minute 5. Dominance Ice, Sea Halberd, or Necklace of Durance."); }
    if (h==="atlas") { wc.push("NEVER CLUMP TOGETHER. Atlas 5-man ult = instant team wipe. Spread out and bait his engage."); wc.push("Diggie is your best friend here — his ult makes Atlas completely useless."); }
    if (h==="claude") { wc.push("CC CLAUDE WHEN HE CURLS (S2). He's stationary during the animation — that's your window to burst."); }
    if (h==="beatrix") { wc.push("DIVE BEATRIX. She has no escape skills — any assassin kills her. Bait her ult first, then engage."); }
    if (h==="phoveus") { wc.push("DON'T DASH AROUND PHOVEUS. He punishes mobility with his passive. Pick ranged heroes and poke him down."); }
    if (h==="moskov") { wc.push("DON'T STAND IN A LINE. Moskov pierces through targets — spread out in teamfights."); }
  });
  ourPicks.forEach(h => {
    if (h==="diggie"&&heroes.some(e=>["atlas","tigreal","johnson"].includes(e))) wc.push("FORCE FIGHTS. Enemy's main engage is completely useless with your Diggie ult — abuse this advantage.");
    if (h==="khufra"&&heroes.some(e=>["fanny","ling","lancelot"].includes(e))) wc.push("STICK WITH KHUFRA. His S2 cancels their mobility — he protects your backline from dives.");
    if (h==="karrie"&&heroes.some(e=>SUSTAIN_TANKS.has(e))) wc.push("PROTECT KARRIE. She's your tank killer — DHS + passive shreds their frontline in 3 seconds.");
    if (h==="franco") wc.push("FRANCO HOOK WINS GAMES. Hook their carry before objectives — a 4v5 fight is an easy win.");
  });
  g.wincon = wc.slice(0,4).length ? wc.slice(0,4) : ["PLAY YOUR STRENGTHS."];

  const dangers = [];
  heroes.forEach(h => {
    if (["atlas","tigreal"].includes(h)) dangers.push("Don't clump together — their AoE CC ult can catch 3-4 people and instant-wipe your team. Spread out and fight in open areas.");
    if (h==="franco") dangers.push("Don't stand still or walk in straight lines — Franco hook is a free kill. Always juke and keep moving. Ward bush corners.");
    if (["fanny","ling","hayabusa","lancelot"].includes(h)) dangers.push(`Don't roam alone — ${h.replace(/\b\w/g,c=>c.toUpperCase())} will find you and one-shot you. Stick with your team after level 4.`);
    if (["estes","rafaela","floryn","angela"].includes(h)) dangers.push("BUY ANTI-HEAL ITEMS IMMEDIATELY. Their healer makes your damage useless without anti-heal. Dominance Ice, Sea Halberd, or Necklace of Durance by minute 5.");
    if (["karrie","lunox","dyrroth","alpha"].includes(h)) dangers.push("Enemy has TRUE DAMAGE — armor and magic resist won't help. Build HP items instead. Blade Armor and Athena's Shield are useless here.");
    if (h==="phoveus") dangers.push("Phoveus punishes every dash and blink — don't pick dash-heavy heroes against him. Ranged poke heroes destroy him from safe distance.");
    if (h==="esmeralda") dangers.push("Esmeralda STEALS your shields and heals from magic damage — never pick magic heroes against her. True damage and physical only.");
    if (h==="moskov") dangers.push("Moskov pierces through ALL targets in a line — never stand behind your teammates. Spread out in teamfights.");
  });
  g.danger = dangers.slice(0,5);

  return g;
}

function getSynergies(picks) {
  const synergies = [];
  const known = {
    "Diggie+Claude":"Diggie ult makes Claude untargetable while he ults — he can Blazing Duet freely without being CC'd or burst down.",
    "Khufra+Claude":"Khufra S2 catches enemies in place, then Claude curls in and shreds them with Blazing Duet.",
    "Baxia+Karrie":"Baxia reduces enemy healing by 50%, then Karrie's true damage passive melts through their sustain.",
    "Franco+Saber":"Franco hooks a target into your team, Saber point-click ults them — guaranteed kill before they can react.",
    "Atlas+Aurora":"Atlas sets up a 3-5 man ult, Aurora follows with her freeze — entire enemy team is CC'd for 3+ seconds.",
    "Diggie+Valir":"Diggie ult cleanses all CC while Valir pushes enemies away — your team is unstoppable in teamfights.",
    "Minsitthar+Ling":"Minsitthar ult traps enemies in a zone, Ling jumps from walls and deletes them — they can't escape.",
    "Baxia+Lunox":"Baxia anti-heal cuts their sustain, Lunox chaos form shreds tanks with true damage.",
  };
  const allPicks = ["roam","exp","jungle","mid","gold"].flatMap(r=>(picks[r]||[]).map(p=>p[0]));
  for (const [combo,desc] of Object.entries(known)) {
    const [a,b] = combo.split("+");
    if (allPicks.includes(a)&&allPicks.includes(b)) synergies.push(`${a} + ${b}: ${desc}`);
  }
  return synergies.slice(0,3);
}

function runAnalysis(heroNames) {
  const heroes = [];
  const unknown = [];
  heroNames.forEach(name => {
    const n = normalize(name);
    if (HERO_ROLES[n]) heroes.push(n);
    else unknown.push(name);
  });
  if (unknown.length) return {error:`Unknown heroes: ${unknown.join(", ")}`};
  if (heroes.length<5) return {error:"Need exactly 5 heroes."};

  const a = analyzeTeam(heroes);
  const picks = suggestRoles(heroes, a);
  const playstyle = generatePlaystyle(heroes, picks, a);
  const synergies = getSynergies(picks);

  const counterTips = heroes.filter(h=>COUNTER_KNOWLEDGE[h]).map(h=>{
    const data = COUNTER_KNOWLEDGE[h];
    return {hero:h.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase()),strategy:data[0],counters:data.slice(1)};
  });

  const itemsGuide = [];
  if (a.hasHealer) itemsGuide.push("VITAL: Anti-heal for EVERYONE");
  if (a.nPhys>=3) itemsGuide.push("Build Blade Armor (reflects physical)");
  if (a.nMagic>=3) itemsGuide.push("Build Athena's Shield (magic shield)");
  if (a.hasTrueDmg) itemsGuide.push("True damage present. Build HP, not armor.");
  if (a.nTanks>=2) itemsGuide.push("Build Demon Hunter Sword (tank melter)");
  if (a.hasDiver||a.hasSetup) itemsGuide.push("Purify battle spell recommended");

  return {
    enemy:heroes.map(h=>h.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())),
    badges:a.badges, nPhys:a.nPhys, nMagic:a.nMagic, hasTrueDmg:a.hasTrueDmg,
    rolePicks:{
      roam:picks.roam.map(([h,r])=>({hero:h,reason:r})),
      exp:picks.exp.map(([h,r])=>({hero:h,reason:r})),
      jungle:picks.jungle.map(([h,r])=>({hero:h,reason:r})),
      mid:picks.mid.map(([h,r])=>({hero:h,reason:r})),
      gold:picks.gold.map(([h,r])=>({hero:h,reason:r})),
    },
    items:picks.items, playstyle, synergies, counterTips, itemsGuide,
  };
}
