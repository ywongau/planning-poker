import reducer from './reducer';
import { expect } from 'chai';

describe('reducer', () => {
  it('should return state if action type is not recognized', () => {
    const whatever = { foo: 'bar' };
    expect(reducer(whatever, {})).to.deep.equal(whatever);
  });

  it('should add player to the list on join', () => {
    expect(
      reducer(
        {
          id: '1234',
          name: 'sprint 1',
          players: [{ name: 'Bob' }],
        },
        { type: 'join', payload: 'Fred' }
      )
    ).to.deep.equal({
      id: '1234',
      name: 'sprint 1',
      players: [{ name: 'Bob' }, { name: 'Fred' }],
    });
  });

  it('should set points on estimate', () => {
    expect(
      reducer(
        {
          id: '1234',
          name: 'sprint 1',
          players: [{ name: 'Bob' }, { name: 'Fred' }],
        },
        { type: 'estimate', payload: { name: 'Fred', points: 5 } }
      )
    ).to.deep.equal({
      id: '1234',
      name: 'sprint 1',
      players: [{ name: 'Bob' }, { name: 'Fred', points: 5 }],
    });
  });

  it('should set revealed to true on reveal', () => {
    expect(
      reducer(
        {
          id: '1234',
          name: 'sprint 1',
          players: [{ name: 'Bob' }, { name: 'Fred' }],
        },
        { type: 'reveal' }
      )
    ).to.deep.equal({
      id: '1234',
      name: 'sprint 1',
      revealed: true,
      players: [{ name: 'Bob' }, { name: 'Fred' }],
    });
  });

  it(`should set revealed to false and remove players' points on reset`, () => {
    expect(
      reducer(
        {
          id: '1234',
          name: 'sprint 1',
          revealed: true,
          players: [
            { name: 'Bob', points: 5 },
            { name: 'Fred', points: 5 },
          ],
        },
        { type: 'reset' }
      )
    ).to.deep.equal({
      id: '1234',
      name: 'sprint 1',
      revealed: false,
      players: [{ name: 'Bob' }, { name: 'Fred' }],
    });
  });

  it('should remove player from the list on leave', () => {
    expect(
      reducer(
        {
          id: '1234',
          name: 'sprint 1',
          players: [{ name: 'Bob', points: 5 }, { name: 'Fred' }],
        },
        { type: 'leave', payload: 'Bob' }
      )
    ).to.deep.equal({
      id: '1234',
      name: 'sprint 1',
      players: [{ name: 'Fred' }],
    });
  });
});
