#!/usr/bin/env bash
set -e
echo "=== FuriniMath v3.1 ==="
echo "Confirmando versão local..."
grep -q "VERSÃO 3.1" index.html
echo "OK: index.html é v3.1"

git add -A
git commit -m "FuriniMath v3.1 - mão virtual e limpeza de cache" || true
git push

echo ""
echo "Disparando workflow..."
gh workflow run "Publicar FuriniMath" 2>/dev/null || true

echo ""
echo "Versão publicada no repositório:"
git log -1 --oneline
echo ""
echo "Abra com cache-busting:"
echo "https://allanfurini.github.io/furinimath/?v=31"
