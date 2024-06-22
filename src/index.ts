import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Configura CORS per consentire richieste dal dominio del client Angular
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // Alcuni browser (Safari) hanno problemi con 204
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware per parseare il body delle richieste JSON

app.post('/auth/login', (req: Request, res: Response) => {
  // Logica di autenticazione
  res.send('Login endpoint');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;