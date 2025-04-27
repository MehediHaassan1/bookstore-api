import express from 'express';
import dotenv from 'dotenv';
import router from './app/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Welcome to your Bookstore API! Everything is working perfectly.',
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
