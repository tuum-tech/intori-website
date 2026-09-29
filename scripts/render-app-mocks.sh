#!/usr/bin/env bash
# Render the app screen mocks in design/app-mocks/ to 1206 x 2622 JPEGs
# (iPhone 17 Pro at 3x) in public/brand/app/.
#
#   scripts/render-app-mocks.sh            # every mock
#   scripts/render-app-mocks.sh today week # just these
#
# Uses the system Google Chrome in headless mode. The page zooms itself to 3x
# when loaded with ?render, so the window is the full pixel size and no device
# emulation is needed. Needs network for the Inter web font.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/design/app-mocks"
OUT="$ROOT/public/brand/app"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT"

if [ "$#" -gt 0 ]; then
  names=("$@")
else
  names=()
  for f in "$SRC"/*.html; do names+=("$(basename "$f" .html)"); done
fi

for name in "${names[@]}"; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1206,2622 --virtual-time-budget=4000 \
    --screenshot="$TMP/$name.png" "file://$SRC/$name.html?render" >/dev/null 2>&1
  python3 - "$TMP/$name.png" "$OUT/$name.jpg" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
assert im.size == (1206, 2622), im.size
im.save(sys.argv[2], quality=86, optimize=True, progressive=True)
PY
  echo "rendered $OUT/$name.jpg"
done
