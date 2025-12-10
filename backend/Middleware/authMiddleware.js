const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
 async function authMiddleware(req, res, next)
{
	 const authHeader = req.headers.authorization
	 // let use Bearer  since it is more better

	if (!authHeader || !authHeader.startsWith('Bearer'))
	{
	return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication invalid"})
	}
	 const token = authHeader.split(' ')[1]
	
	 try  
	 {
		 const { username, userid } = jwt.verify(token, process.env.JWT_SECRET)
		 // return res.status(StatusCodes.OK).json({username,userid})
		 req.user = {username,userid}
		// calling next
        next()
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authentication invalid"})
	}
}
module.exports = authMiddleware