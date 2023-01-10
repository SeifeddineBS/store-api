const express = require("express");
const app = express();
const dotenv = require("dotenv");

//Routes
const userRouter = require("./routes/userRouter");

dotenv.config();

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

//Middlewear
app.use(express.json());

// Route Middlewares
app.use("/api/users", userRouter);
