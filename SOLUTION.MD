
## 🔧 Backend Improvements

- ✅ Substituição de `fs.readFileSync` por `fs.promises.readFile` para evitar blocking I/O
- ✅ Criação de utilitários reutilizáveis (`readData`, `writeData`)
- ✅ Validação do payload com `zod` (`ItemSchema`)
- ✅ Tratamento completo de erros (400 para payload inválido ou ID malformado, 404 para item não encontrado)
- ✅ Refatoração do endpoint `/api/stats` para uso de cache e performance otimizada
- ✅ Testes unitários usando Jest + Supertest com mocks para simular dados e cache

## 💻 Frontend Improvements

- ✅ Corrigido o memory leak em `Items.js` com uso de `AbortController`
- ✅ Implementada paginação e busca via `q` e `limit`
- ✅ Virtualização de listas com `react-window`
- ✅ Skeleton de carregamento durante fetch
- ✅ Estilização refinada e acessível

## 🧪 Test Coverage

- ✅ `GET /api/items`
- ✅ `GET /api/items/:id`
- ✅ `POST /api/items`
- ✅ `GET /api/stats` (mocked, com simulação de cache)