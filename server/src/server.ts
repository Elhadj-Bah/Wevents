import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
  }));

const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
