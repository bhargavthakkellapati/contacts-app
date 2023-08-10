const request = require('supertest');
const express = require('express');
const contactApp= require('./contactApp'); 

const app = express();
app.use(contactApp); 



describe('testing apis should retun status 200', ()=>{
  Test('testing api',async ()=>{
    const contactData = {
      firstname: 'bhargav',
      surname: 'takkellapti',
      company: 'dev2prod',
      phone: '8978311878',
      phoneNumberType: 'Mobile',
      email: 'bhargavtakkellapti@gmail.com',
      isFav: true,
    };

    const response = await request(app)
      .post('/addcontact/')
      .send(contactData);

    
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.response._id).toBeDefined();
    expect(response.body.response).toequal(contactData);
    
  });

  
})