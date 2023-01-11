const express = require("express");
const app = express();
const dotenv = require("dotenv");

//Routes
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const createDatabase = require("./database/createDatabase");

dotenv.config();

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

//Middlewear
app.use(express.json());

// Route Middlewares
app.use("/api/users", userRouter);
app.use("/api", loginRouter);
app.use("/api/purchases", purchaseRouter);

// create database if it doesnt exist
createDatabase();





const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));