| Termo | Área A | Significado | Área B | Significado |
| :--- | :--- | :--- | :--- | :--- |
| **Morador** | Controle de Acessos | Possui credenciais de login (e-mail, senha), permissões atribuídas (RBAC) e dispositivos/tokens cadastrados para usar o app ou abrir catracas. | Financeiro | Responsável pelo pagamento da taxa condominial de uma unidade habitacional, associado a um histórico de cobranças, boletos e status de adimplência/inadimplência. |
| **Espaço Comum** | Reservas e equipamentos | Um bem delimitado por capacidade máxima de pessoas, horários de funcionamento, regras de antecedência e cobrança de taxa de uso. | Ocorrência e manutenção | Um elemento estrutural do condomínio sujeito a desgaste, vistorias técnicas, laudos e planos de manutenção preventiva/corretiva. |
| **Reserva** | Reservas e equipamentos | Bloqueio temporal na agenda de uma área comum para garantia de uso de um morador em determinado dia e horário. | Financeiro | Uma taxa de utilização pendente de cobrança ou liquidação via PIX/boleto que deve ser conciliada na prestação de contas. |



## CONTEXTOS LIMITADOS:

1. 
    - Nome provisório: ControlePortaria   
    - Objetivo: Gerir e auditar em tempo real a segurança do acesso físico na guarita e o ciclo de custódia das encomendas recebidas no condomínio.   
    - Vocabulário principal: Visitante, Prestador de Serviço, Encomenda, Guarita, QR Code, Biometria, Protocolo de Receção, Acesso Liberado.   
    - Agregados ou conceitos importantes: Agregado Encomenda, Agregado AcessoVisitante, Objeto de Valor CredencialAcesso.   
    - Regras principais: 
        . Uma encomenda só pode transitar para o estado Entregue se possuir registo prévio de receção com foto e notificação ao morador.   
        . Um acesso só pode emitir o comando de liberação física se a credencial estiver ativa, válida e dentro do horário permitido.   
    - Responsabilidades que pertencem: 
        . Protocolar a receção e a entrega de volumes e encomendas.   
        . Registar o fluxo de entrada e saída de visitantes, prestadores e veículos.   
        . Validar credenciais físicas, leitura de QR Codes e reconhecimentos faciais.   
    - Responsabilidades que não pertencem:
        . Validar adimplência financeira da unidade habitacional.   
        . Gerir a agenda do salão de festas ou determinar taxas de uso.   
        . Processar pagamentos de taxas ou aprovar orçamentos.   
    - Outros contextos com os quais precisa colaborar:
        . GestaoReservas (para receber a lista de convidados autorizados para eventos).   
        . IAM (para validar a identidade e o perfil do morador). 

2. 
    - Nome provisório: GestaoReservas   
    - Objetivo: Garantir a gestão da agenda, a disponibilidade de espaços comuns e a conformidade das solicitações de reserva sem permitir overbooking.   
    - Vocabulário principal: Reserva, Espaço Comum, Período de Agendamento, Taxa de Uso, Adimplência, Overbooking, Cancelamento.   
    - Agregados ou conceitos importantes: Agregado Reserva, EspacoComum, Objeto de Valor PeriodoReserva, Objeto de Valor TaxaUso.   
    - Regras principais:
        . É proibida a existência de duas reservas ativas para o mesmo espaço no mesmo intervalo de tempo (overbooking).   
        . Uma reserva só pode ser solicitada se a unidade habitacional associada estiver adimplente.   
        . O valor da taxa de uso é congelado de forma imutável no momento em que a reserva é solicitada.  
    - Responsabilidades que pertencem:
        . Controlar a agenda, horários de funcionamento e limites de ocupação das áreas comuns.   
        . Executar as transições do ciclo de vida da reserva (Pendente, Confirmada, Cancelada, Expirada).   
        . Aplicar regras de antecedência mínima e limites de reservas simultâneas por morador.   
    - Responsabilidades que não pertencem:
        . Processar diretamente as transações bancárias ou emissão de boletos/PIX.   
        . Validar a entrada dos convidados na portaria no dia do evento.  
        . Enviar notificações de e-mail ou push notifications.   
    - Outros contextos com os quais precisa colaborar:
        . FinanceiroContabil (para consultar a adimplência e emitir cobranças das taxas de uso).   
        . ControlePortaria (para notificar a lista de convidados após a confirmação da reserva).   

3.
    - Nome provisório: ManutencaoEOcorrencias   
    - Objetivo: Gerir o ciclo de vida dos chamados registados pelos moradores e a programação das manutenções preventivas e corretivas da infraestrutura predial.   
    - Vocabulário principal: Ocorrência, Ordem de Serviço (OS), Prestador Terceirizado, Orçamento, Laudo Técnico, Manutenção Preventiva.   
    - Agregados ou conceitos importantes: Agregado Ocorrencia, Agregado OrdemDeServico, PlanoManutencao.  
    - Regras principais:
        . Uma Ordem de Serviço só pode entrar em execução se possuir um orçamento expressamente aprovado pelo Síndico.   
        . A conclusão de um chamado técnico exige o anexo de um laudo ou parecer do responsável pela manutenção.  
    - Responsabilidades que pertencem:
        . Registar e gerir a evolução de chamados dos moradores (Aberto, Em Análise, Resolvido).   
        . Emitir, atribuir e acompanhar Ordens de Serviço a prestadores de serviço.   
        . Agendar vistorias e manutenções periódicas dos ativos do condomínio (ex.: elevadores, bombas de água).   
    - Responsabilidades que não pertencem:
        . Efectuar pagamentos ou transferências financeiras aos fornecedores.   
        . Controlar o acesso físico dos técnicos na portaria do condomínio.  
    - Outros contextos com os quais precisa colaborar:
        . FinanceiroContabil (para enviar orçamentos aprovados para provisionamento e pagamento).   
        . ControlePortaria (para pré-autorizar a entrada da equipa técnica no condomínio).

4.
    - Nome provisório: FinanceiroContabil   
    - Objetivo: Garantir a consistência transacional e contábil do condomínio, gerindo cobranças, liquidações, estado de adimplência e balancetes.   
    - Vocabulário principal: Boleto, Taxa Condominial, Titular Pagador, Adimplência, Inadimplência, Lançamento Contábil, Balancete, Conciliação.  
    - Agregados ou conceitos importantes: Agregado Boleto, Agregado LancamentoContabil, Agregado StatusAdimplencia.   
    - Regras principais:
        . O estado de adimplência de uma unidade é recalculado automaticamente após a conciliação bancária ou liquidação do boleto.   
        . Lançamentos contábeis confirmados são imutáveis e só podem ser alterados através de lançamentos de estorno.   
    - Responsabilidades que pertencem:
        . Gerar, emitir e conciliar boletos de taxa condominial e cobranças extras.   
        . Manter a matriz de adimplência/inadimplência atualizada por unidade habitacional.   
        . Gerar relatórios de prestação de contas, balancetes e comunicação com a API da administradora externa.   
    - Responsabilidades que não pertencem:
        . Decidir se um espaço comum está disponível numa determinada data.   
        . Avaliar a qualidade técnica da execução de uma Ordem de Serviço.   
    - Outros contextos com os quais precisa colaborar:
        . GestaoReservas (para fornecer o estado de adimplência do condómino e receber débitos relativos a taxas de uso).   
        . ManutencaoEOcorrencias (para processar pagamentos de Ordens de Serviço aprovadas).   




## Colaboração entre dois contextos limitados

- Fluxo 1: Validação de Adimplência para Agendamento de Espaço Comum
    . Contexto solicitante: GestaoReservas   
    . Contexto responsável: FinanceiroContabil   
    . Objetivo da interação: Consultar a situação financeira da unidade habitacional associada ao morador antes de permitir a criação ou confirmação de uma reserva de área comum (ex.: Salão de Festas, Churrasqueira). Essa consulta garante a proteção da invariante do negócio, impedindo que condôminos inadimplentes utilizem recursos do condomínio sem a regularização dos débitos pendentes.   
    
- Fluxo 2 (Complementar): Autorização de Acesso de Convidados para Eventos
    . Contexto solicitante: GestaoReservas   
    . Contexto responsável: ControlePortaria   
    . Objetivo da interação: Notificar e enviar a lista de convidados pré-autorizados após a confirmação do pagamento e agendamento da reserva. O objetivo é permitir que a guarita autorize a entrada dos visitantes no dia e horário do evento de forma automatizada (via QR Code ou lista de chamada na portaria), sem exigir intervenções manuais ou consultas síncronas ao módulo de reservas.

### Fluxo Selecionado: Consulta de Adimplência para Agendamento

* **Contexto solicitante:** `GestaoReservas`
* **Contexto responsável:** `FinanceiroContabil`
* **Objetivo da interação:** Verificar se a unidade habitacional associada à solicitação possui débitos condominiais ativos antes de prosseguir com a reserva do espaço comum.

---

### 1. Justificativa Temporal

**A resposta precisa acontecer imediatamente?**

> **SIM.** Esta interação exige **consistência síncrona / imediata**.

* **Por que precisa ser imediata?** 
  A validação de adimplência é uma condição impeditiva para a criação do agendamento. Se a verificação ocorresse de forma assíncrona (com atraso/consistência eventual), o sistema correria o risco de confirmar temporariamente a reserva para um morador inadimplente, bloqueando a agenda para outros condôminos adimplentes, para somente depois ter de cancelar o agendamento. Isso geraria atrito operacional, má experiência do utilizador e potencial violação de regras do regimento interno.

---

### 2. Contrato Mínimo de Significado

| Campo | Significado | Obrigatório? |
| :--- | :--- | :--- |
| `unidadeId` | Identificador único e persistente da unidade habitacional (ex.: Bloco A - Apto 302) responsável pela solicitação. | **Sim** |
| `dataConsulta` | Data e hora exatas em que a verificação de débitos está a ser processada pelo sistema. | **Sim** |
| `situacaoAdimplencia` | Resultado do parecer financeiro indicando se a unidade está regularizada (`ADIMPLENTE`) ou com pendências (`INADIMPLENTE`). | **Sim** |
| `codigoRestricao` | Código interno que categoriza o tipo do bloqueio financeiro (ex.: `TAXA_CONDOMINIAL_EM_ATRASO`), caso a situação seja de inadimplência. | **Não** (apenas quando `situacaoAdimplencia` for `INADIMPLENTE`) |

