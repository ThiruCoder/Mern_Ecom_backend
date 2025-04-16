import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './EcomProduct/Database/DatabaseConnection.js';
import { ecom_router } from './EcomProduct/EcomRouter/EcomRouter.js';
import { router } from './EcomProduct/ProjectRouter/Router.js';

dotenv.config();

const app = express();


const allowedOrigins = [
    'http://localhost:10000', // your local frontend
    'https://mern-ecommerce-tu85.onrender.com' // deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // if using cookies or authentication
}));
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