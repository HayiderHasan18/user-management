const mysql2 = require('mysql2')
const dbConnection = mysql2.createPool({
	user: process.env.USER,
	host: "localhost",
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	connectionLimit: 10

})
console.log(process.env.JWT_SECRET)
// dbConnection.execute(" select 'select' ",(err, result)=> {
// 	if (err)
// 	{
// 		console.log(err.message)
// 	} else
// 	{
// 		console.log(result)
// 	}
// })
module.exports = dbConnection.promise()