const Mountain = require('../mountains');
const mongoose = require('mongoose');

describe('Mountain model', () => {
  it('valid model all properties', () => {
    const data = {
      name: 'mount hood',
      elevation: 11250,
      range: ['cascades'],
      ascent: {
        firstAscent: 1857,
        easiestRoute: 'rock and glacier climb'
      },
      tallest: false,
      eruptions: ['mid-1800s', '200 years ago', '1,500 years ago']

    };

    const mountain = new Mountain(data);
    const errors = mountain.validateSync();
    expect(errors).toBeUndefined();

    const json = mountain.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const mountain = new Mountain(data);
    const { errors } = mountain.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.elevation.kind).toBe('required');
    expect(errors['ascent.firstAscent'].kind).toBe('required');
    expect(errors['ascent.easiestRoute'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'mount hood',
      elevation: 11250,
      range: ['cascades'],
      ascent: {
        firstAscent: 1857,
        easiestRoute: 'rock and glacier climb'
      }
    };
    const mountain = new Mountain(data);
    const err = mountain.validateSync();
    expect(err).toBeUndefined();
    expect(mountain.tallest).toBe(false);
  });

  it('enforces max of 15000 feet elevation', () => {
    const data = {
      elevation: 20000
    };
    const mountain = new Mountain(data);
    const { errors } = mountain.validateSync();
    expect(errors.elevation.kind).toBe('max');
  });

  it('enforces enum on range', () => {
    const data = {
      range: ['andes']
    };
    const mountain = new Mountain(data);
    const { errors } = mountain.validateSync();
    expect(errors['range.0'].kind).toBe('enum');
  });

});