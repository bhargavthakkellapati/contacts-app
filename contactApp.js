const express = require('express')
const mongoose = require('mongoose')
const contacts = require('./contactModel')
const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://jayakrishnanare:BQTFTGmnLY3qWEbv@cluster0.mbdeahy.mongodb.net/')
.then(()=>console.log('db connected')
).catch(err => console.log(err))
//create contact
app.post('/addcontacts/',async(req,res) => {
    const{firstname, surname,company,phone,phoneNumberType,email,isFav}=req.body;

    try {
        const newdata=new contacts({firstname, surname,company,phone,phoneNumberType,email,isFav})
         await newdata.save()
         return res.json(await contacts.find())
    }
    catch(err) {
        console.log(err.message)
    }

   

})
//get contact list
app.get('/getcontacts/',async (req,res)=>{
     try{
        const alldata=await contacts.find()
        return res.json(alldata)
     }
     catch(err){
        console.log(err.message)
     }
})

//get contacts by id
app.get('/getcontact/:id',async (req,res) =>{
  try{
    const getdata=await contacts.findById(req.params.id)
    return res.json(getdata)
  }
  catch(err){
    console.log(err.message)
  }
})
//delete contact by id
app .delete('/deletecontact_:id',async(req,res)=>{
    try {
    const deletedata = await contacts.findByIdAndDelete(req.params.id)
    return res.json(await contacts.find())
    }
    catch(err){
        console.log(err.message)
    }
})
 
//filter contact
 
app.get('/search/', async (req, res) => {
    try {
      const name = req.query.firstname;
      const surname = req.query.surname;
      const phone = req.query.phone;
  
      const data = await contacts.find({firstname:name,surname:surname,phone:Number(phone)})
     return res.json(  data)
  
     
    } catch (err) {
    console.log(err.message)
    
    }
  });


  //get fav list

  app.get('/favlist/',async(req,res)=>{
    try{
   const getfav=await contacts.find({isFav:true})
   return res.json( getfav)
    }
    catch(err){
      console.log(err.message)
    }
  })



  // get the contact and edit by id
  app.put('/editcontact/:id',async(req,res)=>{
    const{firstname,surname,phone,email,phoneNumberType,company,isFav}=req.body
    try{
      const edit=await contacts.findByIdAndUpdate(req.params.id,{firstname,surname,phone,email,phoneNumberType,company,isFav},{new:true});
      return res.json(edit)
    }
    catch(err){
      console.log(err.message)
    }
  })


  //  add a contact to faverote list  

  app.put('/addfav/:id',async(req,res)=>{
     const{isFav}=req.body
     try{
      const add=await contacts.findByIdAndUpdate(req.params.id,{isFav},{new:true})
      return res.json(add)
     }
     catch(err){
      console.log(err.message)
     }
  })

  //sorting contacts

  app.get('/sortcontacts',async(req,res)=>{
    try{
    const sorted=await contacts.find().sort({firstname:1})
    return res.json(sorted)
    }
    catch(err){
      console.log(err.message)
    }
  })


  //cheking the contact is existed or not
  
  app.get('/checkexist/:phone',async(req,res)=>{
try{
  const  existedphone=req.params.phone
  const existed=await contacts.findOne({phone:existedphone})

  if(existed){
    return res.json({exists:true})
  }
  else{
    return res.json({exists:false})
  }

}
catch(err){
  console.log(err.message)
}
  })
    

app.listen(500 , ()=>console.log('server is running'))