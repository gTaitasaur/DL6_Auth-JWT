import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/usuarios', userRoutes);
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});