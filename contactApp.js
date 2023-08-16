const express = require('express')

const mongoose = require('mongoose')
const contacts = require('./contactModel')
const router=express.Router()
const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://jayakrishnanare:BQTFTGmnLY3qWEbv@cluster0.mbdeahy.mongodb.net/')
// .then(()=>console.log('db connected')
// ).catch(err => console.log(err))
   //create contact                 
app.post('/addcontacts/',async(req,res) => {
    const{firstname, surname,company,phone,phoneNumberType,email,isFav}=req.body;
console.log(req.body)
    try {
        const newdata=new contacts({firstname, surname,company,phone,phoneNumberType,email,isFav})
         const result=await newdata.save()
         
         const status={status :201,
          message:'success',
          response:result
    
        }
        console.log(status)
        return res.json(status) 

        
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json({
          status:500,
          message:"internal server error"
        })
    }

   

})
//get contact list
app.get('/getcontacts/',async (req,res)=>{
     try{
        const alldata=await contacts.find()
         
        const Status={
          status:200,
          message:"success",
          response:alldata
        }
        console.log(Status)
        return res.json(Status)
     }
     catch(err){
        console.log(err.message)
        return res.status(500).json({
          status:500,
          message: "internal sever error"
        })
     }
})

//get contacts by id
app.get('/getcontact/:id',async (req,res) =>{
  try{
    const getdata=await contacts.findById(req.params.id)
    const status={
      status:200,
      message:"success",
      response:getdata
    }
    console.log(status)
    return res.json(status)
  }
  catch(err){
    console.log(err.message)
    return res.status(500).json({
      status :500,
      message:"internal server error"
    })
  }
})
//delete contact by id
app .delete('/deletecontact_:id',async(req,res)=>{
    try {
    const deletedata = await contacts.findByIdAndDelete(req.params.id)
    const status={
      status:404,
      message:"success",
      response:deletedata
    }
    console.log(status)
    return res.json(status)
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
          status:500,
          message:"internal server error"
        })
    }
})
 
//filter contact
 
app.get('/search/', async (req, res) => {
    try {
      const name = req.query.firstname;
      const surname = req.query.surname;
      const phone = req.query.phone;
  
      const data = await contacts.find({firstname:name,surname:surname,phone:Number(phone)})

      const status={
        status:200,
        message:"success",
        response:data
      }
      console.log(status)
     return res.json(status)
  
     
    } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status:500,
      message:"internal server error"
    })
    
    }
  });


  //get fav list

  app.get('/favlist/',async(req,res)=>{
    try{
   const getfav=await contacts.find({isFav:true})
   const status={
    status:200,
    message:"success",
    responce:getfav
   }
   console.log(status)
   return res.json(status)
    }
    catch(err){
      console.log(err.message)
      return res.status(500).json({
        status:500,
        message:"internal server error"

      }
        
      )
    }
  })



  // get the contact and edit by id
  app.put('/editcontact/:id',async(req,res)=>{
    const{firstname,surname,phone,email,phoneNumberType,company,isFav}=req.body
    try{
      const edit=await contacts.findByIdAndUpdate(req.params.id,{firstname,surname,phone,email,phoneNumberType,company,isFav},{new:true});
     
      const status={
        status:200,
        message:"success",
        response:edit
      }
      console.log(status)
      return res.json(status)
    }
    catch(err){
      console.log(err.message)
      return res.status(500).json({
        status:500,
        message:"internal server error"
      })
    }
  })


  //  add a contact to faverote list  

  app.put('/addfav/:id',async(req,res)=>{
     const{isFav}=req.body
     try{
      const add=await contacts.findByIdAndUpdate(req.params.id,{isFav},{new:true})
      const status={
        status:200,
        messsage:"success",
        responce:add
      }
      console.log(status)
      return res.json(status)
     }
     catch(err){
      console.log(err.message)
      return res.status(500).json({
        satus:500,
        message:"internal server error"
      })
     }
  })

  //sorting contacts

  app.get('/sortcontacts',async(req,res)=>{
    try{
    const sorted=await contacts.find().sort({firstname:1})
    const status ={
      status:200,
      message:"success",
      response:sorted
    }
    console.log(status)
    return res.json(status)
    }
    catch(err){
      console.log(err.message)
      return res.status(500).json({
        status:500,
        message:"internal server error"
      })
    }
  })


  //cheking the contact is existed or not
  
  app.get('/checkexist/:phone',async(req,res)=>{
try{
  const  existedphone=req.params.phone
  const existed=await contacts.findOne({phone:existedphone})

  if(existed){
    return res.status(200).json({
      status:200,
      message:"success",
      exists:true})
  }
  else{
    return res.status(404).json({
      status:404,
      message:"not found",
      
      exists:false,})
  }

}
catch(err){
  console.log(err.message)
  return res.status(500).json({
    status:500,
    message:"internal server error"
  })
}
  })
    
// modules.exports=router;
app.listen(500, ()=>console.log('server is running'))

module.exports=app;