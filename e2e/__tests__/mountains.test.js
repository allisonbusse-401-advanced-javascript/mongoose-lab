const request = require('../request');
const db = require('../db');

describe('mountains api', () => {
  beforeEach(() => {
    return db.dropCollection('mountains');
  });

  const mountainExample = 
    {
      name: 'mount hood',
      elevation: 11250,
      range: ['cascades'],
      ascent: {
        firstAscent: 1857,
        easiestRoute: 'rock and glacier climb'
      },
      tallest: false
    };

  function postMountain(mountain) {
    return request
      .post('/api/mountains')
      .send(mountain)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a mountain', () => {
    return postMountain(mountainExample)
      .then(mountain => {
        expect(mountain).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...mountainExample
        });
      });
  });

  it('gets all mountains', () => {
    return Promise.all([
      postMountain(mountainExample),
      postMountain(mountainExample),
      postMountain(mountainExample)
    ])
      .then(() => {
        return request
          .get('/api/mountains')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('gets a mountain by id', () => {
    return postMountain(mountainExample)
      .then(mountain => {
        return request
          .get(`/api/mountains/${mountain._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(mountain);
          });
      });
  });

  it('updates a mountain by id', () => {
    return postMountain(mountainExample)
      .then(mountain => {
        mountain.tallest = true;
        return request
          .put(`/api/mountains/${mountain._id}`)
          .send(mountain)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.tallest).toBe(true);
      });
  });

  it('deletes a mountain', () => {
    return postMountain(mountainExample)
      .then(mountain => {
        return request 
          .delete(`/api/mountains/${mountain._id}`)
          .expect(200);
      })
      .then(() => {
        return request
          .get('/api/mountains')
          .expect(200)
          .then(({ body }) => {
            expect(body.length).toEqual(0);
          });
      });
  });
});