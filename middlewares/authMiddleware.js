const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try{
        const token = req.headers["authorization"].split(" ")[1];
        const JWT_SECRET ="DATA"
        JWT.verify(token,JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message:'UN-Authorirized User'
                })
            }
            else{
                req.body.id = decode.id;
                next()
            }
        })

    }

    catch(error){
        console.log(error);
        res.status(500).send({
            success:true,
            message:"Token is not provided in Authorization header",
            error
        })
    }
}