# Artefato 10-03: Contexto de Build, .dockerignore e Imagem Docker
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Conteúdo do `.dockerignore`

Criado o arquivo `.dockerignore` para impedir o envio de arquivos privados, temporários ou desnecessários ao daemon Docker durante o contexto de build:

```text
node_modules
dist
coverage
.git
.gitignore
.env
.env.local
.env.*.local
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
.idea
.vscode
.gemini
tmp
scratch
```

---

## 2. Garantias de Segurança e Desempenho

* **Proteção de Segredos:** Arquivos `.env` e credenciais locais são excluídos do contexto, impedindo vazamento de senhas em camadas de imagem.
* **Isolamento de Compilação:** As pastas locais `node_modules` e `dist` são ignoradas; o build dentro do contêiner é puramente reprodutível a partir do `package.json` e `pnpm-lock.yaml`.
* **Desempenho de Transferência:** Redução drástica do contexto de build transferido para o Docker, acelerando o tempo de construção da imagem.

---

## 3. Identificação da Imagem

* **Nome da Imagem:** `mycondo-api:dev`
* **Tag:** `dev`
* **Contexto de Construção:** Raiz do repositório (`.`)
* **Comando Padronizado:** `docker build -t mycondo-api:dev .`
