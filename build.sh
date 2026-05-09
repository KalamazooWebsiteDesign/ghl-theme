#!/usr/bin/env bash
# Concatenate src/sections/*.css into dist/main.css
# Usage: bash build.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT/src/sections"
OUT="$ROOT/dist/main.css"

mkdir -p "$ROOT/dist"

{
  echo "/*! KWD GHL Theme — built $(date -u +%Y-%m-%dT%H:%M:%SZ) */"
  for f in "$SRC"/*.css; do
    echo ""
    cat "$f"
  done
} > "$OUT"

LINES=$(wc -l < "$OUT")
BYTES=$(wc -c < "$OUT")
echo "built dist/main.css — ${LINES} lines, ${BYTES} bytes"
