# 07 — Coleção REST Client e Verificação Operacional
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  

---

## 1. Estrutura de Arquivos Criados na Coleção

Seguindo estritamente a convenção de pastas por caso de uso da Seção 4.2.1:

```text
http-rest-client/
└── reservas/
    └── uc13-listar-reservas/
        ├── reservas-controller.http
        └── test-scenarios.http
```

---

## 2. Cenários Documentados

### `reservas-controller.http`:
Requisição principal do ciclo de desenvolvimento para chamada da rota de listagem:
```http
@baseUrl = http://localhost:3200

### Listar todas as reservas (UC13 — esperado: 200 OK com array estruturado)
GET {{baseUrl}}/reservas
Accept: application/json
```

### `test-scenarios.http`:
Matriz de testes funcionais cobrindo os critérios de aceite:
- **Cenário 1 (CA01, CA02):** Listagem padrão de reservas esperando `200 OK` e array de DTOs com dados ordenados.
- **Cenário 2:** Chamada a rota inexistente (`/reservas-inexistentes`) esperando `404 Not Found`.
