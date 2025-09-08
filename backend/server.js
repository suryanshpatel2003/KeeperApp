require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
  origin: "https://keeper-app-beryl-sigma.vercel.app" // replace with your frontend URL
}));
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get("/", (req,res)=>{
    res.send("App is Running")
})

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
