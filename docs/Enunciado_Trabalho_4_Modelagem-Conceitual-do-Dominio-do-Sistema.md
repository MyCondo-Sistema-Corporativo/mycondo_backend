### Modelagem Conceitual do Dominio do Sistema 

#### Trabalho — Da Informagao ao Dominio: Construindo o Modelo Conceitual do Sistema 

###### Objetivo 

Este trabalho tem como objetivo fazer com que cada aluno ou equipe avance na compreensao do préprio sistema em desenvolvimento, transformando o conhecimento ja construido sobre problema, contexto, fluxos, operacées e informacdes em uma primeira Modelagem de Dominio. 

A atividade deve ser desenvolvida exclusivamente a partir do sistema que o aluno ou a equipe vem analisando e evoluindo ao longo da disciplina 

O objetivo nao é criar um exemplo genérico de modelagem, reproduzir o caso CeliLac ou demonstrar conceitos de maneira isolada. O objetivo é utilizar os conceitos estudados para compreender melhor o dominio do sistema que sera futuramente desenvolvido 

A pergunta central deste trabalho é 

Quais conceitos representam corretamente o dominio do nosso sistema e como podemos justificar sua existéncia, natureza, relagoes, regras e ciclo de vida com base no conhecimento que ja construimos? 

###### Continuidade como trabalho ja realizado 

Antes desta atividade, o sistema ja foi analisado em diferentes momentos da disciplina. 

Ao longo desse processo, foram produzidos documentos que abordaram, entre outros aspectos 

+O problema queo sistema pretende resolver; 

- *o contexto no qual esse problema ocorre; 

*as pessoas ou grupos afetados; 

sfatos, hipdteses, questées em aberto e decisées; 

«fluxos relevantes do sistema; 

*operacées necessarias; 

sinformacgées que precisam ser conhecidas ou preservadas; 

«decisées e entendimentos que posteriormente foram revistos a luz de novas andalises. 

Este trabalho nao inicia uma nova analise independente 

Ele deve partir do conhecimento ja produzido, considerando inclusive as revis6es que surgiram durante as atividades anteriores 

Amodelagem conceitual devera, portanto, ser uma evolucao do que ja foi compreendido sobre o sistema 

###### Atencgao — Revisées dos trabalhos anteriores e governanga do projeto 

Durante esta atividade, é possivel que a equipe perceba que alguma informacao registrada anteriormente precisa ser 

corrigida; 

-complementada; 

«reformulada; 

-reclassificada; 

«substituida; 

sremovida; 

ou melhor justificada 

Nao sera obrigatoria a atualizagao e o reenvio dos trabalhos anteriores como parte desta entrega. 

Entretanto, essas revisées sao importantes e necessarias para a continuidade do desenvolvimento do sistema. 

A medida que o projeto evolui, a documentacao também precisa evoluir. Manter documentos anteriores deliberadamente desatualizados pode provocar divergéncias entre aquilo que a equipe acredita sobre o sistema e aquilo que esta formalmente registrado. 

Por isso, sempre que esta atividade revelar mudancas relevantes, a equipe devera registrar no documento atual quais pontos anteriores precisariam ser revisados. 

Aatualizacao efetiva dos documentos anteriores podera ser realizada posteriormente pela equipe como parte da governanga do projeto, garantindo que: 

«decisdes permanecam rastreaveis; 

«documentos nao se contradigam; 

requisitos e modelos permanecam coerentes; 

snovas decisées sejam justificadas pelo conhecimento acumulado; 

+a implementacao futura seja baseada em documentacao confiavel; 

*seja possivel compreender por que o sistema mudou ao longo do tempo. 

Governanga nao significa impedir mudangas. Significa conseguir compreender, justificar e acompanhar as mudangas realizadas. 

##### Principio central da atividade 

Durante toda a atividade, mantenha uma postura investigativa 

Sempre que surgir um novo conceito, relaco, classificacdo, cardinalidade ou regra, pergunte 

«Isso foi identificado no sistema que estamos desenvolvendo? 

«De onde surgiu essa concluséo? 

-Existe alguma evidéncia? 

+E um fato? 

+E uma hipotese? 

+E uma questo ainda em aberto? 

+E uma decisdo de modelagem? 

-Estamos classificando algo apenas porque parece tecnicamente conveniente? 

-A conclusao esta coerente com o funcionamento anteriormente analisado? 

Uma regra fundamental. 

| Nenhum elemento do modelo deve existir apenas porque “parece que deveria existir”. 

Todo elemento precisa possuir algum significado no dominio do sistema da equipe 

### ETAPA 1 — Retomada do sistema 

Apresente de forma objetiva o sistema que esta sendo desenvolvido. 

Inclua: 

«nome do sistema; 

«problema central; 

-contexto; 

publico ou atores principais; 

objetivo da solucao; 

+fluxo ou fluxos mais importantes ja analisados; 

*principais operacées identificadas; 

+principais informacGes que o sistema precisa conhecer ou preservar. 

N&o reproduza integralmente os documentos anteriores. 

Produza uma sintese que permita compreender de onde a nova modelagem esta partindo 

###### Resultado esperado 

Demonstrar que 0 modelo conceitual sera derivado do conhecimento ja construido sobre o préprio sistema, e nao criado independentemente das andlises anteriores. 

### ETAPA 2 — Rastreabilidade do conhecimento anterior 

Antes de criar 0 modelo, identifique quais elementos das analises anteriores serao utilizados como origem para a modelagem atual. 

Utilize uma estrutura semelhante 

|Elemento anterior|Descrigao resumida|Como influencia<br>a modelagem atual|
|---|---|---|
|Fluxo|||
|Operacao|||
|Informacao|||
|Fato|||
|Hipotese|||
|Quest&o em aberto|||
|Deciséo|||



Nao é necessario registrar tudo 0 que ja foi produzido 

Selecione os elementos que realmente influenciam a modelagem conceitual 

###### Objetivo 

Criar rastreabilidade entre o conhecimento anterior e as decisées tomadas neste trabalho. 

###### ETAPA 3 — Candidatos a conceitos do dominio 

Retome 

sfluxos; 

-operacées; 

sinformacées; 

regras percebidas; 

+fatos; 

hipdteses; 

-questées ainda nao resolvidas. 

A partir deles, identifique os principais candidatos a conceitos do dominio 

Como referéncia, podem surgir aproximadamente entre 8 e 15 candidatos, dependendo da complexidade do sistema 

Essa quantidade nao 6 uma meta. 

| Nao invente conceitos para atingir uma quantidade minima. 

I 

Para cada candidato, registre 

|Conceito<br>candidato|Deondesurgiu?|Porque parece<br>relevante?|Graudecerteza|
|---|---|---|---|
||Fluxo / operacéo / informac&o/||Certeza / hipdtese/|
||regra/outro||duvida|



###### Atengao 

Encontrar um substantivo no texto nao significa automaticamente encontrar uma Entidade. 

Nesta etapa, estamos identificando candidatos 

#### ETAPA 4 — Investigagao de identidade 

Para cada candidato importante, investigue se existe necessidade de identidade propria 

Pergunte: 

- «duas ocorréncias podem possuir os mesmos dadose ainda representar elementos diferentes? 

- «seus dados podem mudar sem queo conceito deixe de representar o mesmo elemento? 

sexiste ciclo de vida? 

- *0 negocio precisa reconhecer aquela ocorréncia especifica ao longo do tempo? 

- 0 conceito precisa ser consultado ou referenciado posteriormente como sendo o mesmo elemento? 

- sua identidade possui significado para o dominio ou apenas para uma futura implementacao? 

Utilize: 

|Conceito|Identidade parece relevante?|Evidéncia / justificativa|Classificagao atual|
|---|---|---|---|
||Sim/Nao/Naosabemos|||



###### Resultado esperado 

Demonstrar que identidade é uma caracteristica do dominio e nao simplesmente a existéncia futura de um campo id. 

#### ETAPA 5 — Entidades, Objetos de Valor e outros conceitos 

Com base na investigacao anterior, classifique provisoriamente os conceitos. 

Utilize, no minimo: 

###### Provavel Entidade 

A identidade possui significado e precisa ser preservada ao longo do tempo 

###### Provavel Objeto de Valor 

O significado esta principalmente nos valores que compéem 0 conceito 

###### Outro tipo de conceito 

Pode representar 

sestado; scondicao; +classificacao; resultado; *politica; sevento; 

*acao; 

ou outro elemento relevante que ainda nao precisa ser tratado como Entidade ou Objeto de Valor. 

###### Informagao insuficiente 

Ainda nao existem evidéncias suficientes para classificar. 

Utilize: 

|Conceito|Classificagdo atual|Justificativa|Evidéncia|Grau de certeza|
|---|---|---|---|---|
||Entidade / Objeto de Valor / Outro/Incerto||||



###### Regra importante 

Nao classifique pela aparéncia 

Um conceito simples pode possuir identidade 

Um conceito complexo pode ser definido apenas por valores 

Acclassificagao deve ser sustentada pelo significado que o conceito possui no sistema que a equipe esta desenvolvendo. 

#### ETAPA 6 — Casos de classificagao ambigua 

Escolha pelo menos dois conceitos cuja classificacao tenha exigido investigacao. 

Para cada um, explique: 

+classificaco inicialmente considerada; 

«duvida encontrada; 

ealternativas analisadas; 

evidéncias disponiveis; 

«classificacao atual; 

-grau de certeza; 

sinformacao que poderia fazer essa Classificag¢ao mudar. 

###### Resultado esperado 

Demonstrar que Modelagem de Dominio nao consiste apenas em aplicar definicd6es de maneira mecanica 

#### ETAPA 7 — Relacgoes entre conceitos 

Investigue como os conceitos se conectam 

N&o desenhe apenas linhas entre elementos. 

Cada relaco precisa expressar algum significado do dominio. 

Utilize frases como: 

| [Conceito A] [verbo ou relag&o] [Conceito 5] 

Para cada relacao, registre. 

|ConceitoA|Relacgao|ConceitoB|Significadonodominio|Evidéncia|
|---|---|---|---|---|



Como referéncia, podem existir entre § e 10 relagées significativas, dependendo do sistema 

Novamente, a quantidade nao é uma meta 

### ETAPA 8 — Cardinalidades 

Para cada relacéo relevante, investigue quantas ocorréncias podem participar dela 

Pergunte: 

«pode existir nenhuma ocorréncia? 

«deve existir exatamente uma? 

pode existir uma ou varias? 

*podem existir varias nos dois lados? 

sexiste limite definido pelo negécio? 

+essa cardinalidade foi confirmada ou apenas presumida? 

###### Registre 

|Relacao|Cardinalidade atual|Evidéncia|Graude certeza||
|---|---|---|---|---|
||4:1/4:N/N:N/<br>outra||Confirmada /hipd<br>|tese<br>/questao|



###### Atengao 

No escolha cardinalidades por conveniéncia técnica 

Se nao houver evidéncia suficiente, registre a incerteza. 

#### ETAPA 9 — Regras de Negocio 

Retorne aos. 

+fluxos; 

*operacées; 

srelacdes; 

sestados; 

decisées; 

*condicées que alteram o funcionamento do sistema. 

Identifique as principais Regras de Negocio 

Como referéncia, podem ser registradas entre 5 e 10 regras realmente relevantes. 

N€o crie regras apenas para atingir essa quantidade. 

Para cada regra: 

|ID|Regrade<br>_<br>Negocio|Conceitos<br>.<br>envolvidos|.<br>woe.<br>Origem /evidéncia|.<br>.<br>Situacao|
|---|---|---|---|---|
|RNO1|-||Fluxo /operacao /requisito<sup>/</sup><br>investigacao/outro|Confirmada /<br>hipotese|



###### Importante 

Uma Regra de Negocio nao é uma implementacao 

Evite 

if (status == ...) 

Prefira registrar o conhecimento do dominio: 

| Determinada operacao somente pode ocorrer quando determinada condicao for satisfeita. 

#### ETAPA 10 — Invariantes e protecao da consisténcia 

Entre as regras identificadas, procure condicdes que precisam permanecer verdadeiras para que determinado conceito continue valido. 

Para cada possivel invariante 

|Conceitoprotegido|Possivelinvariante|Oquepoderiaviola-la?|Consequéncia|Evidéncia|
|---|---|---|---|---|



Nem toda Regra de Negocio precisa ser classificada como Invariante. 

Se houver duvida, registre-a. 

# ETAPA 11 — Estados e ciclo de vida 

Escolha pelo menos uma Entidade importante que possua mudancas significativas ao longo do tempo. 

Identifique: 

estado inicial; 

-estados intermediarios; 

-estado ou estados finais; 

eventos que provocam mudancas; 

stransicdes validas; 

etransicdes invalidas. 

sregras relacionadas. 

Quando fizer sentido, represente o ciclo de vida utilizando Mermaid. 

Exemplo de sintaxe 

###### stateDiagram-v2 

(*] --> EstadoInicial EstadoInicial --> EstadoIntermediario : evento EstadoIntermediario --> EstadoFinal : condi¢&o satisfeita EstadoIntermediario --> EstadoAlternativo : condi¢g&o alternativa EstadoFinal --> [*] EstadoAlternativo --> [*] 

O exemplo acima é apenas estrutural. 

O diagrama entregue deve representar o sistema da propria equipe. 

###### ETAPA 12 — Primeiro Modelo Conceitual do sistema 

Construa uma primeira representacao integrada do dominio 

O modelo devera representar, quando aplicavel. 

-Entidades; 

*Objetos de Valor; 

soutros conceitos relevantes; srelacées; cardinalidades; 

sconceitos ainda nao classificados; 

sregras importantes; sincertezas relevantes. 

O modelo devera ser produzido dentro do préprio arquivo Markdown utilizando Mermaid 

Exemplo de estrutura possivel. 

classDiagram class ConceitoA class ConceitoB class ConceitoC ConceitoA "1" --> "0..*" ConceitoB : realiza ConceitoB --> ConceitoC : utiliza 

###### Atengao 

O exemplo acima serve apenas para demonstrar a sintaxe 

O trabalho deve representar o dominio do sistema desenvolvido pelo aluno ou pela equipe. 

O modelo nao deve ser tratado como diagrama de banco de dados. 

N@o inclua elementos cuja Unica justificativa seja. 

*PK; +FK; stipos SQL; sindices; 

-detalhes de ORM; 

-detalhes de persisténcia. 

Apergunta que o modelo deve responder 6: 

Como o dominio do nosso sistema parece estar organizado diante do conhecimento que conseguimos justificar neste momento? 

#### ETAPA 13 — Explicagao do Modelo Conceitual 

O diagrama nao podera ser entregue sozinho. 

###### Explique 

*por que cada conceito principal esta presente; 

-quais elementos possuem identidade; 

*quais elementos foram tratados como Objetos de Valor, 

«quais relacdes sao mais importantes; 

quais cardinalidades estao confirmadas; 

quais cardinalidades permanecem como hipotese; 

*quais regras influenciam diretamente o modelo; 

*quais elementos ainda apresentam incerteza. 

#### ETAPA 14 — Evolugao do modelo 

Mostre como o modelo evoluiu ao longo da atividade. 

Nao é necessario produzir varios diagramas completos. 

Utilize uma tabela como 

|Momento|Alteragao<br>|.<br>|Evidénciaoudescobertaqueprovocoua<br>|
|---|---|---|---|
||.<br>realizada|Motivo|<br>mudanga|
|Identificacao inicial||||
|Investigacao de||||
|identidade||||
|Relacées||||
|Cardinalidades||||
|Regras||||
|Modeloatual||||



###### Resultado esperado 

Mostrar que 0 modelo nao surgiu pronto. 

Ele foi construido progressivamente 

### ETAPA 15 — Revisoes identificadas em relagao aos documentos anteriores 

Esta etapa é obrigatoria 

Analise o conhecimento produzido anteriormente e identifique, se houver: 

- -entendimento confirmado; 

shipdtese que precisa ser revista; 

- -decisao que passou a exigir nova justificativa; 

sinformagao que ganhou outro significado; 

relacdo anteriormente nao percebida; 

- -questao nova surgida durante a modelagem; 

sinformacgao que deveria ser removida; 

- «elemento que deveria ser atualizado em algum documento anterior. 

Utilize: 

|Documentoouconhecimentoanterior|Revisaoidentificada|Motivo|Impactofuturo|
|---|---|---|---|



###### importante 

Nao sera necessario reenviar versées atualizadas dos trabalhos anteriores nesta entrega. 

Entretanto, essas alteracées devem ser registradas porque serao relevantes para a manutenc@o futura da documentacdo e para a governanca do projeto 

Se nenhuma revisdo tiver sido identificada, explique por que a equipe entende que o conhecimento anterior permanece coerente com o modelo atual. 

#### ETAPA 16 — Registro de pendéncias de governanga 

Crie uma pequena secao denominada. 

###### Pendéncias de Governanga 

Registre os documentos, decisées ou modelos que dever&o ser revisados futuramente para que a documentacéo do sistema permaneca consistente 

Utilize 

|Item a revisar<br>futuramente|Motivo|Prioridade|Consequéncia se permanecer<br>desatualizado|
|---|---|---|---|
|||Alta / Média /||
|||Baixa||



Esta tabela nao exige que a revisdo seja executada agora 

Ela existe para impedir que uma mudanca descoberta seja esquecida 

###### ETAPA 17 — Andalise critica do modelo 

Responda: 

14Qual parte do modelo possui melhor sustentacao? 

- 2Qual conceito possui classificacao mais incerta? 

- 3Qual relacdo possui justificativa mais fragil? 

4Qual cardinalidade ainda precisa de validacao? 

- 5Qual regra possui maior impacto sobre o modelo? 

6Existe alguma deciséo baseada principalmente em intuicao? 

- 7Qual hipotese, se rejeitada, provocaria maior mudanca? 

- 8Que nova informac&o poderia modificar significativamente o modelo? 

9Qual parte provavelmente sera revisada futuramente? 

16xiste alguma contradic&o entre este trabalho e documentac4o anterior? 

#### ETAPA 18 — Reflexao da equipe 

###### Encerre o trabalho respondendo: 

*O que foi descoberto sobre o sistema que nao estava claro anteriormente? 

Qual conceito foi mais dificil de classificar? 

Qual relacdo exigiu maior discussao? 

- -Alguma informacao inicialmente simples passou a ser reconhecida como Entidade? 

- -Algum conceito inicialmente considerado Entidade deixou de parecer necessario? 

-Alguma cardinalidade aparentemente dbvia revelou-se uma hipdtese? 

Qual Regra de Negocio mais influenciou o modelo? 

Qual decisao anterior precisaria ser revisada? 

-O que esta atividade mudou na compreensao do sistema? 

- A equipe considera o modelo atual suficientemente fundamentado para sustentar as proximas etapas do projeto? Por qué? 

## O que NAO deve ser feito 

Neste momento, nao é necessario definir: 

scontrollers; 

endpoints; 

APIs; 

-DTOs; 

«services técnicos; 

stepositories; 

-ORM; 

etabelas relacionais definitivas; 

schaves estrangeiras; 

«banco de dados; 

«Docker; 

deploy; 

smicrosservicos; 

earquitetura fisica; 

*componentes de interface; 

«Bounded Contexts definitivos; 

eagregados definitivos; 

+fronteiras técnicas finais. 

Se surgir uma decis&o técnica apenas para preencher uma lacuna do dominio, interrompao raciocinio e pergunte: 

Temos evidéncia suficiente ou estamos tentando resolver tecnicamente algo que ainda nao 

compreendemos conceitualmente? 

##### Uso de Inteligéncia Artificial 

Ferramentas de Inteligéncia Artificial podem ser utilizadas como apoio a investigacao e a critica 

AlA pode ajudar a: 

+questionar classificagées; 

sidentificar hipdteses ocultas; 

-formular perguntas sobre identidade; 

*questionar relacdes; 

questionar cardinalidades; 

detectar contradicées; 

*confrontar regras; 

sapontar conceitos possivelmente ausentes; 

sidentificar decis6es prematuras. 

Entretanto: 

A equipe precisa ser capaz de compreender, explicar, justificar e defender todo o modelo sem depender da IA. 

A|Anéo deve ser tratada como especialista do dominio 

Uma afirmacéo produzida por IA nao constitui evidéncia 

Evite solicitar 

| “Faca o modelo de dominio do meu sistema." 

Prefira perguntas como: 

Que evidéncia sustenta esta classificagao? 

Que pergunta deveriamos responder antes de considerar este conceito uma Entidade? 

«Estamos supondo alguma cardinalidade? 

Esta relacao possui significado no dominio? 

-Esta regra realmente pertence ao negdcio? 

-Existe alguma hipotese escondida? 

Que parte do modelo possui menor sustentacéo0? 

Que informacao ainda precisa ser validada? 

##### Apéndice — Uso de Inteligéncia Artificial 

Caso a equipe utilize IA, inclua ao final 

###### Ferramenta utilizada 

Informe a ferramenta e o modelo, quando conhecido. 

###### Finalidade 

Explique comoa IA foi utilizada. 

###### Contribuig6es relevantes 

Registre perguntas, criticas ou verificacdes que realmente ajudaram. 

###### Hipoteses reveladas 

Indique suposicdes que passaram a ser percebidas como hipdteses 

###### Classificagé6es questionadas 

Informe conceitos, relacdes, cardinalidades ou regras reconsideradas. 

###### Sugestoes rejeitadas 

Apresente pelo menos uma sugestao da IA que nao tenha sido incorporada, quando houver, explicando o motivo. 

###### Avaliagao critica 

Responda: 

*Onde a IA ajudou? 

*Onde apresentou limitacdes? 

Tentou inventar informacées? 

-Apresentou respostas convincentes sem evidéncia? 

-Como as sugestées foram verificadas? 

###### Questao final obrigatoria 

Se a/A fosse retirada agora, a equipe conseguiria explicar, justificar e defender cada elemento do modelo conceitual produzido? 

Justifique. 

###### Entregavel 

Aentrega devera ser composta por um Unico arquivo em formato Markdown ( .ma ). 

###### Formato obrigatorio 

O arquivo devera 

*possuir extens40 .md ; 

«conter todo o texto da atividade; 

sutilizar titulos, subtitulos, listas e tabelas em sintaxe Markdown; 

+ser autossuficiente; 

«ser tecnicamente claro; 

*ser coerente; 

*permitir a compreensdo por alguém que no participou das discussées da equipe 

###### Diagramas e representacées graficas 

Todo grafico, fluxo, diagrama, modelo conceitual ou representacéo visual que fizer parte da entrega devera ser criado dentro do proprio Markdown utilizando Mermaid 

N&o deverao ser utilizados como substituicao. 

simagens de diagramas; 

scapturas de tela; 

-diagramas exportados como PNG ou JPG; 

sarquivos externos; 

«links para ferramentas de modelagem como unica representacao do modelo. 

Exemplo: 

>> mermaid flowchart LR A[Estado inicial] --> B[Processamento] B --> C[Estado final] 

Os diagramas Mermaid também deverao possuir explicacao textual. 

| Um diagrama sem explicacgao nao é suficiente para justificar uma decisao de modelagem. 

##### Organizacao sugerida do arquivo 

01. Apresentac&o e retomada do sistema 

02. Rastreabilidade do conhecimento anterior 

03. Candidates a conceitos 

04. Investigacéo de identidade 

05. Entidades, Objetos de valor e outros conceitos 

06. Casos ambiguos 

07. Relacées 

08. Cardinalidades 

09. Regras de Negécio 

10. Invariantes 

11. Estados e ciclo de vida 

12. Modelo Conceitual 

13. Explicag&o do modelo 

14. Evolug&o do modelo 

15. RevisSes identificadas 

16. Pendéncias de governanca 

17. Andlise critica 

18. Reflex&o da equipe 

19. Apéndice — Uso de Inteligéncia Artificial, quando aplicdvel 

#### Critérios de avaliagao 

|Critério|Pontos|
|---|---|
|Continuidade e rastreabilidade com o conhecimento anterior|10|
|Identificac&o e classificagéo dos conceitos|15|
|Entidades e Objetos de Valor|15|
|RelacGes e cardinalidades|15|
|Regrasde Negocioe Invariantes|15|
|Modelo Conceitual e coeréncia interna|10|
|Tratamento das incertezas e revisées identificadas|10|
|Justificativas, governancae reflexao critica|10|
|Total|100|



###### Critérios de exceléncia 

###### Tendem a se destacar os trabalhos que: 

*partem efetivamente do sistema em desenvolvimento; 

«demonstram continuidade com as andlises anteriores; 

*conseguem rastrear de onde surgiram os conceitos; 

«no confundem conceito com tabela; 

sjustificam a necessidade de identidade; 

-evitam classificar tudo como Entidade; 

sidentificam Objetos de Valor com base em significado; 

sutilizam relacdes semanticamente claras; 

+ndo inventam cardinalidades; 

edistinguem regras de negocio de decisées técnicas; 

*reconheceme registram incertezas; sidentificam impactos sobre documentac4o anterior; 

sregistram pendéncias de governanca; 

*conseguem explicar por que cada elemento esta no modelo; 

-apresentam um modelo simples, coerente e defensavel; 

sregistram mudancas quando o conhecimento evolui 

##### Principios para lembrar 

| O fluxo oferece candidatos. A modelagem investiga sua natureza. 

| Conceito naoé tabela. 

| Identidade nao 6 apenas um ID. 

| Nem todo conceito é Entidade. 

| Uma relacao precisa possuir significado. 

- | Cardinalidade também precisa de evidéncia. 

- | Uma Regra de Negocio nao éum it. 

- | Nao invente regras para completar o modelo. 

' 

Um modelo aparentemente completo pode estar errado se esconder hipéteses. | 

| Mudangas descobertas agora podem exigir revises em documentos anteriores. 

Nao é obrigatério reenviar essas revis6es nesta atividade, mas registra-las é essencial para a governang¢a futura do projeto. 

| Modelos e documentagao evoluem quando o conhecimento evolui. 

##### Resultado esperado 

Ao concluir este trabalho, o aluno ou a equipe devera possuir uma primeira documentacao consistente sobre como os conceitos do seu proprio sistema representam o dominio analisado. 

O modelo produzido nao sera considerado definitivo. 

Ele servira como base para as proximas decisdes sobre organizacao, responsabilidades e fronteiras do dominio e, posteriormente, para o desenvolvimento efetivo do sistema 

O conhecimento produzido nas atividades anteriores nao sera descartado. 

Da mesma forma, este documento também podera ser revisado futuramente. 

O objetivo é construir progressivamente um conjunto de documentos coerentes, rastreaveis e capazes de sustentar as decisées de desenvolvimento do sistema ao lonao da disciplina 



