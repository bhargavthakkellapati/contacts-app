const request = require('supertest');
const mongoose = require("mongoose");
 const app = require('./contactApp');
//const { response } = require('express');




 describe("GET /getcontacts/", () => {
  test("should return all contacts", async () => {
    const res= await request(app).get("/getcontacts/");
    //console.log(res)
    expect(res.status).toBe(200);
    //expect(res.response.length).toBeGreaterThan(0)

  });
});


describe("GET /getcontact/:id", () => {
  test("should return a contact", async () => {
    const res = await request(app).get(
      "/getcontact/64cd00d25f5cb7f3fdc2e0ad"
    );
   // console.log(res)
    expect(res.status).toBe(200);
    
    //expect(res..firstname).toBe("bhargava");
  });
});




describe("POST /addcontacts", () => {
  test("should create a contact", async () => {

    const contactData = {
      firstname: 'saikrishna',
      surname: 'vutukuru',
      company: 'dev2prod',
      phone: '9000505643',
      phoneNumberType: 'Mobile',
      email: 'bhargavtakkellapti@gmaol.com',
      isFav: false,
    };
    const res = await request(app).post("/addcontacts").send({contactData
    });

    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(res.req.data)

    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    expect(res.status).toBe(200);
  //  // expect(res.req.data.contactData).toMatchObject({

  //     "firstname": contactData.firstname,

  //     "surname": contactData.surname,

  //     "company": contactData.company,

  //     "phone": contactData.phone,

  //     "phoneNumberType": contactData.phoneNumberType,

  //     "email": contactData.email,

  //     "isFav": contactData.isFav


  //   })
  });
});




describe("DELETE /deletecontact_:id", () => {
  test("should delete a contact", async () => {
    const res = await request(app).delete(
      "/deletecontact_/64d5cd6ba9da855176440e61"
    );
    expect(res.status).toBe(404);
  });
});




describe("PUT /editcontact/:id", () => {
  it("should update a contact", async () => {
    const res = await request(app)
      .put("/editcontact/64d5da2912a4fb8c5a559782")
      .send({
        firstname: "bharga",
        phone: 6302855977,
        email: "bhargav@gmail.com"
      });
    expect(res.status).toBe(200);
   // expect(res.body.firstname).toBe(bharga);
  });
});

describe("/favlist/", () => {
  test("should get fav contacts", async () => {
    const res = await request(app).get(
      "/favlist/"
    );
    expect(res.status).toBe(200);
    // expect(res.body.isFav).toBe(true)
  });
});




describe("put /addfav/:id", () => {
  test("should add contacts to fav", async () => {
    const res = await request(app)
    .put("/addfav/64ce2a5669dd593329038156")
      .send({isFav:true
      });
    expect(res.status).toBe(200);
    // expect(res.isFav).toBe(true)
  });
});



describe("GET /sortcontacts", () => {
  test("should get sorted contacts list", async () => {
    const res = await request(app).get(
      "/sortcontacts"
    );
    expect(res.status).toBe(200);
  
  });
});





describe("GET /checkexist/:phone", () => {
  test("should return  contacts exist or not", async () => {
    const res = await request(app).get( "/checkexist/8978311878"
    );
    expect(res.status).toBe(200);
  
  });
});






describe("GET /search/", () => {
  test("should search by firstname,surname,phone", async () => {
    const res = await request(app).get( "/search/?firstname=bhargav&surname=thakkelllapati&phone=8978311878"
    );
    expect(res.status).toBe(200);
  
  });
});


