# 🔐 LinkVault

Aplicação full-stack para salvar e organizar links pessoais com 
sistema de categorias, tags e favoritos.

![GitHub repo size](https://img.shields.io/github/repo-size/JhonatanResende/linkvault)
![GitHub last commit](https://img.shields.io/github/last-commit/JhonatanResende/linkvault)

## ✨ Funcionalidades

- Salvar links com título, URL e descrição
- Organização por categorias com cores personalizadas
- Sistema de tags para classificação detalhada
- Filtro por categoria, busca por texto e favoritos
- Marcar e desmarcar links como favoritos
- Notificações visuais de feedback (Toast)

## 🛠️ Tecnologias

- **Frontend:** React + TypeScript + Vite + React Router + React Hook Form
- **Backend:** Node.js + Express + TypeScript
- **Banco de dados:** PostgreSQL + Prisma ORM

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando

### Backend

```bash
cd backend
npm install
```

Cria um arquivo `.env` dentro da pasta `backend` com o conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/linkvault?schema=public"
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 📁 Estrutura
```
linkvault/
├── backend/
│ ├── prisma/ → Schema e migrations do banco
│ └── src/
│ ├── controllers/ → Lógica de cada rota
│ ├── routes/ → Definição dos endpoints
│ └── lib/ → Configuração do Prisma
│
└── frontend/
└── src/
├── components/ → Componentes reutilizáveis
├── pages/ → Telas da aplicação
├── services/ → Comunicação com a API
├── hooks/ → Hooks customizados
└── types/ → Tipagens TypeScript
```
## 📄 Licença

MIT License — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
