import userModel from "../Schema/userModel.js";

const addCart = async (req, res)=> {

    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:"Added to cart"});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const getCart = async (req, res)=> {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const removeCart = async (req, res)=> {
   let userData =  await userModel.findById({_id:req.body.userId});
   let cartData = await userData.cartData;

   try {
    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1;
   }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true, message:"Removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }

}

export {addCart, getCart, removeCart};