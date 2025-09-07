const express = require("express");
const dbConnect = require('./src/config/db');
const cookieParser = require("cookie-parser");
const authRoutes = require('./src/routes/authRoute');

const app = express();
dbConnect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


console.log("Backend is working");

app.use("/api/auth", authRoutes);

app.use('/admin', (req, res) => {
    res.send('admin hello');
})

app.listen(8080, ()=>{
    console.log("working on port 8080");
})

