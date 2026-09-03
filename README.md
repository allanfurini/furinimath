# FuriniMath v2

Versão corrigida a partir das fotografias reais do Método Furini.

## O que mudou
- Removida a mão SVG genérica que distorcia a lógica.
- As duas mãos são tratadas como sobrepostas.
- Atlas fotográfico real de:
  - unidades 0–4;
  - dezenas 10–40;
  - centenas 100–400;
  - quinários +5, +50, +500;
  - exemplos confirmados 558, 875, 825, 695 e 375.
- O compositor trabalha com peças/estados independentes, evitando criar 999 modelos.
- Frente, verso e Raio-X são modos didáticos.
- Operações são descritas como a mesma lógica do soroban.

## Atualização no GitHub
Coloque `furinimath-v2.zip` na raiz do repositório e execute:

```bash
unzip -o furinimath-v2.zip && bash atualizar.sh
```

O GitHub Actions já configurado no projeto deverá publicar a versão após o push.
