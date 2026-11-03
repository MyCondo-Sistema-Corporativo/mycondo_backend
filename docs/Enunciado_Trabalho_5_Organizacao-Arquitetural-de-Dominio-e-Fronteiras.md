# Organização Arquitetural de Domínio e Fronteiras

## Trabalho — Do Domínio às Fronteiras: Organizando a Arquitetura do Sistema

## Página 1

Organização Arquitetural de Domínio e Fronteiras

Trabalho --- Do Domínio às Fronteiras: Organizando a
Arquitetura do Sistema

Contexto

Nos trabalhos anteriores, sua equipe investigou o sistema que está desenvolvendo, refinou a compreensão do
domínio e construiu elementos como atores, fluxos, operações, informações, conceitos, Entidades, Objetos de
Valor, Regras de Negócio, invariantes e Agregados.

Agora, o foco deixa de estar apenas nos objetos e Agregados individualmente e passa para uma questão
arquitetural mais ampla!

Como organizar o domínio em partes coesas, com responsabilidades claras e dependências
controladas, permitindo que o sistema evolua sem se tornar uma estrutura excessivamente acoplada?

Neste trabalho, vocês deverão utilizar o conhecimento já produzido sobre o próprio sistema da equipe para
formular e defender uma hipótese arquitetural de fronteiras

O objetivo não é transformar o sistema em microserviços. O objetivo é descobrir onde existem
responsabilidades, significados e regras que justificam fronteiras arquiteturais e explicar como essas partes
colaboram

Objetivo

Evoluir a modelagem já construída pela equipe, identificando:
- áreas de responsabilidade;
"possíveis Bounded Contexts (Contextos Limitados);
- coesão e acoplamento entre essas áreas,
*conhecimento que pertence a cada fronteira;
- dependências entre fronteiras,
"formas de comunicação;
- contratos necessários;
- decisões arquiteturais e seus trade-offs;
*uma estratégia inicial de organização e evolução da arquitetura

Ao final, a equipe deverá ser capaz de defender as fronteiras propostas com argumentos derivados do
domínio, e não apenas de escolhas tecnológicas

Parte 1 --- Retomada do domínio

Antes de propor qualquer fronteira, retome os trabalhos anteriores

---

## Página 2

Apresente uma síntese do sistema contendo:

1. problema central que o sistema resolve;

2. principais atores;

3. principais fluxos ou capacidades;

4. conceitos centrais do domínio;

Sprincipais Regras de Negócio e invariantes;

6. Agregados identificados até o momento.
Não reproduza integralmente os documentos anteriores. Esta seção deve apresentar apenas as informações
necessárias para compreender as decisões realizadas neste trabalho.
Questão de análise

Explique:

Que elementos da modelagem anterior fornecem pistas para a divisão do sistema em áreas de
responsabilidade?

Parte 2 --- Descoberta das áreas de responsabilidade

Identifique conjuntos de responsabilidades que parecem pertencer naturalmente juntos.

Para cada área candidata, apresente:

Área candidata Propósito Principais Conceitos Regras responsabilidades envolvidos relevantes

Exemplo

Depois, analise cada proposta considerando:

*as responsabilidades mudam pelas mesmas razões?
- existe um propósito claro?

*os conceitos possuem relação natural?

- existem regras específicas dessa area?

"há responsabilidades que parecem deslocadas?

+a área ficou ampla demais?

*a área ficou fragmentada demais?

Atenção

Não crie uma área simplesmente porque existe uma Entidade, tabela, tela ou pasta correspondente.

---

## Página 3

A divisão deve representar responsabilidades do domínio, e não apenas a organização técnica do software

Parte 3 --- Investigação dos Bounded Contexts
A partir das áreas identificadas, proponha os Bounded Contexts que fazem sentido para o sistema
Para cada contexto, informe

Nome do contexto

Nome que represente claramente a responsabilidade da fronteira.

Propósito

Explique por que esse contexto existe.

Responsabilidades

Liste aquilo que pertence ao contexto

O que não pertence

Liste responsabilidades ou informações que deliberadamente ficam fora da fronteira.

Vocabulário

Apresente os principais termos utilizados dentro do contexto

Regras e invariantes

Identifique quais regras são controladas por esse contexto.

Agregados relacionados

Indique quais Agregados identificados anteriormente pertencem, em princípio, ao contexto.

Justificativa da fronteira

Explique por que essas responsabilidades devem permanecer juntas e por que devem estar separadas das
demais.

Parte 4 --- Mudanças de significado entre contextos

Investigue se existem conceitos que aparecem em mais de uma área do sistema, mas possuem significados ou
necessidades diferentes

Exemplos genéricos

---

## Página 4

- Cliente;
"Produto;
*Usuário;
"Pedido;
"Pagamento;
"Item,

"Perfil

Para cada ocorréncia encontrada, apresente:

Conceito Contexto A Significado no Contexto B Significado no Contexto A Contexto B

Depois responda:

Seria adequado utilizar exatamente o mesmo modelo para representar esse conceito em todos os
contextos? Por quê?

Caso não exista nenhum conceito desse tipo no sistema, a equipe deverá justificar essa conclusão.

Parte 5 --- Mapa das fronteiras

Construa um diagrama representando os Contextos Limitados ou fronteiras arquiteturais propostas e suas
relações

O diagrama deve ser produzido em Mermaid e incluído diretamente no arquivo Markdown.

Exemplo estrutural:

flowchart LR
A[Contexto A]
B[Contexto B]

C[Contexto C]

A -->|consulta informação| B
A -->| solicita operação! C

Cc -->|publica evento| A

O exemplo acima demonstra apenas a notação. Não reproduza essas fronteiras ou relações sem investigar o
sistema da equipe.

O diagrama deverá permitir identificar:

---

## Página 5

*as principais fronteiras;
*quem depende de quem;
- direção das interações;

"finalidade básica das relações.

Parte 6 --- Conhecimento que atravessa as fronteiras

Escolha pelo menos três relações relevantes do diagrama anterior.
Para cada relação, responda:

1Quem inicia a interação?

2Por que a interação é necessária?

3Quais informações precisam atravessar a fronteira?

4Quais informações não deveriam atravessar?

5A fronteira consumidora precisa conhecer detalhes internos da outra?
6Existe risco de acoplamento excessivo?

7Como esse risco pode ser reduzido?

O objetivo é demonstrar que uma fronteira também define o que uma parte do sistema não precisa conhecer

Parte 7 --- Comunicação entre fronteiras

Para cada uma das relações selecionadas na Parte 6, determine se a comunicação deveria ser, conceitualmente

"síncrona; ou

*assíncrona.
Preencha:

Origem Destino Necessidade Tipo Justificativa

Síncrona/Assíncrona ..

A justificativa deve responder principalmente:

O fluxo precisa da resposta naquele momento para continuar válido?

Não escolha comunicação assincrona apenas por parecer tecnologicamente mais sofisticada.

Parte 8 --- Contratos entre fronteiras

Escolha duas interações importantes e descreva seus contratos conceituais

---

## Página 6

Para cada contrato, apresente:

Contrato: [nome]

Origem:
Destino:
Objetivo:

Informações enviadas

Resultado esperado

Semântica importante

Explique o significado dos dados relevantes, incluindo restrições quando aplicável.

Possíveis falhas
Informações que não devem fazer parte do contrato

Não é necessário definir REST, endpoint, JSON, fila, broker ou tecnologia específica. O objetivo é definir o acordo
de comunicação, não sua implementação

Parte 9 --- Teste crítico das fronteiras
Agora, em vez de defender imediatamente sua solução, tente encontrar problemas nela

Avalie cada fronteira proposta utilizando as perguntas

---

## Página 7

*possui responsabilidades demais?

"possui responsabilidades insuficientes?

- depende de muitas outras áreas?

"existe comunicação excessiva?

"existem Regras de Negócio duplicadas?

- existem conceitos posicionados na fronteira errada?
- duas fronteiras sempre mudariam juntas?

- algo foi separado apenas por organização visual?

*a equipe consegue explicar por que a fronteira existe?

- a fronteira realmente poderia evoluir com algum grau de independência?
Registre os problemas encontrados.
Se a análise provocar mudanças na proposta inicial, apresente:
Hipótese inicial — problema identificado — decisão de revisão

Encontrar e corrigir uma fronteira ruim durante esta atividade não representa erro no trabalho. Representa
evolução do raciocínio arquitetural.

Parte 10 --- Monólito modular ou distribuição?

Considerando o estágio atual do sistema da equipe, analise qual organização seria mais coerente neste
momento.

Discuta:

- maturidade das fronteiras;

"tamanho e organização da equipe;

- necessidade ou não de deploy independente;

- necessidade ou não de escalabilidade independente;

- complexidade operacional;

"frequência esperada de mudanças;

- dependências entre os contextos.
A equipe deverá explicar se, neste momento, suas fronteiras deveriam existir apenas como módulos internos ou
se há alguma evidência concreta que justificaria uma implantação independente
Importante

Não existe exigência de utilização de microserviços
Uma fronteira de domínio não é automaticamente uma fronteira de deploy

Se a equipe concluir que nenhuma parte do sistema deveria ser um microserviço neste momento, essa é
uma conclusão perfeitamente válida, desde que fundamentada

---

## Página 8

Parte 11 --- Hipótese de evolução arquitetural
Arquitetura é evolutiva
Construa uma hipótese de evolução para o sistema

Utilize o seguinte formato:

flowchart LR
A[Estado atual] --> B[Próxima evolução possível]

B --> C[Evolução futura condicionada a evidências]

Para cada transição, explique

*O que precisaria mudar no contexto;
qual problema justificaria a mudança;
- quais evidências deveriam existir,

quais riscos seriam introduzidos.

Não tente prever o futuro como certeza. Trate a evolução como hipóteses condicionais

Parte 12 --- Decisão arquitetural

Escolha uma decisão arquitetural relevante surgida durante o trabalho.

Exemplos:
- manter duas responsabilidades na mesma fronteira;
- separar determinado conceito em um contexto próprio;
- manter determinado contexto como módulo interno;
- utilizar comunicação síncrona;
"utilizar comunicação assincrona;
- não utilizar microservicos;

- considerar determinada fronteira como candidata futura à extração.
Registre a decisão no seguinte formato:
Decisão

Contexto:
Qual problema ou situação levou à decisão?

Decisão adotada:
O que a equipe decidiu?

---

## Página 9

Justificativa:
Quais evidências do domínio sustentam a decisão?

Alternativas consideradas:
Quais outras possibilidades foram avaliadas?

Trade-offs:
O que ganhamos e o que aceitamos como custo ou limitação?

Condições para revisão:
Que mudança futura poderia fazer a equipe reconsiderar esta decisão?

Parte 13 --- Impacto sobre os trabalhos anteriores
Compare as descobertas deste trabalho com a documentação produzida anteriormente.
Identifique

*conceitos que precisam ser reposicionados;
*responsabilidades que estavam agrupadas inadequadamente;
"Agregados que precisam ser reconsiderados;

"regras que deveriam pertencer a outra fronteira;
*ambiguidades de vocabulário;

- dependências que não haviam sido percebidas,

- elementos que permanecem válidos.

Apresente

Descoberta atual Documento/modelo Revisão Justificativa afetado necessária

Alerta de governança

Não será obrigatório atualizar e reenviar, nesta entrega, todos os documentos produzidos anteriormente.
Entretanto, isso não significa que os documentos anteriores devam permanecer desatualizados

As revisões identificadas deverão ser registradas nesta seção e consideradas na evolução futura do projeto. A
documentação produzida ao longo da disciplina representa uma visão progressivamente refinada do sistema
Manter rastreabilidade entre decisões, modelos e revisões é parte da governança arquitetural

Parte 14 --- Síntese crítica

---

## Página 10

Finalize o trabalho respondendo:

1Qual foi a principal mudança na compreensão arquitetural do sistema após esta análise?
2Qual fronteira foi mais difícil de definir? Por quê?

30Onde está atualmente o maior risco de acoplamento?

4Qual decisão da equipe possui maior grau de incerteza?

5Que evidência futura poderia alterar a arquitetura proposta?

6. O que a equipe deliberadamente decidiu não distribuir neste momento?

7 Como os trabalhos anteriores contribuíram para chegar às fronteiras atuais?

Entrega

A entrega deverá ser realizada em um único arquivo Markdown ( .md )

Requisitos obrigatórios
O documento deverá:

- utilizar o sistema real desenvolvido pela equipe;

- conter todas as análises solicitadas;

"justificar as decisões tomadas;

- utilizar Mermaid para todos os diagramas;

*manter coerência com os trabalhos anteriores;

"registrar explicitamente inconsistências ou revisões necessárias;
"apresentar linguagem técnica e objetiva;

- distinguir hipóteses de decisões já suficientemente fundamentadas.
Não entregar diagramas como imagens quando eles puderem ser representados em Mermaid.

O arquivo Markdown deve ser legível diretamente como texto e também quando renderizado por uma ferramenta
compatível com Markdown/Mermaid.

Critérios de avaliação

Critério Peso

Fundamentação das fronteiras a 20% partir do domínio
Qualidade da proposta de 15% Bounded Contexts e coesão
Análise de dependências e 15% acoplamento

Comunicação e contratos entre 15% fronteiras

---

## Página 11

Análise crítica e revisão das 10% hipóteses
Decisões arquiteturais e 10% trade-offs

Rastreabilidade e governança 10% em relação aos trabalhos
anteriores

Clareza, organização e 5% qualidade do Markdown/Mermaid

Total 100%

Orientação final
O objetivo deste trabalho não é produzir a arquitetura "definitiva" do sistema.

Uma boa entrega deverá demonstrar que a equipe consegue investigar, propor, questionar, justificar e revisar
decisões arquiteturais.

Não será considerada mais madura a solução que possuir maior quantidade de serviços, módulos ou
microserviços. A qualidade estará na capacidade de demonstrar que:

as fronteiras existem por razões do dominio, as dependências são compreendidas, a comunicação é
explícita e as decisões podem ser defendidas com evidências.

A arquitetura construída nesta etapa deve ser entendida como uma hipótese arquitetural fundamentada e
evolutiva, que poderá — e provavelmente deverá --- ser refinada conforme o conhecimento sobre o sistema
aumentar.

---

## Página 12


