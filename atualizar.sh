#!/usr/bin/env bash
set -e
echo "Instalando FuriniMath v2..."
git add .
git commit -m "Atualiza FuriniMath v2 - atlas real e compositor por peças" || true
git push
echo ""
echo "Pronto."
echo "Acompanhe: https://github.com/allanfurini/furinimath/actions"
echo "Site: https://allanfurini.github.io/furinimath/"
