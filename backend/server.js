const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors({
  origin: "https://wabi-user-management.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const Port = process.env.PORT || 5001;

app.use(express.json())

const dbConnection = require('./Db/db')

app.get('/', (req, res) =>
{
	res.send("server is running")
})

const userRoute = require('./routes/userRoute')
const postRoutes = require('./routes/postRoutes')

 app.use("/api/users",userRoute)

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
