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
    const{firstname, surname,company,phone,phoneNumberType,email}=req.body;

    try {
        const newdata=new contacts({firstname, surname,company,phone,phoneNumberType,email})
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
      const name = req.query.name;
      const surname = req.query.surname;
      const phone = req.query.phone;
  
    
      const query = {
        $and: [
          name ? { name } : {},
          surname ? { surname } : {},
          phone ? { phone } : {},
        ],
      }
    
      const data = await contacts.find(req.params.firstname,surname,phone)
     return req.json(data)
  
     
    } catch (err) {
    console.log(err.message)
    
    }
  });


  //get fav list

  app.get()

  
    

app.listen(500 , ()=>console.log('server is running'))