const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const { connectToMongoDb } = require('./connectdb')
const dotenv = require('dotenv')
dotenv.config()
const authRoutes = require('./routes/auth')
const jobRoutes = require('./routes/jdupload')
const userRoutes = require('./routes/user')


const cors = require('cors')
app.use(cors({
    origin: ['https://clickresume.vercel.app', 'http://localhost:5173','http'], // Allow these origins to make requests
    methods: ["POST", "GET", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies and other credentials to be sent
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Allow the token header
}));



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/job", jobRoutes)
app.use("/api/user", userRoutes)


connectToMongoDb();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});