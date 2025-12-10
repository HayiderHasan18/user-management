const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
// Allow React frontend to access backend
app.use(cors({
  origin: "http://localhost:5173", // React app origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const Port = process.env.PORT || 5001;
// json middle ware
app.use(express.json())
// db  connection
const dbConnection = require('./Db/db')

app.get('/', (req, res) =>
{
	res.send("server is running")
})


// user routes middleware file
const userRoute = require('./routes/userRoute')
const postRoutes = require('./routes/postRoutes')


// user rotes middleware  extract json data
 app.use("/api/users",userRoute)
// posts routes middleware
app.use("/api/posts",postRoutes)


async function start()
{
try
{
	const result = await dbConnection.execute(" select 'select' ")
	await app.listen(Port,)
	console.log('databse base connection established')
	console.log(` listenig to Port ${Port}`)
} catch(err)
{
console.log(err.message)	
}	
}
start()
