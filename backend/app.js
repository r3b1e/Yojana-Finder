const express = require("express");
const dbConnect = require('./src/config/db');
const cookieParser = require("cookie-parser");
const authRoutes = require('./src/routes/authRoute');
const schemeRoutes = require('./src/routes/schemeRoute');
const cors = require("cors");

const app = express();
dbConnect();

const allowedOrigins = [
  "http://localhost:5173",
  "https://yojana-finder-rho.vercel.app", // Replace with your deployed URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like curl or Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

