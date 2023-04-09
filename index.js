import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();
const app = express();
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

const { DB_CONNECTION } = process.env;

mongoose.connect(
  DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error('Erro na conexão MongoDB' + error);
    }
  }
);

mongoose.connection.once('open', () => {
  console.log('Conectado ao MongoDB');
  const APP_PORT = process.env.PORT;
  app.listen(APP_PORT, () => {
    console.log('Servidor foi iniciado na porta:' + APP_PORT);
  });
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', accountsRouter);