const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const TeaService = require('../lib/services/TeaService');
// const { SES } = require('aws-sdk');
// import MockSES from 'aws-sdk/clients/ses';

// jest.mock('aws-sdk', () => () => ({
//   SES: () => ({
//     sendEmail: () => ({
//       promise: ()=>{}
//     })
//   }),
// }));
// jest.mock('aws-sdk', () => {
//   return function () {
//     return {
//       SES: () => ({
//         sendEmail: () => ({
//           promise: () => { }
//         })
//       })
  
//     }
//   }
// })

jest.mock('aws-sdk/clients/ses', () => {
  const mSES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn()
    // then: ()=>{}
  };
  return jest.fn(() => mSES);
});


describe('postgres-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await TeaService.create({
      name: "Rou Gui",
      category: "oolong",
      quantity: 50,
      origin: "Wuyi Fujian China"
    });
    await TeaService.create({
      name: "Rou Gui",
      category: "oolong",
      quantity: 50,
      origin: "Wuyi Fujian China"
    });
    await TeaService.create({
      name: "Rou Gui",
      category: "oolong",
      quantity: 50,
      origin: "Wuyi Fujian China"
    });
  });
  

  it('creates a new tea in our database', async () => {
    const res = await request(app)
      .post('/api/v1/teas')
      .send({
        name: "Rou Gui",
        category: "oolong",
        quantity: 50,
        origin: "Wuyi Fujian China"
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: "Rou Gui",
      category: "oolong",
      quantity: 50,
      origin: "Wuyi Fujian China"
    })
  })
  it('deletes a tea from our database', async () => {
    const res = await request(app)
      .delete('/api/v1/teas/2')

    expect(res.body).toEqual({
      id: expect.any(String),
      name: "Rou Gui",
      category: "oolong",
      quantity: 50,
      origin: "Wuyi Fujian China"
    })
  })
  it('updates a tea from our database', async () => {
    const res = await request(app)
      .put('/api/v1/teas/1')
      .send({quantity: 100})

    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      category: expect.any(String),
      quantity: expect.any(Number),
      origin: expect.any(String)
    })
  })
});


