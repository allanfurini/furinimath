#!/usr/bin/env bash
set -e
echo "=== FuriniMath v3.3 ==="
grep -q "VERSÃO 3.3" index.html
echo "OK: build autônomo detectado."
git add -A
git commit -m "FuriniMath v3.3 - mao virtual embutida e independente de cache" || true
git push
echo ""
echo "Depois do deploy, abra:"
echo "https://allanfurini.github.io/furinimath/?v=33"
