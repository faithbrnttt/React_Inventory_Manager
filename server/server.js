const express = require('express');
const cors = require('cors');
require('@dotenvx/dotenvx').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());

// Mount routes
app.use('/products', productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Server running"));
