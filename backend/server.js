import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios'; // Import axios for making HTTP requests
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

//const whitelist = ['https://musical-space-barnacle-jgvwjj4gr5j3jg-3000.app.github.dev', 'https://www.swahilipothub.co.ke/blog/acknowledging-and-expressing-emotions-in-casket-of-emotions-a-review',  'http://localhost:3000'];

/*CORS options for whitelisting domains and handling CORS for multiple connections and testing

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};*/

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/hello', (req, res) => {
  res.json('Hello from the backend!');
});

app.get('/api/config/paypal', (req, res) => {
  // Forward the request to the PayPal API
  axios.get('https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true')
    .then(response => {
      res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
    })
    .catch(error => {
      console.error('Error while fetching PayPal config:', error);
      res.status(500).json({ message: 'Error while fetching PayPal config' });
    });
});

// Serve static assets in production

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
