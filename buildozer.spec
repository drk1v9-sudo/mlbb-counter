[app]

# App info
title = MLBB Draft Picker
package.name = mlbbdraftpicker
package.domain = com.mlbbdraftpicker
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 1.0.0

# Requirements
requirements = python3,kivy

# Android config
android.permissions =
android.api = 34
android.minapi = 24
android.ndk = 26.1.10909125
android.arch = arm64-v8a
android.release_artifact = apk

# Build settings
fullscreen = 0
orientation = portrait
android.topdown = 1

# Icon (192x192 png recommended)
# icon.filename = %(source.dir)s/icon.png

# Presplash
# presplash.filename = %(source.dir)s/presplash.png

# Landscape not needed for this app
android.allow_backup = True

# Log level
log_level = 2

# Buildozer
# buildozer uses this to find android SDK/NDK
# These paths are auto-detected if set in environment
android.sdk_path =
android.ndk_path =

# P4A (python-for-android)
p4a.branch = develop

# Services (none needed for local-only app)
# android.services =

# Android extras
android.add_assets = mlbb.kv

# Module packaging - include all .py files
source.include_patterns = *.py

# Exclude test files
source.exclude_patterns = test*,*.pyc,__pycache__*
