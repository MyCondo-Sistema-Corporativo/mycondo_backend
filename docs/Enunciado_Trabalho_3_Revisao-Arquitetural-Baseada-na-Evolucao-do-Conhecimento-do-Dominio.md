### Revisao Arquitetural Baseada na Evolugao do Conhecimento do Dominio 

#### Trabalho 3 — Revisao Arquitetural Baseada na Evolugcao do Conhecimento do Dominio 

###### 1. Contexto do Trabalho 

No Trabalho 1, a equipe realizou uma primeira andlise arquitetural do sistema, identificando problema, atores, méddulos, fluxo, arquitetura em camadas, desafios arquiteturais, decisdes registradas por ADRe possiveis cenarios de evolucao. 

No Trabalho 2, a equipe aprofundou a compreensao do dominio ao investigar conceitos, identidade, Entidades, Objetos de Valor, relac6es, cardinalidades, Regras de Neg6cio, invariantes, estados, incertezas e revises em relacao ao ciclo anterior. 

Agora, a equipe devera retornar ao Trabalho 1 e responder a uma pergunta central 

| Depois de conhecer melhor o dominio, nossa arquitetura inicial ainda faz sentido? 

O objetivo nao é simplesmente “corrigir’ 0 Trabalho 1 

O objetivo é reavaliar criticamente as decisées anteriores a luz do novo conhecimento adquirido. 

Arquitetura de software nao é uma estrutura definitiva produzida de uma Unica vez. Ela evolui a medida que a compreens&o do problema e do dominio melhora. 

##### 2. Objetivo do Trabalho 

Este trabalho tem como objetivo levar a equipe a 

srevisar criticamente a proposta arquitetural inicial; 

sidentificar quais decisées continuam justificaveis; 

sreconhecer decisées que precisam ser refinadas, alteradas ou descartadas; 

relacionar mudancas arquiteturais as descobertas feitas no Trabalho 2; 

sregistrar incertezas que ainda impedem decisées definitivas; 

*compreender a arquitetura como resultado de um processo progressivo de aprendizado. 

Ao final da atividade, a equipe devera ser capaz de explicar: 

- +O que permaneceu valido; 

- *O que mudou; 

- *por que mudou; 

*quais descobertas provocaram essas mudancas; 

«quais decisdes ainda nao podem ser tomadas com seguranca 

###### 3. Principio Central 

Durante este trabalho, nao altere elementos apenas para demonstrar que houve evolucao 

Uma decis&o anterior pode continuar valida 

A equipe devera avaliar cada elemento relevante utilizando uma das seguintes classificacdes 

|Situagao|Significado|
|---|---|
|Mantido|O novo conhecimento reforcgaou nao contradiz a decisao anterior.|
|Refinado|Adecisaéo permanece, mas pode serdescritacom maior precisao|
|Alterado|Oconhecimento adquirido demonstra que adecisao anterior precisa mudar.|
|Descartado|Adecis&oou hipotese anterior deixoude fazer sentido.|
|Emaberto|Aindanaoexistemevidénciassuficientesparatomarumadecisdosegura.|



| Mudan¢a sem justificativa nao representa evolu¢ao arquitetural. 

# 4. ETAPA 1 — Sintese da Arquitetura Inicial 

Retome o Trabalho 1 e apresente uma sintese da proposta arquitetural originalmente construida. 

Inclua: 

+sistema analisado; 

+problema central; 

«principais atores; 

+médulos inicialmente propostos; 

sarquitetura em camadas 

+fluxo principal; 

«principais desafios arquiteturais; 

-decisao registrada no ADR-001; 

«cenario de evolucao considerado. 

Nao reproduza integralmente o Trabalho 1 

O objetivo é permitir que o leitor compreenda qual era a arquitetura considerada adequada naquele momento. 

#### 5. ETAPA 2 — Descobertas do Trabalho 2 com impacto arquitetural 

Retome o Trabalho 2 e identifique as descobertas que podem afetar a arquitetura 

Considere especialmente: 

-Entidades identificadas; 

-Objetos de Valor; 

srelacdes relevantes; 

-cardinalidades; 

*Regras de Negécio; 

sinvariantes; 

«ciclos de vida; 

sestados importantes; 

conceitos cuja Classificag¢ao mudou; 

shipdteses revisadas; 

snovas questées descobertas 

Utilize uma tabela semelhante 

Descoberta do Elementos Possivel impacto Grau de certeza Trabalho 2 envolvidos arquitetural Confirmado / hipstese/ questao 

#### 6. ETAPA 3 — Revisao da descri¢ao do problema 

Retorne a descricao do problema apresentada no Trabalho 1 

Pergunte: 

- *0 problema continua sendo compreendido da mesma forma? 

- *alguma necessidade ganhou maior importancia? 

- *algum aspecto anteriormente tratado como secundario tornou-se relevante? 

ealguma hipotese anterior revelou-se incorreta? 

- a descricao atual representa adequadamente o dominio conhecido? 

Classifique 0 resultado como: 

Mantido / Refinado / Alterado / Em aberto 

Explique a deciso. 

###### 7. ETAPA 4 — Revisao dos atores 

Reavalie os atores identificados no Trabalho 1 

Investigue: 

ealgum novo ator surgiu? 

salgum ator deixou de ser necessario? 

salgum ator possui responsabilidades diferentes das inicialmente percebidas? 

-algum conceito anteriormente tratado como ator revelou-se apenas parte interna do dominio? 

sas relacdes dos atores com o sistema continuam coerentes? 

###### Registre 

|Ator|Situagao<br>anterior|Situagao<br>atual|.<br>.<br>Classificagao|.<br>.<br>Justificativa|
|---|---|---|---|---|
||||Mantido / Refinado / Alterado/Descartado/Em||
||||<br>aberto||



###### 8. ETAPA 5 — Revisao dos médulos do sistema 

Esta é uma das principais etapas do trabalho. 

No Trabalho 1, os médulos foram definidos a partir da compreensAo inicial das responsabilidades do sistema 

Agora, confronte essa divisao com o conhecimento produzido no Trabalho 2. 

Pergunte para cada médulo 

*quais conceitos do dominio estao associados a ele? 

+quais regras sao tratadas por ele? 

+quais invariantes precisam ser protegidas? 

+o mddulo concentra responsabilidades coerentes? 

-existem responsabilidades diferentes agrupadas artificialmente? 

salguma responsabilidade esta distribuida entre mddulos diferentes? 

+o nome do modulo ainda representa adequadamente aquilo que ele faz? 

+0 mddulo foi definido com base em conhecimento do dominio ou apenas por conveniéncia funcional? 

Utilize: 

|Modulo|Situagao<br>anterior|Descoberta relevantedo<br>Trabalho2|Situagao atual|Justificativa|
|---|---|---|---|---|
||||Mantido / Refinado /Alterado /||
||||Descartado/Emaberto||



| Nao transforme esta atividade em defini¢ao antecipada de Bounded Contexts. 

Ainda estamos avaliando a arquitetura existente 

#### 9. ETAPA 6 — Revisao do fluxo principal 

Retomeo fluxo principal representado no Trabalho 1 

###### Compare-o com 

-estados identificados no Trabalho 2; 

etransicdes; 

*Regras de Negécio; sinvariantes; scondicées; 

sexcecdes; 

variacées descobertas 

Pergunte: 

salguma etapa estava simplificada demais? 

existe alguma condicao importante nao representada? 

ha transicées invalidas que precisam aparecer? 

ealgum fluxo secundario tornou-se importante? 

«alguma operacao anteriormente descrita precisa ser reinterpretada? 

Caso necessario, apresente uma versdo revisada do fluxo. 

#### 10. ETAPA 7 — Revisao do diagrama de moédulos 

Atualize o diagrama de médulos somente se houver justificativa 

O novo diagrama devera refletir 

smédulos atualmente considerados; 

responsabilidades revisadas; 

*principais dependéncias; 

simpactos das descobertas do Trabalho 2 

Se nenhuma alteracao for necessaria, mantenha o diagrama e explique por qué. 

| Um diagrama mantido com boa justificativa 6 tao valido quanto um diagrama alterado. 

### 11. ETAPA 8 — Revisao da arquitetura em camadas 

O Trabalho1 solicitou a representacdo do sistema utilizando as camadas de: 

-Apresentacao; 

*Aplicacao; 

*Dominio; 

+Persisténcia 

Reavalie essa organizacao. 

Pergunte: 

+a camada de Dominio ganhou responsabilidades mais claras? 

salguma responsabilidade originalmente atribuida a Aplicacao parece pertencer ao Dominio? 

salguma regra estava implicitamente sendo tratada como responsabilidade técnica? 

- *a separacdo entre dominio e persisténcia continua suficientemente clara? 

eas descobertas do Trabalho 2 exigem alguma mudanca conceitual na distribuicao das responsabilidades? 

Nao é necessario alterar o estilo arquitetural se ele continuar adequado 

#### 12. ETAPA 9 — Revisao dos desafios arquiteturais 

Retome os desafios técnicos e arquiteturais identificados no Trabalho 1 

Investigue se as descobertas do Trabalho 2 revelaram novos desafios relacionados, por exemplo, a 

consisténcia; 

*concorréncia; 

sintegridade; 

sregras criticas; 

sestados; 

stransicdes; 

«dependéncias externas; 

»seguranca; 

«disponibilidade; 

sintegracao; 

sescalabilidade. 

Utilize: 

|Desafio|Ja existia no Trabalho 1?|Evidéncia atual|Impacto|Situagao|
|---|---|---|---|---|
||Sim/Nao|||Mantido/Novo/Refinado|



###### 13. ETAPA 10 — Revisao do ADR-001 

Retome o ADR-001 produzido no Trabalho 1 

###### Avalie 

- +o contexto continua valido? 

- +a decisdo ainda faz sentido? 

sas alternativas consideradas continuam adequadas? 

- *surgiram novas alternativas? 

+os beneficios continuam validos? 

- *apareceram novos riscos ou consequéncias? 

- *0 novo conhecimento do dominio fortalece ou enfraquece a deciséo? 

Classifique o ADR como 

+Mantido 

-Revisado 

*Substituido 

-Ainda inconclusivo 

Caso seja revisado, preserve a decisdo anterior como registro historico e apresente uma nova versao. 

| ADR nao deve apagar o passado. Ele deve registrar a evolu¢ao da decisao. 

### 14. ETAPA 11 — Revisao da funcionalidade inovadora 

Retome a funcionalidade inovadora proposta no Trabalho 1 

Pergunte: 

-ela continua atendendo a uma necessidade real? 

0 Trabalho 2 revelou regras que dificultam sua implementacao futura? 

- ela depende de conceitos que agora compreendemos de outra forma? 

- *provoca novas responsabilidades? 

«continua coerente com o dominio? 

Classifique como: 

Mantida / Refinada / Alterada / Descartada / Em aberto 

#### 15. ETAPA 12 — Revisao do cenario de evolugao 

Retome o cenario de evoluc&o apresentado no Trabalho 1 

Avalie novamente: 

410 que permanece na arquitetura? 

20 que precisaria ser alterado? 

3Alguma decisao arquitetural precisaria ser revista? 

4A arquitetura atual favorece ou dificulta essa evolucao? 

Agora fundamente as respostas também com base: 

snas relacées; 

*nas regras, 

+nos estados; 

*nas invariantes; 

snas incertezas identificadas no Trabalho 2 

#### 16. ETAPA 13 — Matriz Geral de Evolugao Arquitetural 

Consolide as principais revisdes realizadas. 

|Elemento|Situagao no<br>Trabalho 1|Situagao<br>atual|.<br>.<br>Classificagao|Evidéncia que sustenta a<br>von<br>decisao|
|---|---|---|---|---|
|Problema|||||
|Atores|||||
|Modulos|||||
|Fluxo|||||
|Arquitetura em<br>camadas|||||
|Desafios|||||
|ADR-001|||||
|Funcionalidade<br>inovadora|||||
|Cenariodeevolucao|||||



## 17. ETAPA 14 — Decisées que ainda NAO podem ser tomadas 

Identifique aspectos que a equipe considera importantes, mas para os quais ainda nao possui conhecimento suficiente 

Para cada um, registre 

|Questaéo|Porqueaindanaopodemosdecidir?|Queinformagaofalta?|Possivelimpacto|
|---|---|---|---|



Essa etapa é especialmente importante. 

| Reconhecer que ainda nao ha evidéncia suficiente 6 melhor do que inventar uma decisao. 

#### 18. ETAPA 15 — Reflexao Arquitetural 

###### Respondam 

Qual decisdo do Trabalho 1 foi mais fortalecida pelo Trabalho 2? 

Qual decis&o ficou mais fragil? 

Qual alteracao foi mais significativa? 

+Algum modulo deixou de fazer sentido? 

-Alguma responsabilidade mudou de lugar? 

-Alguma Regra de Negocio revelou um problema na arquitetura anterior? 

-Alguma invariante mudou a compreensao sobre responsabilidades? 

-Alguma decisao anterior havia sido tomada principalmente por intuicao? 

Qual parte da arquitetura ainda possui maior incerteza? 

+O que a equipe aprendeu sobre a relacdo entre conhecimento de dominio e arquitetura? 

Por fim, responda: 

Se precisassemos defender hoje a arquitetura do sistema diante de outro arquiteto, quais partes conseguiriamos justificar com seguranga e quais ainda precisariamos investigar? 

## 19. O que NAO deve ser feito 

Este trabalho nao deve antecipar decisées que pertencem as proximas etapas da disciplina 

Neste momento, nado é necessario definir: 

«Bounded Contexts definitivos; 

sagregados definitivos; 

smicrosservicos; 

sendpoints; 

APIs; 

+DTOs; 

controllers; 

srepositories; 

-ORM; 

stabelas; 

“PK; 

FK; 

earquitetura fisica; 

einfraestrutura definitiva; 

«deploy. 

Portanto, se a equipe identificar que uma fronteira parece inadequada, podera registrar 

“A responsabilidade provavelmente precisa ser reorganizada, mas ainda nao possuimos conhecimento 

suficiente para definir a nova fronteira. 

Essa é uma conclusao valida 

###### 20. Entregavel 

Aequipe devera entregar um Unico documento estruturado e autossuficiente 

Sugestao de organizacao: 

1Sintese da Arquitetura Inicial 

2Descobertas do Trabalho 2 com impacto arquitetural 

3Revisdo do problema 

4Revis&o dos atores 

5Reviséo dos médulos 

6Revisao do fluxo 

7Revisao do diagrama de médulos 

8Revisdo da arquitetura em camadas 

9Revisdo dos desafios arquiteturais 

1Reviséo do ADR-001 

1Reviséo da funcionalidade inovadora 

1Revisdo do cenario de evolucao 

1Blatriz Geral de Evolucdo Arquitetural 

1Mecisées ainda em aberto 

4Reflexdo Arquitetural 

Diagramas revisados devem possuir explicacao textual 

Nao basta apresentar verses novas 

A equipe devera demonstrar por que cada alteracao foi feita 

#### 21. Critérios de Avaliagao 

|Critério|Peso|
|---|---|
|Continuidade entre Trabalhos 1 e 2|15%|
|Identificacao dos impactosdo conhecimento de dominio|15%|
|Qualidade da reviséo dos mddulos e responsabilidades|20%|
|Coer€ncia das revis6es arquiteturais|15%|
|Revisdo doADR e demais decisées|10%|
|Tratamento das incertezas|10%|
|Justificativas baseadas em evidéncias|10%|
|Reflex4ocritica|5%|



Total: 100% 

###### 22. Critérios de Exceléncia 

Tendem a se destacar os trabalhos que: 

+nao alteram a arquitetura apenas para demonstrar mudanca; 

- *conseguem justificar tanto decisées mantidas quanto decisées modificadas; 

relacionam claramente as mudancas as descobertas do Trabalho 2; 

- *reconhecem decisées tomadas prematuramente; 

edistinguem problema de dominio de solucéo técnica; 

evitam antecipar Bounded Contexts ou agregados; 

- *preservam a evolucao das decisées; 

sregistram incertezas sem tentar escondé-las; 

«demonstram que a arquitetura foi refinada porque o conhecimento aumentou; 

sapresentam uma arquitetura mais simples, coerente e defensavel 

##### 23. Principios para lembrar 

Arquitetura nao evolui porque queremos alterar diagramas. Ela evolui porque nosso conhecimento sobre o problema evoluiu. 

- | Manter uma decisado também 6 uma decisao arquitetural, desde que seja possiveljustifica-la. 

- | Uma decisao antiga nao precisa estar errada para ser refinada. 

- | Nao saber ainda é uma informagao importante. 

- | Nao utilize uma solugao técnica para esconder uma divida conceitual. 

##### 24. Resultado Esperado 

Ao concluir este trabalho, a equipe devera possuir uma versao revisada e mais fundamentada de sua proposta arquitetural inicial, construida a partir do conhecimento adquirido durante a Modelagem de Dominio. 

O resultado nao deve ser tratado como arquitetura definitiva. 

Ele servira de entrada para a proxima discuss4o da disciplina: 

- | Fronteiras, Responsabilidades e Organizac¢ao do Dominio 

###### Aproxima questao passa a ser 

Se conhecemos melhor os conceitos, regras e invariantes do dominio, quais responsabilidades 

realmente precisam permanecerjuntas e onde deveriam existir fronteiras? 

Assim, 0 percurso realizado até aqui permanece acumulativo 

Trabalho 1 — Arquitetura inicial 

- Trabalho 2 — Compreensao conceitual do dominio 

- Trabalho 3 — Revisao arquitetural baseada em evidéncias 

- Proximo ciclo — Fronteiras e responsabilidades do dominio 

Esse encadeamento mantémo principio central dos trabalhos anteriores: nenhum modelo é€ descartado; ele é 

refinado conforme o conhecimento evolui. 



