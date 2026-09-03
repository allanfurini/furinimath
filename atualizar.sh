#!/usr/bin/env bash
set -e
echo "Atualizando FuriniMath v3..."
git add .
git commit -m "Atualiza FuriniMath v3 - mão virtual didática" || true
git push
echo ""
echo "Acompanhe: https://github.com/allanfurini/furinimath/actions"
echo "Site: https://allanfurini.github.io/furinimath/"
