# Artefato 10-02: Dockerfile Multi-Stage e Compilação
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Implementação do Dockerfile Multi-Stage

Criado o arquivo `Dockerfile` na raiz do projeto com divisão estrita entre os estágios de compilação (`build`) e de execução (`runtime`), reduzindo o tamanho final da imagem e eliminando ferramentas de build do ambiente de produção:

```dockerfile
ARG NODE_VERSION=24.21.0

FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app
RUN npm install -g pnpm@12.14.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:${NODE_VERSION}-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3200
RUN npm install -g pnpm@12.14.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/dist ./dist
EXPOSE 3200
CMD ["node", "dist/main.js"]
```

---

## 2. Decisões Técnicas de Engenharia

1. **Imagem Base:** `node:24.21.0-bookworm-slim` — garante compatibilidade binária exata com a versão de desenvolvimento local do Node.js v24.21.0.
2. **Gerenciador pnpm:** `pnpm@12.14.0` instalado globalmente em ambos os estágios, utilizando o `pnpm-lock.yaml` versionado.
3. **Instalação com `--frozen-lockfile`:** Assegura que nenhuma dependência sofrerá atualização não autorizada ou variação de versão no momento do build.
4. **Isolamento de Produção:** O estágio `runtime` executa `pnpm install --prod --frozen-lockfile`, instalando apenas as dependências declaradas em `dependencies`, excluindo ferramentas de teste e linters do contêiner final.
5. **Entry Point Compilado:** `dist/main.js`, correspondente à saída padrão do `nest build`.
6. **Mapeamento de Migrations:** A pasta `dist/database/migrations/` e o arquivo `dist/database/data-source.js` são copiados para o runtime, viabilizando a execução de migrations em produção.
