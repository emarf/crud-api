import http, { IncomingMessage, ServerResponse } from "node:http";
import request from 'supertest';
import router from "../routes/router";

const mockedUserData = {
  username: 'emarf',
  age: 27,
  hobbies: ['hiking', 'reading'],
};

const createTestServer = () => {
  return http.createServer((req: IncomingMessage, res: ServerResponse) => {
    router(req, res);
  });
};


describe('Users API', () => {
  let server: http.Server;
  beforeEach(() => {
    server = createTestServer();
  });

  it('should get all users', async () => {
    const response = await request(server).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(mockedUserData);
  });

  it('should get a user by id', async () => {
    const createResponse = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(createResponse.statusCode).toBe(201);
    const getResponse = await request(server)
      .get(`/api/users/${createResponse.body.id}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toEqual(createResponse.body);
  });

  it('should update a user', async () => {
    const createResponse = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(createResponse.statusCode).toBe(201);
    const updateResponse = await request(server)
      .put(`/api/users/${createResponse.body.id}`)
      .send({ age: 28 })
      .set('Content-Type', 'application/json');

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toMatchObject({ ...mockedUserData, age: 28 });
  });

  it('should delete a user', async () => {
    const createResponse = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(createResponse.statusCode).toBe(201);
    const deleteResponse = await request(server)
      .delete(`/api/users/${createResponse.body.id}`);

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('should handle wrong endpoint', async () => {
    const response = await request(server)
      .post('/api/users/invalid-id');

    expect(response.statusCode).toBe(404);
  });

  it('should handle POST request with empty body', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({});

    expect(response.statusCode).toBe(400);
  });

  it('should handle POST request with wrong age field', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ ...mockedUserData, age: 'invalid-age' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ message: 'Age field must be a number' });
  });

  it('should handle POST request with wrong hobbies field', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ ...mockedUserData, hobbies: 'invalid-hobbies' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ message: 'Hobbies field must be an array of strings' });
  });


  it('should handle PUT request with invalid id', async () => {
    const createResponse = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(createResponse.statusCode).toBe(201);

    const putResponse = await request(server)
      .put('/api/users/invalid-id')
      .send({ age: 40 })
      .set('Content-Type', 'application/json');

    expect(putResponse.statusCode).toBe(400);
    expect(putResponse.body).toEqual({ message: 'Invalid user ID' });
  });

  it('should handle PUT request with non exist id', async () => {
    const notExistingId = 'fbff7d76-9c08-41ec-91c6-2a200eede90d';
    const createResponse = await request(server)
      .post('/api/users')
      .send(mockedUserData)
      .set('Content-Type', 'application/json');

    expect(createResponse.statusCode).toBe(201);

    const putResponse = await request(server)
      .put(`/api/users/${notExistingId}`)
      .send({ age: 40 })
      .set('Content-Type', 'application/json');

    expect(putResponse.statusCode).toBe(404);
    expect(putResponse.body).toEqual({ message: 'User not found' });
  });

  it('should handle DELETE request with invalid id', async () => {
    const deleteResponse = await request(server)
      .delete('/api/users/invalid-id'); 

    expect(deleteResponse.statusCode).toBe(400);
    expect(deleteResponse.body).toEqual({ message: 'Invalid user ID' });  
  });

  afterAll(() => {
    server.close();
  });
});