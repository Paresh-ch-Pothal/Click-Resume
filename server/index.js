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
    origin: '*',
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
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