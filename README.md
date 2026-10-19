# 🔐 LinkVault

Aplicação full-stack para salvar e organizar links pessoais com 
sistema de categorias, tags e favoritos.

![GitHub repo size](https://img.shields.io/github/repo-size/JhonatanResende/linkvault)
![GitHub last commit](https://img.shields.io/github/last-commit/JhonatanResende/linkvault)

## 🌐 Demo

🔗 [Acesse o LinkVault aqui](https://linkvault-gold-phi.vercel.app)

## ✨ Funcionalidades

- Salvar links com título, URL e descrição
- Organização por categorias com cores personalizadas
- Sistema de tags para classificação detalhada
- Filtro por categoria, busca por texto e favoritos
- Marcar e desmarcar links como favoritos
- Notificações visuais de feedback (Toast)

## 🛠️ Tecnologias

- **Frontend:** React + TypeScript + Vite + React Router + React Hook Form
- **Backend:** Python + Django + Django REST Framework
- **Banco de dados:** PostgreSQL

## ☁️ Deploy

- **Frontend:** Vercel
- **Backend:** Render
- **Banco de dados:** Neon

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js instalado
- Python 3.11+ instalado
- PostgreSQL instalado e rodando

### Backend (Django)

```bash
cd backend-django
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

Cria um arquivo `.env` dentro da pasta `backend-django/` com o conteúdo:

```env
DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/linkvault
SECRET_KEY=django-insecure-sua-chave-aqui
DEBUG=True
```

Agora rode as migrations e inicie o servidor:

```bash
python manage.py migrate
python manage.py runserver
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
├── backend-django/
│ ├── core/ → Configurações do projeto
│ ├── links/
│ │ ├── models.py → Tabelas do banco
│ │ ├── serializers.py → Conversão de dados
│ │ ├── views.py → Lógica da API
│ │ └── urls.py → Rotas
│ ├── manage.py
│ └── requirements.txt
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
