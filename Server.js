import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './EcomProduct/Database/DatabaseConnection.js';
import { ecom_router } from './EcomProduct/EcomRouter/EcomRouter.js';
import { router } from './EcomProduct/ProjectRouter/Router.js';

dotenv.config();
const frontendUrl = process.env.FRONTND_URL || 'http://localhost:10000'

const app = express();

console.log('adsfdsa', process.env.FRONTND_URL);


app.use(cors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
})
)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('images'));
app.use(express.static('videos'));
app.use(express.static('audio'));
app.use(express.static('files'));
app.use(express.static('documents'));


// Middleware to parse JSON
app.use(express.json());
connectDB()
// Basic route
app.use('/projects', router)
app.use('/products', ecom_router)


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend is running...')
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});