const express = require("express");
const dbConnect = require('./src/config/db');
const cookieParser = require("cookie-parser");
const authRoutes = require('./src/routes/authRoute');
const schemeRoutes = require('./src/routes/schemeRoute');
const cors = require("cors");

const app = express();
dbConnect();

app.use(
  cors({
    origin: "http://localhost:5173" || "*", // Allows requests from frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Permitted HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Headers for JSON & JWT
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


console.log("Backend is working");

app.use("/api/auth", authRoutes);
app.use("/api/scheme", schemeRoutes);

app.use('/admin', (req, res) => {
    res.send('admin hello');
})

app.listen(8080, ()=>{
    console.log("working on port 8080");
})

