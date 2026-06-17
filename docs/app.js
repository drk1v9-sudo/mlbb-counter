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
  fed:["jungle","exp","physical","medium","low","low","low"],
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
  chang:["mid","gold","magic","high","low","low","low"],
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
const DIVE_ASSASSINS=new Set(["fanny","ling","hayabusa","lancelot","benedetta","gusion","fed","yin","helcurt","aamon","karina","nolan","suyou"]);
const BURST_MAGES=new Set(["eudora","aurora","kadita","selena","saber","harley","odette","vexana","vale","zhuxin"]);
const SETUP_MAGES=new Set(["atlas","tigreal","kaja","carmilla","khufra"]);
const PURIFY_COUNTERS=new Set(["atlas","tigreal","kaja","khufra","chou"]);
const ANTI_DASH=new Set(["khufra","minsitthar"]);

const ALIASES = {};
Object.keys(HERO_ROLES).forEach(k => ALIASES[k] = k);
Object.assign(ALIASES, {
  esme:"esmeralda",yuzhong:"yu_zhong",urasmus:"uranus",
  bene:"benedetta",haya:"hayabusa",lance:"lancelot",
  bea:"beatrix",nova:"novaria",change:"chang",min:"minsitthar",
  john:"johnson",jonson:"johnson",kupa:"popol",xborg:"x_borg",
  lapu:"lapu_lapu",ceci:"cecilion",luoyi:"luo_yi",
  fred:"fredrinn",gloom:"gloo",flo:"floryn",
  gatot:"gatotkaca",guin:"guinevere",leo:"leomord",
  mino:"minotaur",phov:"phoveus",soyou:"suyou",
  "yi sun shin":"yi_sun_shin",
});

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
  fanny:["Khufra cancels cables. Franco hooks mid-flight. Nana Molina blocks.","khufra","minsitthar","franco"],
  ling:["Khufra S2 stops wall jumps. Aurora freezes his landing.","khufra","minsitthar","aurora"],
  hayabusa:["Minsitthar traps him. Saber ults him on reappear.","minsitthar","khufra","saber"],
  lancelot:["Anti-dash stops I-frames. Minsitthar ult traps reset.","khufra","minsitthar","ruby"],
  benedetta:["Anti-dash makes her useless. Valir pushes away.","khufra","minsitthar","valir"],
  gusion:["Anti-dash. Nana Molina blocks daggers. Saber ults mid-combo.","khufra","minsitthar","saber"],
  chou:["Minsitthar stops escape. Diggie ult negates CC. Ruby out-sustains.","minsitthar","diggie","ruby"],
  esmeralda:["True damage > shield. Baxia reduces shield gain.","dyrroth","cici","karrie"],
  uranus:["True damage melts HP. Baxia anti-heal.","thamuz","dyrroth","karrie"],
  fed:["Valir pushes away from camps. Lylia survives fury.","valir","lylia","lancelot"],
  atlas:["DIGGIE = hard counter. His ult = useless. Valir pushes mid-ult.","diggie","valir","franco"],
  tigreal:["Same as Atlas. Diggie best counter.","diggie","valir","nana"],
  estes:["Baxia reduces heal. True damage ignores heal. Burst him.","baxia","lunox","kadita"],
  khufra:["Ranged mages with no dash. Avoid blinking near him.","valir","kagura","lylia"],
  kaja:["Diggie ult removes suppression. Lylia ult saves.","diggie","rafaela","lylia"],
  claude:["Anti-dash. Eudora stun + burst. Saber ults before curl.","khufra","minsitthar","saber"],
  wanwan:["Point-click CC. Franco hook ignores jump.","franco","kaja","aurora"],
  beatrix:["No escape. Any dive assassin kills her.","fanny","ling","hayabusa"],
  layla:["Free kill for any assassin. No escape.","fanny","ling","hayabusa"],
  natan:["CC lock him. Valir pushes away.","franco","kaja","valir"],
  lunox:["CC lock before chaos mode. Burst > light ult.","saber","eudora","aurora"],
  lesley:["Zero escape. Any assassin.","fanny","ling","hayabusa"],
  valentina:["Saber ults instantly. Nana Molina.","saber","nana","kagura"],
  kagura:["Burst + point-click CC. Don't chase.","saber","eudora","franco"],
  lylia:["Burst before she stacks orbs. Weak early.","saber","kadita","eudora"],
  ixia:["No escape. Dive assassins kill before passive stacks.","fanny","ling","hayabusa"],
  gloo:["Valir pushes him off. True damage + anti-heal kills him.","valir","cici","karrie"],
  floryn:["Baxia anti-heal. True damage ignores heal.","baxia","lunox","karrie"],
  gatotkaca:["Diggie ult cleanses taunt. True damage shreds him.","diggie","cici","karrie"],
  granger:["Low mobility. Dive before reload.","fanny","ling","hayabusa"],
  guinevere:["Anti-dash stops jump. Khufra/Minsitthar hard counter.","khufra","minsitthar","diggie"],
  hanabi:["Shield reflects basics. CC lock after shield breaks.","khufra","atlas","aurora"],
  julian:["Anti-dash stops engage. Saber ults mid-combo.","khufra","minsitthar","saber"],
  karina:["Nana Molina + Diggie ult deny resets. CC lock before reset.","diggie","nana","saber"],
  khaleed:["Baxia anti-heal. True damage > sustain.","baxia","karrie","cici"],
  kimmy:["No escape. Fanny kills instantly.","fanny","ling","hayabusa"],
  leomord:["Valir pushes away. Kite during ult.","valir","cici","karrie"],
  moskov:["No escape. Fanny/Ling kill before stacks.","fanny","ling","hayabusa"],
  nolan:["Anti-dash stops resets. Saber ults.","khufra","minsitthar","saber"],
  phoveus:["Don't pick dash heroes. Ranged poke destroys.","diggie","valir","karrie"],
  suyou:["Anti-dash stops engages. Poke in ranged form.","khufra","minsitthar","ruby"],
  bruno:["No escape. Any assassin kills. Bait ult knockback first.","fanny","ling","hayabusa"],
  aamon:["Invisibility only defense. Diggie reveals. Saber ults on sight.","diggie","saber","nana"],
  arlott:["Ruby CC+heal out-sustains. Cici pokes safely.","ruby","cici","esmeralda"],
  aulus:["Kite + burst before he stacks passive.","cici","benedetta","esmeralda"],
  badang:["Diggie ult + Valir push counter hard.","diggie","valir","khufra"],
  bane:["Mobile mages dodge ult easily.","kagura","lylia","nana"],
  chip:["Franco hooks during portal setup. Diggie counters ganks.","diggie","franco","valir"],
  yi_sun_shin:["Low close-range defense. Dive before ult.","fanny","ling","hayabusa"],
  zhuxin:["Burst mages outrange. Saber deletes instantly.","saber","eudora","nana"],
  vale:["Low mobility. Point-click assassins kill him.","saber","eudora","aurora"],
  minotaur:["Diggie ult counters AoE knockup. Valir pushes away.","diggie","valir","nana"],
  barats:["True damage. Valir pushes. Franco hooks before stacks.","cici","karrie","valir"],
  hylos:["HP-based damage. Karrie DHS + true damage.","karrie","lunox","cici"],
  belerick:["True damage ignores passive reflect. Range him.","karrie","lunox","dyrroth"],
  grock:["Valir pushes from walls. Cici % damage.","valir","cici","ruby"],
  johnson:["Valentina steals car. Minsitthar traps landing.","valentina","minsitthar","franco"],
  martis:["Burst him early. CC lock before ult resets.","saber","eudora","aurora"],
  thamuz:["Kite him. No gap closer.","benedetta","cici","valir"],
  dyrroth:["Dodge S2. Sustain through combo. Kite after burst.","ruby","esmeralda","cici"],
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
    if (j==="fed") { mid=[["Valir","Push away from camps."],["Lylia","Survives fury."]]; break; }
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

  const earlyHeroes = new Set(["fed","martis","hilda","valir","khaleed","paquito","dyrroth","roger","arlott","badang","aulus"]);
  const ourEarly = ourPicks.filter(h=>earlyHeroes.has(h));
  const enemyEarly = heroes.filter(h=>earlyHeroes.has(h));

  if (ourEarly.length&&!enemyEarly.length) g.early.push("YOU WIN EARLY. Invade their jungle. Force fights.");
  else if (enemyEarly.length&&!ourEarly.length) g.early.push("THEY WIN EARLY. Play safe. Don't contest first turtle.");
  else if (ourEarly.length&&enemyEarly.length) g.early.push("EARLY GAME IS EVEN. Focus on farm.");
  else g.early.push("BOTH SCALE. Farm efficiently. Look for picks.");

  const pickoffHeroes = new Set(["franco","saber","selena","kaja","natalia","helcurt","aamon","karina","nolan"]);
  const teamfightHeroes = new Set(["atlas","tigreal","khufra","minsitthar","odette","pharsa","yve","aurora","carmilla","gatotkaca","minotaur"]);
  const enemyTeamfight = heroes.filter(h=>teamfightHeroes.has(h));
  const ourPickoff = ourPicks.filter(h=>pickoffHeroes.has(h));
  const ourTeamfight = ourPicks.filter(h=>teamfightHeroes.has(h));

  if (ourPickoff.length&&!enemyTeamfight.length) g.mid.push("ROTATE AS 5. Look for picks on isolated enemies.");
  else if (ourTeamfight.length&&!ourPickoff.length) g.mid.push("GROUP UP. Force 5v5 fights around objectives.");
  else g.mid.push("PLAY FOR PICKS. Rotate as 2-3. Catch them rotating.");

  const scalers = new Set(["karrie","lunox","claude","aldous","cecilion","moskov","bruno","granger","kagura","lylia","julian","zhuxin"]);
  const ourScalers = ourPicks.filter(h=>scalers.has(h));
  const enemyScalers = heroes.filter(h=>scalers.has(h));
  if (ourScalers.length&&!enemyScalers.length) g.late.push("YOU OUTSCALE. Delay game to late.");
  else if (enemyScalers.length&&!ourScalers.length) g.late.push("YOU NEED TO END EARLY. Don't let it reach 15 min.");
  else if (ourScalers.length&&enemyScalers.length) g.late.push("BOTH SCALE. Better teamfight wins.");
  else g.late.push("LATE GAME IS EVEN. Lord control decides.");

  const wc = [];
  heroes.forEach(h => {
    if (h==="fanny") { wc.push("KILL FANNY BEFORE Lv4. Invade her blue."); wc.push("Stick together after Lv4."); }
    if (h==="ling") wc.push("DENY LING'S BLUE BUFF.");
    if (h==="estes") wc.push("PICK OFF ESTES FIRST. Buy anti-heal immediately.");
    if (h==="atlas") wc.push("DON'T CLUMP. Atlas ult = instant wipe.");
    if (h==="claude") wc.push("CC CLAUDE WHEN HE CURLS.");
    if (h==="beatrix") wc.push("DIVE BEATRIX. She has no escape.");
    if (h==="phoveus") wc.push("DON'T DASH. Pick ranged heroes.");
  });
  ourPicks.forEach(h => {
    if (h==="diggie"&&heroes.some(e=>["atlas","tigreal","johnson"].includes(e))) wc.push("FORCE FIGHTS. Enemy engage useless with Diggie ult.");
    if (h==="khufra"&&heroes.some(e=>["fanny","ling","lancelot"].includes(e))) wc.push("STICK WITH KHUFRA. Protects backline.");
    if (h==="karrie"&&heroes.some(e=>SUSTAIN_TANKS.has(e))) wc.push("PROTECT KARRIE. Tank killer. DHS melts them.");
    if (h==="franco") wc.push("FRANCO HOOK WINS GAMES. Hook carry before objectives.");
  });
  g.wincon = wc.slice(0,4).length ? wc.slice(0,4) : ["PLAY YOUR STRENGTHS."];

  const dangers = [];
  heroes.forEach(h => {
    if (["atlas","tigreal"].includes(h)) dangers.push("Don't clump — AoE cc = instant teamwipe.");
    if (h==="franco") dangers.push("Don't stand still — Franco hook ends your life.");
    if (["fanny","ling","hayabusa","lancelot"].includes(h)) dangers.push(`Don't roam alone — ${h} will pick you off.`);
    if (["estes","rafaela","floryn","angela"].includes(h)) dangers.push("BUY ANTI-HEAL immediately.");
    if (["karrie","lunox","dyrroth","alpha"].includes(h)) dangers.push("Enemy has TRUE DAMAGE. Build HP, not armor.");
    if (h==="phoveus") dangers.push("Phoveus punishes dashes — don't pick dash heroes.");
  });
  g.danger = dangers.slice(0,4);

  return g;
}

function getSynergies(picks) {
  const synergies = [];
  const known = {
    "Diggie+Claude":"Diggie ult protects Claude while he ults.",
    "Khufra+Claude":"Khufra catches them, Claude kills.",
    "Baxia+Karrie":"Anti-heal + true damage = deadly.",
    "Franco+Saber":"Franco hooks, Saber ult = free kill.",
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
