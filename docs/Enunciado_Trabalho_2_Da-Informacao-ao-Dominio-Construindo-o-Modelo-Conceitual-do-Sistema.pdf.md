# Trabalho — Da Informação ao Domínio: Construindo o Modelo Conceitual do Sistema 

Este trabalho tem como objetivo levar a equipe a **evoluir a análise realizada no Ciclo 1 para uma primeira Modelagem de Domínio do sistema que pretende desenvolver** . 

No trabalho anterior, a equipe buscou compreender: 

o problema; 

o contexto; 

fatos, hipóteses, questões e decisões; 

o fluxo principal; 

variações e falhas; 

operações necessárias; 

informações que o sistema precisa conhecer ou preservar. 

Agora, essas informações serão utilizadas como ponto de partida para responder a uma nova pergunta: 

### **Quais conceitos representam corretamente o domínio do nosso sistema?** 

A proposta não é começar novamente a análise. 

A proposta é **evoluir aquilo que já foi descoberto** . 

Ao final desta atividade, espera-se que a equipe tenha construído uma primeira representação conceitual capaz de explicar: 

quais conceitos são relevantes; 

quais parecem possuir identidade; 

quais podem ser definidos principalmente por seus valores; 

como esses conceitos se relacionam; 

quais cardinalidades podem ser justificadas; 

quais regras governam o domínio; 

quais incertezas ainda permanecem. 

O objetivo ainda **não é implementar** . 

# O trabalho anterior como ponto de partida 

Este trabalho deve utilizar como entrada a documentação produzida no Ciclo 1. 

Antes de iniciar, retomem especialmente: 

- fluxo principal; 

- as operações identificadas; 

- as informações necessárias ao sistema; 

- fatos confirmados; 

- hipóteses ainda abertas; 

- questões não respondidas; 

- decisões já tomadas. 

Não descartem o que foi produzido anteriormente. 

O modelo construído agora deverá ser uma **evolução daquele conhecimento** . 

Se durante a modelagem vocês perceberem que alguma conclusão anterior precisa ser revista, registrem essa descoberta. 

**Modelos evoluem quando o conhecimento evolui.** 

# Princípio central do trabalho 

Durante toda a atividade, a equipe deverá manter a mesma postura investigativa do Ciclo 1. 

Sempre que surgir uma classificação ou relação, pergunte: 

**HIPÓTESE** 

#### **FATO** 

Temos evidência Parece razoável, mas suficiente? ainda precisa ser validado? 

**QUESTÃO EM ABERTO** 

Ainda não sabemos o suficiente para concluir? 

#### **DECISÃO** 

Estamos escolhendo uma forma de representar o domínio? Qual é a justificativa? 

Uma classificação de modelagem também pode estar errada ou ser prematura. 

Por isso: 

**Não transforme uma hipótese de modelagem em estrutura definitiva sem perceber.** 

# ETAPA 1 — Retomada da análise anterior 

Apresente brevemente o sistema e recupere os principais resultados do trabalho do Ciclo 1. 

Inclua: 

- nome do sistema; 

- problema central; 

- público ou atores principais; 

- fluxo principal escolhido; 

- principais operações; 

- principais informações identificadas. 

Não reproduza integralmente o trabalho anterior. 

Produza uma síntese que permita compreender **de onde a modelagem está partindo** . 

# Resultado esperado 

Demonstrar que o modelo conceitual será derivado do funcionamento já analisado, e não inventado independentemente dele. 

# ETAPA 2 — Candidatos a conceitos do domínio 

Retome: 

- fluxo principal; 

- as operações; 

- as informações necessárias. 

A partir deles, identifique os principais **candidatos a conceitos do domínio** . 

Como orientação, espera-se inicialmente algo entre **8 e 15 candidatos** , dependendo da complexidade do sistema. 

Exemplos genéricos: 



<!-- Start of picture text -->
Cliente Pedido Produto Reserva<br>Pagamento Endereço Matrícula Agendamento<br>Valor Monetário Situação Período<br><!-- End of picture text -->

Para cada candidato, registre: 

|**Conceito candidato**|**De onde surgiu?**|**Por que parece**|**Grau de**|
|---|---|---|---|
|||**relevante?**|**certeza**|
|...|Fluxo / operação /|...|Certeza /|
||informação||hipótese /<br>dúvida|



# Atenção 

Encontrar um substantivo não significa automaticamente encontrar uma Entidade. 

Neste momento, estamos identificando **candidatos** . 

# ETAPA 3 — Investigação de identidade 

Agora investigue quais candidatos parecem possuir **identidade relevante para o domínio** . 

Para cada candidato importante, pergunte: 

- duas ocorrências podem possuir os mesmos dados e ainda assim representar coisas diferentes? seus atributos podem mudar sem que ele deixe de ser o mesmo elemento? 

- existe um ciclo de vida que precisa ser acompanhado? 

- negócio precisa distinguir uma ocorrência específica das demais? 

- precisamos consultar ou referenciar aquele mesmo elemento posteriormente? 

Utilize uma estrutura semelhante: 

|**Conceito**|**Identidade parece**|**Evidência / justificativa**|**Classifica**|
|---|---|---|---|
||**relevante?**||**ção atual**|
|...|Sim / Não / Não sabemos|...|...|



## Resultado esperado 

Perceber que identidade é uma característica do domínio e não simplesmente a existência futura de um campo id. 

# ETAPA 4 — Entidades e Objetos de Valor 

Com base na investigação anterior, classifique provisoriamente os conceitos. 

Utilize pelo menos estas categorias: 

#### **Provável Entidade** 

A identidade possui significado e precisa ser preservada ao longo do tempo. 

#### **Provável Objeto de Valor** 

O significado está principalmente nos valores que compõem o conceito. 

#### **Outro tipo de conceito** 

Pode representar estado, condição, ação, resultado, classificação ou outro elemento que ainda não precisa ser tratado como Entidade ou Objeto de Valor. 

#### **Informação insuficiente** 

Ainda não existem evidências suficientes para uma classificação. 

Utilize uma tabela: 

|**Conceito**|**Classificação atual**|**Justificativa**|**Evidência**|**Grau de certeza**|
|---|---|---|---|---|
|...|Entidade / Objeto de Valor /|...|...|...|
||Outro / Incerto||||



## Regra importante 

Não classifique pela aparência. 

Um conceito simples pode possuir identidade. 

Um conceito complexo pode ser definido apenas por valores. 

O significado no domínio deve orientar a classificação. 

# ETAPA 5 — Casos de classificação ambígua 

Escolha pelo menos **dois conceitos** cuja classificação não tenha sido trivial. 

Para cada um, apresente: 

qual era a classificação que dúvida surgiu; quais alternativas inicial; foram consideradas; quais evidências estão qual classificação qual informação disponíveis; atual a equipe poderia fazer essa considera mais classificação mudar. adequada; 

# Resultado esperado 

Demonstrar que Modelagem de Domínio é um processo de investigação e não apenas de aplicação mecânica de definições. 

# ETAPA 6 — Relações entre conceitos 

Agora investigue como os conceitos se conectam. 

Não desenhe apenas linhas. 

Para cada relação relevante, formule uma frase com significado no domínio. 

Evite: 

Cliente **possui** Pedido. 

Quando outra expressão for mais precisa, por exemplo: 

Cliente **realiza** Pedido. 

Para cada relação, documente: 

conceito de origem; 

verbo ou significado da relação; 

conceito relacionado; 

justificativa; 

evidência disponível. 

Exemplo de estrutura: 



<!-- Start of picture text -->
Conceito A Relação Conceito B Significado no  Evidência<br>domínio<br>Cliente realiza Pedido ... ...<br><!-- End of picture text -->

Como orientação, espera-se entre **5 e 10 relações significativas** , de acordo com a complexidade do sistema. 

# ETAPA 7 — Cardinalidades 

Para cada relação relevante, investigue quantas ocorrências podem participar dela. 

#### Pergunte: 

pode existir nenhuma? 

- exatamente uma? 

- uma ou várias? 

- várias de ambos os lados? 

existe algum limite definido pelo negócio? 

Registre: 

|**Relação**|**Cardinalidade atual**|**Evidência**|**Grau de certeza**|
|---|---|---|---|
|...|1:1 / 1:N / N:N / outra|...|Confirmada / hipótese / questão|



## Atenção 

Não escolha cardinalidades por conveniência técnica. 

Não defina 1:N ou N:N apenas porque "parece normal". 

Se não houver evidência suficiente, registre a incerteza. 

# ETAPA 8 — Regras de negócio 

A partir: 

- dos fluxos; 

- das operações; 

- das relações; 

- das mudanças de estado; 

- das condições que alteram o comportamento; 

identifique as principais **Regras de Negócio** do sistema. 

Como orientação, documente entre **5 e 10 regras relevantes** . 

Para cada regra, informe: 

|**ID**|**Regra**|**Conceitos envolvidos**|**Evidência**|**Situação**|
|---|---|---|---|---|
|RN01|...|...|...|Confirmada / hipótese|



Uma boa regra deve expressar conhecimento do domínio, por exemplo: 

"Uma reserva não pode ser confirmada quando determinada condição não tiver sido satisfeita." 

Evite escrever apenas a implementação: 

if(status == ...) 

A regra vem antes do código. 

# ETAPA 9 — Invariantes e proteção da consistência 

Entre as regras identificadas, procure condições que precisam permanecer verdadeiras para que determinados conceitos continuem em um estado válido. 

Para cada possível Invariante, documente: 

- conceito protegido; 

- condição que precisa permanecer verdadeira; 

- situação que poderia violá-la; 

- consequência da violação; 

- evidência disponível. 

Estrutura sugerida: 

|**Conceito**<br>...|**Possível Invariante**<br>...|**O que violaria?**<br>...|**Evidência**<br>...|
|---|---|---|---|



## Atenção 

Nem toda Regra de Negócio precisa ser classificada como Invariante. 

Se houver dúvida, registre-a. 

# ETAPA 10 — Estados e mudanças relevantes 

Escolha pelo menos **uma Entidade importante** que possua mudanças significativas ao longo de seu ciclo de vida. 

Exemplos genéricos: 

Pedido 

Reserva 

Solicitação 

Matrícula 

Atendimento 

Agendamento 

Identifique: 

- estado inicial; 

- estados intermediários; 

- estado ou estados finais; 

- eventos que provocam mudanças; 

- transições possivelmente inválidas; 

- regras relacionadas. 

Represente o ciclo utilizando um diagrama quando fizer sentido. 

Exemplo conceitual: 

stateDiagram-v2 [*] --> Criado Criado --> Aguardando Aguardando --> Confirmado Aguardando --> Cancelado Confirmado --> [*] Cancelado --> [*] 



<!-- Start of picture text -->
1}<br><!-- End of picture text -->

O exemplo acima é apenas ilustrativo. 

O diagrama do trabalho deve representar o domínio da própria equipe. 

# ETAPA 11 — Primeiro Modelo Conceitual 

Com base em toda a análise anterior, construa o primeiro Modelo Conceitual do sistema. 

O modelo deve representar, quando aplicável: 

- Entidades; 

- Objetos de Valor; 

- relações; 

- cardinalidades; 

conceitos ainda não classificados; 

- regras importantes; 

- incertezas que afetem o modelo. 

A representação pode utilizar Mermaid ou outra notação conceitual adequada. 

## O modelo não deve ser tratado como diagrama de banco de dados. 

Não inclua apenas: 

- tabelas; 

- PK; 

- FK; 

- tipos SQL; 

- índices; 

detalhes de persistência. 

O objetivo é representar: 

**Como o domínio parece estar organizado diante do conhecimento atual da equipe?** 

# ETAPA 12 — Evolução do modelo 

Apresente de forma resumida como o modelo evoluiu durante o trabalho. 

Organize a evolução em versões: 

Versão 1 — Candidatos a 

conceitos 

Quais elementos surgiram inicialmente? 

Versão 2 — Entidades e Objetos de Valor 

Que classificações foram realizadas? 

Versão 3 — Relações 

Que conexões passaram a ser 

reconhecidas? 

### Versão 4 — Cardinalidades 

Que novas restrições estruturais surgiram? 

Versão 5 — Regras e incertezas 

Que comportamentos e dúvidas passaram a fazer parte do modelo? 

### Versão atual — Modelo Conceitual 

Qual é a melhor representação que a 

equipe consegue justificar neste 

momento? 

## Resultado esperado 

Mostrar que o modelo não surgiu pronto. 

Ele foi construído progressivamente. 

# ETAPA 13 — Revisões em relação ao Ciclo 1 

Retorne ao trabalho anterior. 

Identifique pelo menos: 

um entendimento que uma hipótese que foi confirmado; precisou ser revista; 

uma informação que uma nova questão ganhou novo descoberta durante a significado; modelagem. 

Se nenhuma conclusão anterior tiver mudado, explique por que a equipe considera que o modelo atual continua coerente com a análise anterior. 

# ETAPA 14 — Análise crítica do próprio modelo 

Agora trate o modelo como algo que precisa ser questionado. 

Respondam: 

Qual parte do modelo possui Qual classificação apresenta maior melhor sustentação? incerteza? Qual relação possui justificativa Qual cardinalidade precisa de mais frágil? maior validação? 

Qual regra possui maior impacto sobre o modelo? 

Existe alguma decisão de modelagem baseada principalmente em intuição? 

Que nova informação poderia provocar uma mudança significativa no modelo? 

Qual parte provavelmente será revista no próximo ciclo? 

# ETAPA 15 — Reflexão da equipe 

Encerre o trabalho respondendo: 

   - O que a equipe descobriu sobre o sistema que não era evidente no Ciclo 1? 

   - Qual conceito foi mais difícil de classificar? 

   - Qual relação exigiu maior discussão? 

   - Houve alguma Entidade inicialmente tratada como simples informação? 

   - Houve algum conceito inicialmente tratado como Entidade que deixou de parecer necessário? 

   - Alguma cardinalidade aparentemente óbvia revelou-se uma hipótese? 

   - Que Regra de Negócio influenciou mais fortemente o modelo? 

   - O que este trabalho mudou na compreensão do sistema? 

- E finalmente: 

**A equipe considera que possui um modelo conceitual suficientemente fundamentado para avançar para a discussão sobre fronteiras e responsabilidades do domínio? Por quê?** 

## O que NÃO deve ser feito neste trabalho 

Neste momento, não é necessário definir: 

- controllers; 

- endpoints; 

- APIs; 

- DTOs; 

- services técnicos; 

- repositories; 

- ORM; 

   - chaves estrangeiras; 

   - banco de dados; 

   - Docker; 

   - deploy; 

   - microsserviços; 

   - arquitetura física; 

   - componentes de interface. 

- tabelas relacionais definitivas; 

Também não é necessário definir ainda: 

- Bounded Contexts definitivos; 

- arquitetura de microsserviços; 

- agregados definitivos; 

- fronteiras técnicas finais. 

Esses elementos serão discutidos posteriormente. 

## Regra 

Se a equipe perceber que está tomando uma decisão técnica para preencher uma lacuna de conhecimento do domínio, interrompa a decisão e pergunte: 

**Temos evidência suficiente ou estamos tentando resolver tecnicamente algo que ainda não compreendemos conceitualmente?** 

# Entregável 

A equipe deverá entregar **um único documento estruturado e autossuficiente** . 

|Sugestão de organização:|||
|---|---|---|
|01|02|03|
|Apresentação e retomada<br>do sistema|Candidatos a conceitos|Análise de identidade|
|04|05|06|
|Entidades e Objetos de<br>Valor|Casos ambíguos|Relações|
|07|08|09|
|Cardinalidades|Regras de Negócio|Invariantes|
|10|11|12|
|Estados e ciclo de vida|Modelo Conceitual|Evolução do modelo|
|13|14|15|
|Revisões do Ciclo 1|Incertezas e questões<br>abertas|Reflexão crítica|



O documento deve ser: 

- autossuficiente; 

- organizado; 

- tecnicamente claro; 

- coerente; 

- justificável; 

- compreensível para alguém que não participou das discussões da equipe. 

Diagramas devem possuir explicação textual. 

Um diagrama sozinho não é suficiente para justificar um modelo. 

# Critérios de avaliação 

#### **10 pontos — Continuidade com o Ciclo 1** 

A equipe utiliza efetivamente fluxos, operações e informações previamente analisados como base para a modelagem? 

#### **15 pontos — Identificação e classificação dos conceitos** 

Os candidatos foram adequadamente identificados e as classificações possuem justificativas? 

#### **15 pontos — Entidades e Objetos de Valor** 

A equipe compreende a diferença entre identidade e valor e aplica esse raciocínio de maneira coerente? 

#### **15 pontos — Relações e cardinalidades** 

As relações possuem significado no domínio e as cardinalidades estão justificadas ou explicitamente tratadas como incertezas? 

#### **15 pontos — Regras de Negócio e Invariantes** 

As regras realmente pertencem ao domínio? A equipe diferencia comportamento de implementação? 

#### **10 pontos — Modelo Conceitual** 

O modelo representa de forma coerente os conceitos, relações e conhecimento atual do domínio? 

#### **10 pontos — Tratamento das incertezas** 

A equipe explicita hipóteses, questões em aberto e decisões de modelagem em vez de ocultá-las? 

#### **10 pontos — Justificativas e reflexão crítica** 

A equipe demonstra capacidade de questionar, defender e revisar o próprio modelo? 

Total: 100 pontos 

# Critérios de excelência 

Tendem a se destacar os trabalhos que: 

- partem efetivamente do funcionamento identificado no Ciclo 1; justificam a necessidade de identidade; identificam Objetos de Valor com base em significado; não inventam cardinalidades; reconhecem e registram incertezas; conseguem explicar por que cada elemento está no modelo; 

- não confundem conceito com tabela; 

- evitam classificar tudo como Entidade; 

- utilizam relações semanticamente claras; 

- distinguem regras de negócio de decisões técnicas; 

- evoluem o modelo quando novas informações aparecem; 

apresentam um modelo simples, coerente e defensável. 

# Princípios para lembrar 

**O fluxo oferece Conceito não é tabela. candidatos. A modelagem investiga sua natureza. Nem todo conceito é Uma relação precisa Entidade. possuir significado. Uma Regra de Negócio não Não invente regras para é um if. completar o modelo.** 

**Identidade não é apenas um ID.** 

**Cardinalidade também precisa de evidência.** 

**Um modelo aparentemente completo pode estar errado se esconder hipóteses.** 

**Modelos evoluem quando o conhecimento evolui.** 

# Inteligência Artificial como ferramenta de apoio 

A Inteligência Artificial pode ser utilizada como ferramenta de investigação e crítica durante este trabalho. 

Entretanto: 

**A equipe precisa ser capaz de compreender, explicar, justificar e defender todo o modelo sem depender da IA.** 

A IA pode ajudar a: 

- questionar classificações; 

- identificar hipóteses ocultas; 

- propor perguntas sobre identidade; 

- questionar relações e cardinalidades; 

- detectar contradições; 

- confrontar regras; 

- apontar conceitos possivelmente ausentes; 

- encontrar decisões prematuras. 

Ela não deve ser tratada como especialista do domínio. 

Uma afirmação gerada por IA não transforma uma hipótese em fato. 

# Uso orientado de IA 

Caso utilizem uma ferramenta de IA, evitem pedidos como: 

"Faça o modelo de domínio do meu sistema." 

Prefiram utilizar a ferramenta como um **revisor crítico** . 

Exemplos de perguntas adequadas: 

Que evidência sustenta a Que perguntas deveríamos Esta relação está semanticamente classificação deste conceito responder antes de considerar bem definida? como Entidade? este conceito um Objeto de Valor? Estamos supondo alguma Esta afirmação realmente parece Existe alguma hipótese escondida cardinalidade sem evidência? uma Regra de Negócio? neste modelo? 

Que parte do modelo parece mais frágil? 

Que informação ainda precisamos validar? 

A IA deve ajudar a equipe a **pensar melhor** , e não substituir a modelagem. 

# Apêndice — Uso de Inteligência Artificial 

As equipes que utilizarem IA deverão acrescentar ao final: 

### Ferramenta utilizada 

Identifique ferramenta e modelo, quando conhecido. 

### Finalidade 

Explique como a IA foi utilizada. 

### Contribuições relevantes 

Apresente perguntas ou críticas que efetivamente ajudaram na modelagem. 

### Hipóteses reveladas 

Registre suposições que se tornaram explícitas após a interação. 

### Classificações questionadas 

Informe Entidades, Objetos de Valor, relações ou regras que precisaram ser reconsiderados. 

### Sugestões rejeitadas 

Apresente pelo menos uma sugestão da IA que não foi incorporada, quando houver, explicando por quê. 

## Avaliação crítica 

Responda: 

- Onde a IA ajudou? 

- Onde apresentou limitações? 

- Tentou inventar informações do domínio? 

- Apresentou respostas convincentes, mas sem evidência? 

- Como a equipe verificou suas sugestões? 

## Questão final obrigatória 

**Se a IA fosse retirada agora, a equipe conseguiria explicar, justificar e defender cada elemento do modelo conceitual produzido?** 

Justifique a resposta. 

# Resultado esperado 

Ao concluir este trabalho, a equipe deverá possuir uma primeira documentação consistente sobre **como os conceitos do seu sistema representam o domínio analisado** . 

O modelo produzido não será considerado definitivo. 

Ele será utilizado como entrada para a próxima etapa da disciplina: 

## Fronteiras, Responsabilidades e Organização do Domínio 

A próxima pergunta deixará de ser apenas: 

**"Quais conceitos existem?"** 

**"Quais conceitos precisam permanecer juntos?"** 

**"Quem é responsável por proteger cada regra?"** 

**"Onde começam e terminam as responsabilidades dentro do domínio?"** 

O trabalho realizado neste ciclo, assim como o anterior, **não será descartado** . 

Ele será refinado conforme o conhecimento sobre o sistema evoluir. 

