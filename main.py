"""
MLBB Draft Counter Picker - Android App
Run: python main.py
Build APK: buildozer android debug
"""

import os
os.environ["KIVY_NO_ARGS"] = "1"

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.core.window import Window
from mlbb_engine import run_analysis

# Dark theme colors
ACCENT = (0, 0.9, 1, 1)
RED = (1, 0.35, 0.35, 1)
GREEN = (0.3, 0.9, 0.4, 1)
YELLOW = (1, 0.85, 0.3, 1)
BLUE = (0.3, 0.6, 1, 1)
PURPLE = (0.7, 0.4, 1, 1)
WHITE = (1, 1, 1, 1)
DIM = (0.6, 0.6, 0.7, 1)
BG = (0.06, 0.06, 0.12, 1)


class MLBBApp(BoxLayout):
    def analyze(self):
        inputs = [
            self.ids.hero1.text.strip(),
            self.ids.hero2.text.strip(),
            self.ids.hero3.text.strip(),
            self.ids.hero4.text.strip(),
            self.ids.hero5.text.strip(),
        ]

        if not all(inputs):
            self.show_results("[color=ff5555]Please fill all 5 hero fields.[/color]")
            return

        result = run_analysis(inputs)

        if "error" in result:
            self.show_results(f"[color=ff5555]{result['error']}[/color]\n\nTry: fanny, chou, ruby, ling, haya, atlas, estes, etc.")
            return

        self.display_results(result)

    def show_results(self, text):
        self.ids.result_label.markup = True
        self.ids.result_label.text = text

    def display_results(self, r):
        lines = []

        # Enemy
        enemies = ", ".join(r["enemy_heroes"])
        lines.append(f"[color=00e5ff][b]ENEMY:[/b] {enemies}[/color]")

        # Badges
        if r["badges"]:
            badges = " ".join(f"[color=8080ff][{b}][/color]" for b in r["badges"])
            lines.append(badges)

        # Damage info
        if r["n_phys"] >= 3:
            lines.append("[color=ff5555]3+ Physical. Build Blade Armor.[/color]")
        if r["n_magic"] >= 3:
            lines.append("[color=5588ff]3+ Magic. Build Athena's Shield.[/color]")
        if r["has_true_dmg"]:
            lines.append("[color=ffcc00]True damage present. Build HP, not armor.[/color]")

        lines.append("")

        # Role picks
        role_names = {
            "roam": "ROAM", "exp": "EXP LANE", "jungle": "JUNGLE",
            "mid": "MID LANE", "gold": "GOLD LANE"
        }
        for role_key, role_label in role_names.items():
            picks = r["role_picks"].get(role_key, [])
            if not picks:
                continue
            lines.append(f"[color=00e5ff][b]{role_label}[/b][/color]")
            for i, pick in enumerate(picks, 1):
                lines.append(f"  {i}. [color=55cc55]{pick['hero']}[/color]")
                lines.append(f"     {pick['reason']}")

            items = r["items"].get(role_key, [])
            if items:
                build_str = " > ".join(items[:4])
                lines.append(f"  [color=888899]Build: {build_str}[/color]")

            # MUST BUY hints
            if role_key == "roam" and r.get("items_guide"):
                for hint in r["items_guide"]:
                    if "anti-heal" in hint.lower() or "anti heal" in hint.lower():
                        lines.append(f"  [color=ffcc00]MUST BUY: Dominance Ice (anti-heal)[/color]")
                        break
            if role_key == "gold" and r["n_phys"] >= 3:
                lines.append(f"  [color=ffcc00]MUST BUY: Wind of Nature[/color]")
            lines.append("")

        # Synergies
        if r["synergies"]:
            lines.append("[color=00e5ff][b]TEAM SYNERGIES[/b][/color]")
            for s in r["synergies"][:3]:
                lines.append(f"  [color=00cccc]>>[/color] {s}")
            lines.append("")

        # Playstyle
        ps = r.get("playstyle", {})
        lines.append("[color=00e5ff][b]PLAYSTYLE GUIDE[/b][/color]")

        if ps.get("early"):
            lines.append("[color=55cc55]EARLY GAME (0-8 min):[/color]")
            for tip in ps["early"][:2]:
                lines.append(f"  {tip}")
        if ps.get("mid"):
            lines.append("[color=cccc55]MID GAME (8-15 min):[/color]")
            for tip in ps["mid"][:2]:
                lines.append(f"  {tip}")
        if ps.get("late"):
            lines.append("[color=ff5555]LATE GAME (15+ min):[/color]")
            for tip in ps["late"][:2]:
                lines.append(f"  {tip}")
        if ps.get("wincon"):
            lines.append("[color=ffffff][b]WIN CONDITION:[/b][/color]")
            for tip in ps["wincon"][:3]:
                lines.append(f"  {tip}")
        if ps.get("danger"):
            lines.append("[color=ff5555]DANGERS:[/color]")
            for tip in ps["danger"][:3]:
                lines.append(f"  ! {tip}")
        lines.append("")

        # Counter tips
        if r.get("counter_tips"):
            lines.append("[color=00e5ff][b]SPECIFIC COUNTER TIPS[/b][/color]")
            for tip in r["counter_tips"]:
                counters_str = ", ".join(tip["counters"])
                lines.append(f"  [color=ffffff]vs {tip['hero']}:[/color]")
                lines.append(f"     Pick: [color=00cccc]{counters_str}[/color]")
                lines.append(f"     {tip['strategy'][:150]}")
            lines.append("")

        # Items guide
        if r.get("items_guide"):
            lines.append("[color=00e5ff][b]ITEMIZATION[/b][/color]")
            for item_hint in r["items_guide"]:
                lines.append(f"  - {item_hint}")

        self.ids.result_label.markup = True
        self.ids.result_label.text = "\n".join(lines)


class MLBBDraftPickerApp(App):
    def build(self):
        self.title = "MLBB Draft Counter Picker"
        Window.clearcolor = BG
        return MLBBApp()


if __name__ == "__main__":
    MLBBDraftPickerApp().run()
