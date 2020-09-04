const supertest = require("supertest");
const app = require("../src/index");

describe('POST /user/register', function() {
  it('responds with json', async () => {
    request(app)
      .post('/user/register')
      .send({ "name": "testete",
            "email": "testeaa@gmail.com",
            "password": "123123123" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return err;
      });
  });
});