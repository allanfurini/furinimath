#!/usr/bin/env bash
set -e
echo "=== FuriniMath v3.2 ==="
grep -q "VERSÃO 3.2" index.html
node --check app.js
echo "OK: JavaScript validado e mão virtual pronta."

git add -A
git commit -m "FuriniMath v3.2 - corrige renderizacao da mao virtual" || true
git push

echo ""
echo "Abra depois do deploy:"
echo "https://allanfurini.github.io/furinimath/?v=32"
