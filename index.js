const express = require('express');
const bodyParser = require('body-parser');
const walletRouter = require('./routes/wallet');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount router
app.use('/api/v1', walletRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));