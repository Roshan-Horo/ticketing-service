import request from 'supertest'
import { app } from '../../app'
import { Form } from '../../models/form';

it('has a route handler listening to /api/forms for POST request', async () => {
const response = await request(app)
    .post('/api/forms')
    .send({})

expect(response.status).not.toEqual(404);

});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/forms')
        .send({})
        .expect(401);
});

it('returns a status other thatn 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/forms')
        .send({});
        
    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {

});

it('reutrns an error if an invalid price is provided', async () => {

});

it('creates a form with valid inputs', async () => {
    let form = await Form.find({});

    await request(app)
        .post('/api/forms')
        .send({
            title: 'asdfldjsf',
            userId: "134f",
            questions: ["first_question","second_question"]
        })
        .expect(201);
});