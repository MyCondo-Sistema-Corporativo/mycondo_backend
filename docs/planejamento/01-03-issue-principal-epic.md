# Artefato 3 — Issue Principal (Epic)

> **Instrução:** O conteúdo deste arquivo está formatado em Markdown pronto para ser copiado e colado diretamente no formulário de criação de Issue do GitHub.

---

```markdown
# [UC01] Solicitar Reserva de Área Comum

## 1. Objetivo Geral do Épico
Implementar o fluxo completo do caso de uso **UC01 — Solicitar reserva de área comum**, correspondente ao primeiro slice arquitetural da plataforma **MyCondo**. O objetivo é permitir que condôminos autenticados e vinculados a uma unidade condominial registrem formalmente sua intenção de reserva para áreas compartilhadas do condomínio (salão de festas, churrasqueira, etc.) em períodos válidos, garantindo a proteção contra sobreposição de agenda, o cumprimento das políticas de adimplência, o congelamento da taxa de uso e a persistência atômica do compromisso.

---

## 2. Contexto e Escopo no Projeto MyCondo
O **MyCondo** é um sistema corporativo para gestão integrada de condomínios. A funcionalidade de reservas é um dos eixos centrais da convivência condominial e da gestão operacional:
- **No Escopo deste Épico:**
  - Recepção de requisições HTTP REST contendo os parâmetros de reserva (`condominioId`, `areaId`, `inicio`, `fim`);
  - Verificação de vínculo ativo do solicitante com a unidade autônoma;
  - Consulta do parecer de adimplência financeira da unidade perante a política do condomínio;
  - Consulta da política e regras de uso vigentes da área solicitada;
  - Validação estrita do período (consistência início < término, antecedência mínima);
  - Garantia de não sobreposição com reservas ativas preexistentes;
  - Criação da entidade `Reserva` em estado `PENDENTE` ou `AGUARDANDO_PAGAMENTO`;
  - Congelamento da taxa de uso aplicável;
  - Solicitação de cobrança financeira para áreas tarifadas;
  - Persistência atômica da reserva;
  - Tradução e resposta semântica ao cliente HTTP com status 201 Created ou erros correspondentes.
- **Fora do Escopo deste Épico:**
  - Confirmação automática via webhook bancário (pertencente ao UC02);
  - Cancelamento e restituição de reservas (pertencente ao UC03);
  - Geração de QR Code e liberação de portaria (pertencente ao UC06);
  - Integração com push notifications e WhatsApp (Módulo de Comunicação).

---

## 3. Referência Formal aos Documentos de Engenharia
- **Blueprint de Implementação do Primeiro Slice:** `docs/trabalho_6_sistema_condominio.md` (Seções 6, 10, 11, 12, 13, 14, 15, 16, 20, 22)
- **Base Técnica NestJS e Arquitetura:** `docs/trabalho_8_sistema_condominio.md`
- **Regras de Negócio e Invariantes do Agregado:** `docs/sistema_condominio_regras_agregado.md`
- **Organização Arquitetural e Fronteiras:** `docs/trabalho_5_sistema_condominio.md`

---

## 4. Requisitos Funcionais Contemplados
- **RF-01 (Recepção e Validação da Solicitação):** O sistema deve expor um ponto de entrada HTTP (`POST /condominios/{condominioId}/reservas`) capaz de receber e validar sintaticamente a intenção de reserva.
- **RF-02 (Validação de Vínculo do Solicitante):** O sistema deve certificar-se de que o ator possui vínculo ativo com uma unidade pertencente ao condomínio indicado.
- **RF-03 (Verificação de Adimplência):** O sistema deve consultar o parecer de situação financeira da unidade e impedir a reserva caso a política da área exija adimplência e a unidade esteja irregular.
- **RF-04 (Proteção de Conflito de Horário):** O sistema deve validar que a área comum está livre no período requisitado, recusando solicitações que sobreponham reservas ativas.
- **RF-05 (Congelamento de Parâmetros Tarifários):** O sistema deve capturar a taxa de uso vigente e registrá-la de forma imutável na reserva no instante de sua solicitação.
- **RF-06 (Integração com Cobrança):** Quando a reserva exigir pagamento de taxa, o sistema deve acionar o contexto Financeiro para criar a obrigação de cobrança correspondente.
- **RF-07 (Persistência Durável):** O sistema deve persistir a reserva de forma transacional e atômica, garantindo sua integridade futura.

---

## 5. Relação de Sub-Issues Planejadas
As seguintes unidades de trabalho compõem a execução técnica deste épico:

- [ ] **[SUB-01]** Modelagem do Domínio e Invariantes da Reserva
- [ ] **[SUB-02]** Especificação de Contratos e Portas da Aplicação
- [ ] **[SUB-03]** Implementação do Serviço de Aplicação (Handler)
- [ ] **[SUB-04]** Implementação da Fronteira HTTP REST (Controller e DTOs)
- [ ] **[SUB-05]** Implementação da Persistência e Adaptadores de Infraestrutura
- [ ] **[SUB-06]** Implementação da Suíte de Testes Automatizados (Vitest)

---

## 6. Critérios Gerais de Aceite do Caso de Uso
- [ ] **CA-01 (Caminho Feliz - Área Gratuita):** Uma solicitação com dados válidos para área sem cobrança deve resultar em reserva com status `PENDENTE` (ou confirmável pela política) persistida e resposta HTTP 201 Created.
- [ ] **CA-02 (Caminho Feliz - Área Tarifada):** Uma solicitação para área tarifada deve congelar a taxa, acionar a criação da cobrança e resultar em reserva com status `AGUARDANDO_PAGAMENTO` persistida e resposta HTTP 201 Created.
- [ ] **CA-03 (Bloqueio por Sobreposição):** Tentativas de reserva para intervalos que apresentem interseção com reservas ativas devem ser rejeitadas com erro de conflito de agenda (HTTP 409 Conflict).
- [ ] **CA-04 (Bloqueio por Inadimplência):** Tentativas de reserva realizadas por unidades inadimplentes para áreas com exigência de regularidade devem ser barradas com recusa negocial (HTTP 422 Unprocessable Entity).
- [ ] **CA-05 (Rejeição por Intervalo Inválido):** Requisições com data de início posterior ou igual ao término, ou sem a antecedência mínima requerida, devem ser rejeitadas com erro de validação (HTTP 422 Unprocessable Entity).
- [ ] **CA-06 (Rejeição por Vínculo Inválido):** Requisições de atores sem vínculo comprovado com a unidade devem retornar recusa de acesso (HTTP 403 Forbidden).
- [ ] **CA-07 (Resiliência e Integridade):** Falhas nas portas externas (cobrança indisponível, falha de repositório) não devem gerar reservas corrompidas ou órfãs no banco de dados.

---

## 7. Dependências Externas e Bloqueios
- **Base Técnica NestJS 12:** Necessidade de ambiente com NestJS 12, TypeScript e gerenciador pnpm devidamente configurado (já concluído no Trabalho 8).
- **Sem Bloqueios Externos Ativos:** Como o primeiro slice adota portas e adaptadores desacoplados, a implementação independe da entrega física de sistemas de terceiros (gateways PIX ou banco PostgreSQL real), sendo viabilizada por adaptadores e stubs de teste.

---

## 8. Critérios de Prontidão e Conclusão (DoR / DoD)

### Definition of Ready (DoR - Pronto para Início):
- [x] Especificação funcional do caso de uso detalhada e aprovada no Trabalho 6;
- [x] Regras de negócio, invariantes e fluxos de exceção formalizados;
- [x] Decomposição técnica em 6 sub-issues delimitadas e sem sobreposição;
- [x] Critérios de aceite objetivos e testáveis definidos para cada sub-issue;
- [x] Stack tecnológica e base do repositório validadas (NestJS 12 + Vitest).

### Definition of Done (DoD - Pronto para Fechamento do Épico):
- [ ] Todas as 6 sub-issues implementadas, revisadas e fechadas;
- [ ] 100% dos testes automatizados unitários e de integração executando com sucesso no Vitest (`pnpm test`);
- [ ] Cobertura de testes comprovando validações de domínio, orquestração e contratos HTTP;
- [ ] Nenhum acoplamento indevido de infraestrutura (NestJS/ORM) vazando para a camada de domínio;
- [ ] Documentação técnica de arquitetura e rastreabilidade atualizada no repositório.
```

