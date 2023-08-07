const mongoose = require('mongoose');
const contacts=mongoose.Schema({
     firstname:{
        type :String,
        
    },

    surname: {
        type :String,
    
    },
    
    company: {
         type : String,
        

    }, 
     phone : {
        type : Number,
       
        minlength:10,
        maxlength:10

        
     },
     phoneNumberType:{
        type:String,
        enum:["Mobile", "Work", "Home", "Main", "Custom", "Other"]
            
        
     },

     email:{
        type:String
     },   
     isFav:{
        type:Boolean,
        default:false
     } 
        
    
})

module.exports = mongoose.model( 'contacts',contacts)