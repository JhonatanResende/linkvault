# 🔐 LinkVault

Aplicação full-stack para salvar e organizar links pessoais.

## 🛠️ Tecnologias

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Banco de dados:** PostgreSQL + Prisma

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado

### Backend
```bash
cd backend
npm install
# Cria um arquivo .env com sua DATABASE_URL
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Estrutura
```
linkvault/
├── backend/    → API REST
└── frontend/   → Interface React
```