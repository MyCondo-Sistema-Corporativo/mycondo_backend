# Artefato 1 — Análise Técnica do Caso de Uso

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Documentos de Referência:** `docs/trabalho_6_sistema_condominio.md`, `docs/trabalho_8_sistema_condominio.md`, `docs/sistema_condominio_regras_agregado.md`  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Identificação e Título do Caso de Uso
- **Código:** UC01
- **Título:** Solicitar reserva de área comum
- **Classificação:** Caso de Uso Central (Recorte do Primeiro Slice Arquitetural)

---

## 2. Objetivo e Escopo Funcional
- **Objetivo:** Permitir que um morador devidamente autenticado e vinculado a uma unidade residencial/comercial registre no sistema a intenção formal de utilizar uma área comum (ex.: salão de festas, churrasqueira, espaço gourmet) em um período determinado, garantindo que não ocorram sobreposições de horários com outras reservas ativas e assegurando o cumprimento das políticas de elegibilidade e adimplência vigentes.
- **Escopo do Slice (Entra):**
  - Recepção da solicitação de reserva via interface de aplicação (HTTP REST);
  - Validação de identificação do ator e vínculo ativo com a unidade condominial (`IdentidadePort`);
  - Consulta do parecer de situação financeira/adimplência da unidade (`SituacaoFinanceiraPort`);
  - Obtenção da política e regras de uso vigentes da área solicitada (`RegraDeUsoPort`);
  - Validação do período (data de início anterior ao término, antecedência mínima, vigência de horário);
  - Verificação de conflito de disponibilidade com reservas ativas preexistentes (`ReservaAgendaPort`);
  - Instanciação e controle de invariantes da entidade de domínio `Reserva`;
  - Congelamento da taxa de uso aplicável na reserva no momento da solicitação;
  - Solicitação de criação de cobrança ao Módulo Financeiro (`CobrancaPort`) em caso de reserva tarifada;
  - Persistência atômica da reserva em estado `PENDENTE` ou `AGUARDANDO_PAGAMENTO` (`ReservaRepository`);
  - Tradução e retorno do resultado estruturado com semântica de negócio clara.
- **Fora do Escopo do Slice (Não entra):**
  - Confirmação após pagamento via webhook (pertencente ao UC02 — Confirmar reserva);
  - Cancelamento, expiração ou restituição (UC03 — Cancelar reserva);
  - Emissão de QR Code de portaria e gestão de lista de convidados (UC06);
  - Notificações em tempo real via WhatsApp ou push (Módulo de Comunicação);
  - Interface visual (Web React ou Mobile Flutter).

---

## 3. Atores Envolvidos e Papéis
- **Morador / Condômino (Ator Principal):** Inicia a intenção de reserva informando a área comum e o período pretendido. É o beneficiário direto do resultado observável.
- **Identidade e Vínculos (Colaborador / Porta Secundária):** Fornece confirmação de que o ator autenticado possui vínculo ativo de moradia com uma unidade autônoma do condomínio.
- **Gestão Financeira (Colaborador / Porta Secundária):** Emite parecer consultivo objetivo sobre a adimplência da unidade do solicitante em relação às taxas condominiais.
- **Regras e Agenda (Colaborador / Porta Secundária):** Fornece as políticas vigentes da área e as reservas ativas cadastradas para análise de sobreposição.
- **Cobrança / Financeiro (Colaborador / Porta Secundária):** Recebe a solicitação de geração da obrigação financeira quando a reserva for sujeita a tarifação.

---

## 4. Pré-condições e Pós-condições
- **Pré-condições:**
  1. O morador solicitante deve estar autenticado no sistema corporativo;
  2. O morador deve possuir vínculo ativo e regular com uma unidade pertencente ao condomínio indicado;
  3. A área comum deve existir no cadastro do condomínio e possuir política de uso vigente configurada;
  4. O sistema deve ter acesso às portas de consulta financeira e agenda.
- **Pós-condições de Sucesso:**
  1. Uma nova instância da entidade `Reserva` é criada com identificador único global (UUID);
  2. A reserva é associada à área comum, unidade, solicitante e ao período especificado;
  3. O valor da taxa de uso é congelado no registro da reserva (imunizando-o contra alterações tarifárias posteriores);
  4. A reserva assume estado coerente: `PENDENTE` (caso isenta ou aguardando deliberação) ou `AGUARDANDO_PAGAMENTO` (caso tarifada);
  5. Se tarifada, uma solicitação de cobrança correspondente é encaminhada ao contexto Financeiro;
  6. O registro é persistido de forma durável e atômica no repositório;
  7. É retornado ao solicitante o resultado com status HTTP 201 Created e representação da reserva criada.

---

## 5. Síntese dos Fluxos de Execução

### Fluxo Principal (Caminho Feliz):
1. O Morador envia requisição informando `condominioId`, `areaId`, data/hora de `inicio` e data/hora de `fim`.
2. A fronteira (Controller) valida os formatos de entrada e despacha o command `SolicitarReserva` para o serviço de aplicação (`SolicitarReservaHandler`).
3. O Handler consulta a `IdentidadePort` confirmando o vínculo do morador com a unidade.
4. O Handler consulta a `SituacaoFinanceiraPort` obtendo parecer de adimplência da unidade.
5. O Handler consulta a `RegraDeUsoPort` recuperando a política e parâmetros da área comum.
6. O Handler obtém as reservas ativas da área via `ReservaAgendaPort` e aciona o domínio para validar conflito de sobreposição.
7. O domínio valida o objeto de valor `Periodo` (antecedência, consistência temporal) e confirma disponibilidade de agenda.
8. A entidade `Reserva` é criada por seu método de domínio no estado apropriado.
9. Caso a regra defina taxa de uso > 0, o Handler invoca a `CobrancaPort` para registrar a obrigação financeira vinculada.
10. O Handler persiste a reserva via `ReservaRepository`.
11. A fronteira traduz o resultado em DTO `ReservaResponse` e retorna código HTTP 201 Created.

### Fluxos Alternativos e de Exceção:
- **FA01 — Vínculo Inexistente ou Inativo:** `IdentidadePort` não reconhece o morador na unidade; o caso encerra retornando recusa de autorização (HTTP 403 Forbidden).
- **FA02 — Inadimplência Impeditiva:** `SituacaoFinanceiraPort` retorna parecer inadimplente e a política exige adimplência; encerra com recusa negocial (HTTP 422 Unprocessable Entity).
- **FA03 — Área Não Encontrada ou Sem Política:** `RegraDeUsoPort` não localiza a área; encerra com recurso não encontrado (HTTP 404 Not Found).
- **FA04 — Período Inválido / Fora do Horário:** `Periodo` inconsistente (término menor ou igual ao início, antecedência violada); domínio recusa gerando erro de validação (HTTP 422 Unprocessable Entity).
- **FA05 — Conflito de Agenda (Sobreposição):** A verificação de agenda identifica reserva ativa no mesmo intervalo ou com interseção; encerra acusando conflito (HTTP 409 Conflict).
- **FA06 — Falha na Criação da Cobrança:** A reserva é tarifada, mas a `CobrancaPort` falha ou fica indisponível; encerra com falha de integração (HTTP 503 Service Unavailable), sem salvar reserva órfã.
- **FA07 — Falha na Persistência:** Falha ao gravar no repositório; encerra com erro de infraestrutura (HTTP 503/500).

---

## 6. Regras de Negócio Identificadas
- **RN-01 (Não Sobreposição de Agenda):** Não podem existir duas reservas ativas para a mesma área comum que possuam sobreposição temporal parcial ou total.
- **RN-02 (Validação de Adimplência):** Uma reserva só pode ser solicitada/processada se a unidade do morador estiver adimplente, caso a política da área comum exija adimplência.
- **RN-03 (Consistência Temporal do Período):** O instante de início da reserva deve ser estritamente anterior ao instante de término, respeitando o limite mínimo de antecedência e duração máxima previstos na regra de uso.
- **RN-04 (Congelamento da Taxa de Uso):** O valor da taxa de uso aplicável deve ser gravado na instância da reserva no momento da solicitação, não sofrendo reajustes posteriores caso a tabela de preços do condomínio seja alterada.
- **RN-05 (Ciclo de Estados e Invariantes):** Uma reserva recém-criada inicia em `PENDENTE` (isenta de cobrança) ou `AGUARDANDO_PAGAMENTO` (com taxa). Transições para `CONFIRMADA`, `CANCELADA`, `RECUSADA` ou `EXPIRADA` devem obedecer a regras estritas de domínio.
- **RN-06 (Desacoplamento de Cobrança e Notificação):** A solicitação de reserva não processa pagamentos e não depende da entrega de notificações para ter validade jurídica e consistência no domínio.

---

## 7. Validações de Entrada e Processamento
- **Entrada (DTO HTTP):**
  - `condominioId`: UUID válido e obrigatório;
  - `areaId`: UUID válido e obrigatório;
  - `inicio`: ISO 8601 UTC válido, estritamente no futuro;
  - `fim`: ISO 8601 UTC válido, estritamente superior a `inicio`.
- **Processamento (Domínio e Aplicação):**
  - Existência de sobreposição de intervalos: $\max(inicio_1, inicio_2) < \min(fim_1, fim_2)$;
  - Validação de regras de antecedência (ex.: mínimo 24h antes do início);
  - Verificação de unicidade e consistência transacional.

---

## 8. Componentes e Camadas Arquiteturais Envolvidas
1. **Camada de Apresentação / Fronteira (NestJS Web API):**
   - `ReservasController`: expõe rota `POST /condominios/:condominioId/reservas`;
   - DTOs de entrada/saída (`SolicitarReservaRequest`, `ReservaResponse`);
   - Exception Filters para mapeamento de exceções de domínio/aplicação para códigos HTTP.
2. **Camada de Aplicação:**
   - Command `SolicitarReservaCommand`;
   - Application Service `SolicitarReservaHandler`;
   - Portas secundárias/interfaces: `IdentidadePort`, `SituacaoFinanceiraPort`, `RegraDeUsoPort`, `ReservaAgendaPort`, `ReservaRepository`, `CobrancaPort`, `Clock`.
3. **Camada de Domínio:**
   - Entidade raiz `Reserva`;
   - Objeto de Valor `Periodo`;
   - Enums de domínio (`ReservaStatus`);
   - Serviço de domínio `VerificadorConflitoAgenda`;
   - Exceções de negócio (`ConflitoAgendaException`, `PeriodoInvalidoException`, `UnidadeInadimplenteException`).
4. **Camada de Infraestrutura:**
   - Adaptador `ReservaRepositoryInMemory` (para slice inicial e testes);
   - Adaptadores de simulação/mocks para as portas externas (`IdentidadeAdapter`, `SituacaoFinanceiraAdapter`, `CobrancaAdapter`);
   - Módulo NestJS (`ReservasModule`).

---

## 9. Considerações Arquiteturais Preliminares
- **Padrão Arquitetural:** Monólito Modular com separação em quatro camadas concêntricas (Apresentação, Aplicação, Domínio e Infraestrutura).
- **Isolamento do Domínio:** O domínio não contém anotações do framework NestJS, nem decoradores de ORM ou bibliotecas externas.
- **Linguagem e Runtime:** Node.js v24+, TypeScript 5+, NestJS 12, módulo no padrão ECMAScript (`"type": "module"`).
- **Gerenciador de Pacotes e Testes:** pnpm v12 e Vitest.

---

## 10. Restrições e Dúvidas Levantadas
- **Fatos Confirmados na Documentação:**
  - O primeiro slice cobre rigorosamente a solicitação da reserva (UC01), não a confirmação por pagamento (UC02);
  - A taxa de uso deve ser congelada no momento da criação;
  - Conflito de horários e inadimplência são os principais bloqueios de negócio.
- **Hipóteses Técnicas a Confirmar com a Equipe:**
  - *Hipótese 1:* O UUID do condomínio trafega como parâmetro de rota (`/condominios/:condominioId/reservas`) e a identidade do morador é extraída do token JWT/contexto autenticado simulado no request.
  - *Hipótese 2:* No slice inicial, a verificação de concorrência simultânea será tratada inicialmente em nível de repositório atômico ou bloqueio em memória, antes da adoção de locks transacionais no PostgreSQL.

