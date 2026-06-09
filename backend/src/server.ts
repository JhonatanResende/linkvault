import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import linkRoutes from './routes/linkRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// ===== ROTAS =====
// Tudo que começar com /links vai pro linkRoutes
app.use('/links', linkRoutes);
// Tudo que começar com /categories vai pro categoryRoutes
app.use('/categories', categoryRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor do LinkVault rodando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});