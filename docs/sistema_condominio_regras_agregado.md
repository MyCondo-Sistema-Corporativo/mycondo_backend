# Vinicius Martins Nunes - MyCondo 

1. REGRA 

2. CONCEITO PROTEGIDO 

3. O QUE FICARIA INVÁLIDO? 

4. EVIDÊNCIA 

------------------------------------------------------------------------------------------------------------------------ 

1. Um morador só pode reservar a área comum se estiver em dia com suas obrigações (adimplente) perante o condomínio e se o espaço e horário estiverem vagos. 

2. Reserva 

3. 

   - . Morador em débito com reserva confirmada 

   - . Duas reservas ativas para o mesmo espaço no mesmo horário 

4. Exige validação de adimplência e indisponibilidade de agenda; no Diagrama de Sequência, o bloco de decisão barra requisições inválidas antes da confirmação. 

------------------------------------------------------------------------------------------------------------------------ 

1. Uma encomenda só pode transitar para o estado _Entregue_ se estiver no estado _Aguardando Retirada_ e vinculada a um morador da unidade. 

2. Encomenda 

3. 

- . Encomenda dada como entregue sem ter sido recebida e protocolada pela portaria ou guarita 

. Mudança de estado em encomendas já finalizadas ou entregues 

4. A portaria e as encomendas exigem o protocolo prévio de recepção com foto e alerta instantâneo antes da baixa. 

------------------------------------------------------------------------------------------------------------------------ 

1. Uma ordem de serviço só pode ser executada ou faturada se possuir orçamento aprovado pelo síndico. 

2. OrdemDeServico 

3. 

. Lançamento de custos financeiros de manutenção sem aprovação prévia 

   - . Ordem de serviço finalizada sem validação do administrador 

4. As ocorrências e manutenções prevêem a aprovação de orçamentos e supervisão pelo Síndico antes do envio para o Módulo Financeiro. 

------------------------------------------------------------------------------------------------------------------------ 

# ‘Invariantes do MyCondo: 

REGRA 1 - RESERVA DA ÁREA COMUM 

-> Que conceitos estão sendo protegidos? Reserva. 

# -> Qual seria o estado inválido? 

Ter uma reserva ativa para um morador com débitos, ou duas reservas para o mesmo horário. 

-> Essa regra precisa ser verdadeira imediatamente? 

Sim, pois no momento da criação da reserva, deve-se ter a certeza do horário vago e se o morador não possui débitos pendentes. 

-> É apenas uma validação da interface ou deve ser protegida pelo próprio domínio? Protegida pelo domínio. 

------------------------------------------------------------------------------------------------------------------------ 

-> Que conceitos estão sendo protegidos? Encomenda. 

-> Qual seria o estado inválido? 

Uma encomenda estar como entregue ao morador sem que exista um registro prévio de entrada no sistema ou autorização na guarita ou portaria. 

- -> Essa regra precisa ser verdadeira imediatamente? 

Sim, transições de estados fazem com que seja perdida a rastreabilidade da encomenda na forma física. 

-> É apenas uma validação da interface ou deve ser protegida pelo próprio domínio? Protegida pelo domínio. 

------------------------------------------------------------------------------------------------------------------------ 

-> Que conceitos estão sendo protegidos? OrdemDeServico. 

- -> Qual seria o estado inválido? 

Uma ordem de serviço mudar o estado para Em execução ou gerar um lançamento de custo sem que seja previamente autorizado pelo síndico ou administrador. 

- -> Essa regra precisa ser verdadeira imediatamente? 

Sim, pois evita lançamentos indevidos no Módulo Financeiro ou rombos orçamentários. 

- -> É apenas uma validação da interface ou deve ser protegida pelo próprio domínio? Protegida pelo domínio. 

# **Qual é o pior estado inválido que seu sistema poderia permitir hoje?** 

Liberação de Acesso Físico por Autorização Inválida/Revogada. Uma catraca ou portão fazer a liberação do acesso (status LIBERADO) de alguém que está sem vínculo ativo com o condomínio. Seja feita por reconhecimento facial, QRCODE ou outras formas de acesso. Outra forma desse ser o pior estado é o sistema, erroneamente, liberar acesso a alguém que não mora no condomínio ou outros tipos de pessoas estranhas ao condomínio, o que gera uma segurança menor em relação a proteção dos moradores. 

MODELO: 

Modelo de Reservas e Equipamentos 

AGREGADO CANDIDATO: Reserva da área comum 

AGGREGATE ROOT PROVÁVEL: Reserva 

OBJETOS INTERNOS: 

periodoReserva: Data e hora de início e data e hora de término. taxaUso: valor monetário da utilização, caso haja. statusReserva: controla o estado atual da reserva. 

moradorId: identificador que garante a fronteira do agregado e desacoplamento de outras entidades 

espacoId: identificador que garante a fronteira do agregado e desacoplamento de outras entidades 

INVARIANTES PROTEGIDAS: 

. Uma reserva não pode ser solicitada ou confirmada se o morador associado possuir débitos condominiais ativos. 

. Não podem existir duas reservas ativas no mesmo período de tempo em que outra reserva já está. 

. Reservas com estados CANCELADA ou EXPIRADA não podem ser reativadas ou alteradas para CONFIRMADA sem que um novo processo seja criado. 

OPERAÇÕES IMPORTANTES: 

. solicitarReserva(moradorId, espacoId, periodoReserva): Faz a validação da adimplência do morador e a ausência de conflitos na agenda antes de ser criada a instância da reserva no status PENDENTE. 

. confirmarPagamento(comprovante): Faz a transição do estado PENDENTE para CONFIRMADA perante o pagamento do uso da área ou equipamento. 

. cancelarReserva(motivo, antecedenciaMinima): Caso hajam regras para que seja feito o cancelamento da reserva, como um motivo e uma antecedência mínima para tal, faz o cancelamento da reserva e muda o estado para CANCELADA. 

. expirarPorTimeout(): Faz a transição do estado da reserva para EXPIRADA caso não seja paga no tempo limite. 

# EVENTOS DE DOMÍNIO 

1. EVENTO 

2. O QUE ACONTECEU? 

3. QUEM PODERIA SE INTERESSAR? 

------------------------------------------------------------------------------------------------------------------------ 

   1. ReservaConfirmada 

   2. A adimplência passou e o espaço foi bloqueado para uso na agenda do condomínio. 3. LancamentoFinanceiro e AutorizacaoAcessoAreaOuEquipamento. 

- ------------------------------------------------------------------------------------------------------------------------ 

   1. EncomendaRecebida 

   2. A portaria recebeu a encomenda de acordo com o protocolo e fez o vínculo a uma unidade específica. 

   3. NotificacaoMorador e EncomendasPendentes. 

- -----------------------------------------------------------------------------------------------------------------------1. OrdemDeServicoAprovada 

   2. O síndico fez a análise do orçamento de uma manutenção e autorizou o serviço. 

   3. ContasAPagar, AutorizacaoAcessoPortaria, PrestadorServico. 

- ------------------------------------------------------------------------------------------------------------------------ 

Esse acontecimento exigiria que todos os interessados estivessem dentro do mesmo Agregado? Não, pois como discutido na teoria dos eventos de domínio, não precisamos de colocar todos os interessados na mesma fronteira de consistência. 

