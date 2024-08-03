import jwt from 'jsonwebtoken';


const authMiddleWare = async (req, res, next)=>{

    const {token} = req.headers;

    if(!token){
        return res.json({success:false, message:"Authorizaton failed Login again"})
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = token_decode.id;
        // console.log(req.body.userId);
        next();
    }catch(error){
        console.log(error);
        res.json({sucess:false, message:"Error"});
    }
}

export default authMiddleWare;