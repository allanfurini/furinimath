#!/usr/bin/env bash
set -e
echo "Atualizando FuriniMath..."
git add .
git commit -m "Atualiza FuriniMath v1.0" || true
git push
echo "Pronto."
