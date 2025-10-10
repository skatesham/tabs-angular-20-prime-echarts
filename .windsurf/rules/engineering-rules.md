# Engineering Rules (Project-Wide)

## Goals
- Consistência de estilo, previsibilidade de arquitetura e releases sem fricção.
- Regras curtas, acionáveis e fáceis de revisar.

## Coding Style
1. Siga o formatter/linter do projeto (fail the build em caso de violação).
2. Nomes claros e curtos; funções ≤ 40 linhas; complexidade ciclomática ≤ 10.
3. Comentários apenas para contexto/decisão (não descreva o óbvio).

## Architecture
1. Estrutura por feature (DDD/feature-first). Proibido acoplamento circular.
2. Camadas: controller → service → repo. IO isolado em adapters.
3. APIs versionadas (SemVer), OpenAPI como fonte da verdade.

## Git & PR
1. Conventional Commits: `feat(scope): …`, `fix(scope): …`, `perf(scope): …`.
2. PR pequeno (≤ ~300 LoC), com testes e checklist de impacto.
3. Não faça squash de commits que quebram a história de migrações.

## Testing
1. Pirâmide: unit (rápidos) > integration (I/O) > e2e (fluxos críticos).
2. Cobertura alvo por módulo crítico ≥ 80%; testes devem ser determinísticos.
3. Fixtures isoladas; mocks apenas em fronteiras externas.

## Security
1. Sem segredos no repo. Use vault/env. Dependências auditadas regularmente.
2. Input validation estrita; RBAC; logs de auditoria para ações sensíveis.

## Performance & Observability
1. Orçamentos: p95 latência por endpoint e LCP no front definidos no README.
2. Logs estruturados + trace id; métricas (RED/USE); alerts com SLOs.

## Release
1. CI: lint → test → build → scan → deploy. Quality gates obrigatórios.
2. Feature flags para mudanças arriscadas; rollback playbook versionado.

## Decision Records
1. Toda decisão relevante vira ADR curto (template abaixo).
2. Revise ADRs a cada trimestre ou diante de “gatilhos” (incidentes, SLAs).

---

### ADR Template
**Título:** ADR-00X — <decisão>  
**Data:** YYYY-MM-DD  
**Contexto:** problema, restrições, métricas afetadas  
**Decisão:** (1–2 frases objetivas)  
**Alternativas:** A / B / C (por quê não)  
**Consequências:** (+) benefícios, (–) custos  
**Revisão:** data ou gatilhos para reavaliar

