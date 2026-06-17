# MLBB Draft Counter Picker - Android APK

A Mobile Legends: Bang Bang draft counter picker tool that runs locally on Android. Enter 5 enemy heroes and get optimal counter-picks per role, itemization, playstyle guides, and specific counter tips.

## Features

- **160+ heroes** in database with aliases and fuzzy matching
- **5-role counter picks**: Roam, EXP, Jungle, Mid, Gold
- **Itemization guide**: Build recommendations per role
- **Playstyle guide**: Early/mid/late game strategy
- **Win condition analysis**
- **Danger warnings**
- **Synergy detection**
- **Fully offline** - no internet required

## Build APK

### Prerequisites

- Python 3.10+
- Java JDK 17
- Android SDK (API 34)
- Android NDK (26.1+)
- Buildozer

### Install Dependencies

```bash
pip install buildozer kivy
```

### Build

```bash
cd mlbb-draft-picker-apk
buildozer android debug
```

The APK will be in `bin/` directory.

### Install on Device

```bash
adb install bin/mlbbdraftpicker-1.0.0-debug.apk
```

## Run Locally (Desktop)

```bash
python main.py
```

## Usage

1. Enter 5 enemy hero names (one per field)
2. Tap "ANALYZE DRAFT"
3. Scroll through results to see:
   - Enemy team analysis (badges: HEAL, TANKY, DIVE, CC, etc.)
   - Recommended picks per role with reasoning
   - Build order for each role
   - Playstyle guide (early/mid/late game)
   - Win conditions
   - Danger warnings
   - Specific counter tips per enemy hero

## Hero Examples

- `fanny`, `chou`, `ruby`, `ling`, `haya` (short names work)
- `esme` (alias for Esmeralda)
- `lance` (alias for Lancelot)
- `urasmus` (alias for Uranus)
- `gloom` (alias for Gloo)

## Project Structure

```
mlbb-draft-picker-apk/
  main.py              # Kivy app entry point
  mlbb_engine.py       # Core analysis engine (no web dependencies)
  mlbb.kv              # Kivy UI layout
  buildozer.spec       # Buildozer configuration
  requirements.txt     # Python dependencies
```
