# Resumo de Estudo — Conceitos de Sistemas Corporativos

> Guia conceitual para reconhecer e aplicar os assuntos em uma prova. Os exemplos abaixo são genéricos e não dependem de um sistema específico.

## 1. Domínio e modelo conceitual

### Domínio

É o conjunto de problemas, regras, processos, pessoas, conceitos e conhecimentos de uma área de negócio.

### Modelo conceitual

Representa os conceitos importantes do domínio, seus relacionamentos, responsabilidades, estados e regras.

Não é um modelo de banco de dados. Portanto, não deve começar por tabelas, chaves, tipos de coluna ou detalhes de ORM.

### Como descobrir conceitos

Procure:

- substantivos importantes nos requisitos;
- informações que precisam ser preservadas;
- operações realizadas pelos usuários;
- fatos que mudam com o tempo;
- regras que precisam ser protegidas;
- objetos que possuem ciclo de vida ou histórico.

## 2. Entidade, objeto de valor e estado

### Entidade

Objeto que possui **identidade própria** e continua sendo reconhecido mesmo quando seus atributos mudam.

Exemplo genérico: uma solicitação, contrato, pedido ou usuário que precisa ser acompanhado ao longo do tempo.

Pergunta para identificar:

> Preciso distinguir este objeto de outros semelhantes e preservar seu histórico?

Se sim, provavelmente é uma entidade.

### Objeto de valor (*Value Object*)

Objeto definido pelos seus valores, sem identidade própria. Dois objetos com os mesmos valores são equivalentes.

Exemplos:

- intervalo de datas;
- endereço;
- valor monetário;
- período;
- coordenada;
- percentual.

Objetos de valor normalmente devem ser imutáveis e validar seu próprio significado.

### Estado

Indica a condição atual de uma entidade dentro de seu ciclo de vida.

Exemplos genéricos: `Pendente`, `Aprovado`, `Cancelado`, `Encerrado`.

O estado não costuma ser uma entidade independente. O importante é definir:

- estados possíveis;
- transições permitidas;
- evento que causa cada transição;
- quem pode executar a mudança;
- condições para entrar ou sair de cada estado.

## 3. Regras de negócio e invariantes

### Regra de negócio

É uma política ou condição que orienta o comportamento do sistema.

Exemplos genéricos:

- uma operação só pode ocorrer dentro de determinado prazo;
- uma pessoa precisa ter permissão para executar uma ação;
- um pagamento pode ser exigido antes da confirmação;
- uma aprovação é necessária antes da execução.

### Invariante

É uma condição que deve permanecer verdadeira para que o domínio continue consistente.

Exemplos:

- não podem existir dois compromissos conflitantes para o mesmo recurso;
- um registro concluído não pode voltar silenciosamente para aberto;
- um item não pode estar simultaneamente em dois estados incompatíveis;
- um lançamento publicado não pode desaparecer sem rastreabilidade;
- um resultado não pode contar a mesma participação duas vezes.

### Como aplicar uma invariante

Para cada regra, identifique:

1. conceito protegido;
2. estado inválido;
3. momento em que a regra precisa ser garantida;
4. operação que pode causar a violação;
5. responsável por impedir a violação;
6. tratamento quando a regra não for atendida.

### Onde proteger

Uma regra essencial deve ser protegida pelo **domínio**, e não apenas:

- na tela;
- no controller;
- em uma validação superficial;
- em um script isolado;
- somente no banco de dados.

A interface pode validar para melhorar a experiência, mas o domínio deve continuar sendo a autoridade.

## 4. Ciclo de vida e transições

Uma entidade com comportamento normalmente possui um ciclo de vida.

### Como modelar

1. defina o estado inicial;
2. liste os estados válidos;
3. defina eventos ou operações que causam mudanças;
4. defina as transições permitidas;
5. defina estados finais;
6. rejeite transições inválidas;
7. preserve autor, data e motivo quando houver necessidade de auditoria.

### Cuidados

- não alterar o estado diretamente sem validar a transição;
- não permitir que um estado final volte silenciosamente a um estado anterior;
- registrar reaberturas, cancelamentos e exceções;
- separar estados da entidade de estados técnicos de processamento;
- usar enums ou tipos equivalentes para representar estados conhecidos.

## 5. Agregados

### Definição

Um **agregado** é um conjunto de objetos do domínio tratado como uma unidade de consistência.

### Raiz do agregado

A **Aggregate Root** é a entidade principal que controla o acesso às alterações do agregado. Objetos externos devem referenciar a raiz, em vez de alterar diretamente seus objetos internos.

### Como identificar um agregado

Agrupe objetos que:

- mudam juntos;
- possuem invariantes compartilhadas;
- precisam ser consistentes imediatamente;
- fazem parte do mesmo ciclo de vida;
- têm uma entidade claramente responsável pelas alterações.

### O que evitar

- agregados grandes demais;
- colocar todo o sistema em um único agregado;
- permitir que qualquer módulo altere objetos internos diretamente;
- colocar no mesmo agregado conceitos que só trocam informações;
- confundir agregado com tabela ou módulo.

### Consistência

Nem todos os interessados precisam estar no mesmo agregado. Uma mudança pode gerar um evento de domínio para que outros agregados reajam depois.

## 6. Eventos de domínio

Um **evento de domínio** representa um fato relevante que já aconteceu.

Exemplos genéricos:

- `SolicitacaoAprovada`;
- `PagamentoReconhecido`;
- `ItemRecebido`;
- `OrdemConcluida`.

Um evento deve responder:

- o que aconteceu;
- quando aconteceu;
- qual entidade foi afetada;
- quem pode se interessar;
- quais consequências podem ser disparadas.

### Eventos não são comandos

- **Comando:** pedido para realizar uma ação.
- **Evento:** registro de que uma ação já ocorreu.

Eventos permitem que outros contextos reajam sem colocar todos os conceitos na mesma fronteira de consistência.

## 7. Arquitetura em camadas

### Camada de apresentação

Responsável por telas, APIs, controllers, entrada e saída de dados e validações de formato.

Não deve concentrar regras essenciais do negócio.

### Camada de aplicação

Responsável por:

- executar casos de uso;
- orquestrar objetos do domínio;
- controlar transações;
- coordenar chamadas;
- converter DTOs;
- publicar consequências.

Ela coordena o fluxo, mas não deve substituir o domínio nas decisões de negócio.

### Camada de domínio

É o núcleo do sistema. Contém:

- entidades;
- objetos de valor;
- agregados;
- regras;
- invariantes;
- estados;
- eventos de domínio;
- serviços de domínio quando necessário.

Deve ser independente de banco, framework e interface.

### Camada de persistência/infraestrutura

Responsável por:

- banco de dados;
- repositórios;
- ORM;
- mensageria;
- gateways;
- APIs externas;
- detalhes técnicos.

Persistência armazena e recupera dados, mas não deve decidir sozinha se uma transição de negócio é válida.

## 8. Monólito modular, microsserviços e ADR

### Monólito modular

É uma aplicação implantada como uma unidade, mas dividida internamente em módulos com responsabilidades e fronteiras claras.

Vantagens:

- menor complexidade operacional;
- implantação mais simples;
- transações locais mais fáceis;
- depuração facilitada;
- menor custo inicial.

Riscos:

- ponto único de falha;
- módulos podem se acoplar;
- uma parte pode afetar o sistema inteiro;
- exige disciplina arquitetural.

### Microsserviços

Dividem o sistema em serviços implantáveis e escaláveis separadamente.

Possíveis benefícios:

- isolamento de falhas;
- escala independente;
- deploy independente;
- autonomia por contexto.

Custos:

- comunicação de rede;
- falhas parciais;
- observabilidade mais complexa;
- consistência eventual;
- contratos e versionamento;
- maior custo operacional.

Não se deve criar microsserviços apenas porque existem muitos módulos ou telas. É necessário haver autonomia, escala, razões de mudança e necessidade de implantação independentes.

### ADR (*Architecture Decision Record*)

Documento que registra uma decisão arquitetural.

Estrutura recomendada:

- contexto e problema;
- decisão;
- alternativas consideradas;
- justificativa;
- benefícios;
- custos e riscos;
- consequências;
- critérios para revisar a decisão.

## 9. Bounded Context

Um **Bounded Context** é uma fronteira dentro da qual um modelo e um vocabulário possuem significado consistente.

O mesmo termo pode ter significados diferentes em contextos diferentes. Por exemplo, “cliente” pode representar uma pessoa autenticada, um responsável financeiro ou um solicitante de serviço, dependendo do contexto.

### Como identificar contextos

Observe:

- vocabulários diferentes;
- regras diferentes;
- ciclos de vida diferentes;
- invariantes diferentes;
- razões de mudança diferentes;
- responsabilidades claramente separáveis.

### O que um contexto define

- conceitos próprios;
- linguagem ubíqua;
- responsabilidades;
- regras e invariantes;
- agregados relacionados;
- conceitos que não pertencem à fronteira;
- colaboração com outros contextos.

### Fronteira não é implantação

Um Bounded Context pode existir dentro de um monólito modular. Ele não precisa virar microsserviço imediatamente.

## 10. Comunicação entre contextos

### Comunicação síncrona

Usada quando uma resposta é necessária para tomar uma decisão naquele momento.

Características:

- resposta imediata;
- maior dependência temporal;
- pode bloquear se o outro contexto estiver indisponível;
- exige timeout e tratamento de resposta desconhecida.

Falha ou ausência de resposta não deve ser interpretada automaticamente como “aprovado”, “pago” ou “autorizado”.

### Comunicação assíncrona

Usada quando uma consequência pode ser processada depois.

Características:

- menor acoplamento temporal;
- tolerância a indisponibilidade momentânea;
- possibilidade de filas e retentativas;
- atraso ou consistência eventual.

Deve considerar:

- idempotência;
- identificador da mensagem;
- retentativas;
- ordenação;
- estado de processamento;
- erros observáveis;
- reconciliação;
- possibilidade de duplicidade.

### Contratos

Contextos devem trocar somente as informações necessárias. Evite compartilhar:

- banco de dados;
- entidades internas;
- detalhes de implementação;
- modelos instáveis.

Prefira contratos explícitos, versionados e adaptadores/ACL (*Anti-Corruption Layer*) quando os modelos forem diferentes.

## 11. Coesão e acoplamento

### Coesão

Mede o quanto os elementos de um módulo pertencem ao mesmo propósito.

Alta coesão significa:

- responsabilidades relacionadas;
- regras que mudam pelas mesmas razões;
- vocabulário consistente;
- menor quantidade de responsabilidades diferentes.

### Acoplamento

Mede o quanto um módulo depende de outros.

Acoplamento alto pode envolver:

- muitas regras compartilhadas;
- muitos dados trocados;
- dependência temporal;
- alterações que precisam ocorrer juntas;
- conhecimento de detalhes internos.

Objetivo geral: **alta coesão e baixo acoplamento**, sem eliminar todas as integrações necessárias.

## 12. Caso de uso, ator e resultado

### Ator

Pessoa, organização ou sistema externo que interage com o sistema.

### Objetivo

O que o ator deseja realizar.

### Caso de uso

Fluxo de comportamento que transforma uma solicitação em um resultado observável.

Um bom caso de uso apresenta:

- ator iniciador;
- objetivo;
- pré-condições;
- fluxo principal;
- alternativas e exceções;
- regras aplicadas;
- resultado esperado;
- eventos ou efeitos gerados.

Não confunda caso de uso com uma tela ou com uma chamada específica de banco.

## 13. Auditoria, rastreabilidade e segurança

Quando um fato possui importância operacional, financeira ou de segurança, deve-se preservar:

- quem realizou a ação;
- quando ocorreu;
- estado anterior e posterior;
- motivo;
- evidências ou documentos;
- origem da operação;
- histórico de tentativas e exceções.

Excluir ou sobrescrever silenciosamente informações importantes prejudica auditoria e confiança no sistema.

Dados sensíveis exigem:

- controle de acesso;
- separação de responsabilidades;
- criptografia quando aplicável;
- minimização de dados;
- registro de auditoria;
- conformidade legal, como a LGPD.

## 14. Como resolver questões de prova

### Para classificar um conceito

Pergunte:

1. possui identidade e histórico?
2. é apenas um conjunto de valores?
3. representa um estado?
4. protege uma regra?
5. pertence a qual contexto?

### Para encontrar a raiz de um agregado

Pergunte:

1. qual entidade controla as mudanças?
2. quais objetos precisam ser consistentes juntos?
3. qual objeto protege as invariantes?
4. o que deve ser referenciado externamente?

### Para escolher comunicação síncrona ou assíncrona

- se a resposta é necessária para decidir agora, use síncrona;
- se é uma consequência que pode ocorrer depois, use assíncrona;
- considere disponibilidade, consistência, atraso, duplicidade e reconciliação.

### Para escolher arquitetura

Não escolha pela moda. Avalie:

- tamanho e maturidade da equipe;
- volume e necessidade de escala;
- autonomia dos módulos;
- necessidade de deploy independente;
- tolerância a consistência eventual;
- custo operacional;
- estabilidade dos contratos;
- evidências reais do problema.

## 15. Diferenças que costumam cair na prova

| Conceitos | Diferença principal |
|---|---|
| Entidade x objeto de valor | Entidade tem identidade; objeto de valor é definido pelos atributos. |
| Regra x invariante | Regra orienta o comportamento; invariante deve permanecer verdadeira. |
| Comando x evento | Comando solicita ação; evento informa algo que já aconteceu. |
| Domínio x aplicação | Domínio decide; aplicação coordena. |
| Persistência x domínio | Persistência armazena; domínio protege o significado e as regras. |
| Módulo x Bounded Context | Módulo é uma divisão estrutural; contexto é uma fronteira semântica. |
| Bounded Context x microsserviço | Contexto é conceitual; microsserviço é uma decisão de implantação. |
| Síncrono x assíncrono | Síncrono exige resposta imediata; assíncrono permite processamento posterior. |
| Agregado x tabela | Agregado é uma fronteira de consistência; tabela é uma estrutura de armazenamento. |
| Caso de uso x tela | Caso de uso representa comportamento; tela é apenas uma interface possível. |

## 16. Checklist final

- Identifique o domínio e o problema de negócio.
- Liste atores, objetivos e resultados.
- Extraia os conceitos a partir de operações e regras.
- Classifique entidades, objetos de valor e estados.
- Encontre as invariantes e os estados inválidos.
- Modele ciclos de vida e transições permitidas.
- Defina agregados e suas raízes.
- Use eventos para comunicar fatos relevantes.
- Separe apresentação, aplicação, domínio e infraestrutura.
- Avalie coesão e acoplamento.
- Defina Bounded Contexts pelo significado, regras e razões de mudança.
- Escolha comunicação síncrona ou assíncrona conforme a necessidade temporal.
- Registre decisões arquiteturais, alternativas, riscos e critérios de revisão.
- Preserve rastreabilidade e não esconda questões ainda desconhecidas.
