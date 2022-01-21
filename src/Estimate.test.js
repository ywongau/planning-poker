import { expect } from 'chai';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  queryByText,
  findByText,
  findByLabelText,
} from '@testing-library/react';
import sinon from 'sinon';
import rewiremock from 'rewiremock/node';

const send = sinon.spy();
const recieved = sinon.spy();
const api = { send, recieved };
const id = 'id1';
const Estimate = rewiremock.proxy(
  () => require('./Estimate'),
  () => {
    rewiremock(() => require('./api')).withDefault(api);
    rewiremock(() => require('react-router-dom')).with({
      useParams: () => ({
        id,
      }),
    });
  }
).default;

describe('Estimate', () => {
  afterEach(async () => {
    sinon.resetHistory();
    sinon.resetBehavior();
    await cleanup();
  });

  it('should display a list of users if state message is recieved', async () => {
    render(<Estimate player="Bob" />);

    recieved.callArgWith(0, {
      name: 'Sprint 1',
      revealed: true,
      players: [
        {
          name: 'Bob',
          points: 5,
        },
        {
          name: 'Alice',
          points: 3,
        },
      ],
    });
    await screen.findByText('Sprint 1');
    const results = await screen.findByRole('region', { name: 'Results' });
    await findByText(results, 'Bob');
    await findByText(results, 'Alice');
    await findByText(results, '5');
    await findByText(results, '3');
  });

  it('should NOT display points if revealed is false', async () => {
    render(<Estimate player="Bob" />);

    recieved.callArgWith(0, {
      name: 'Sprint 1',
      revealed: false,
      players: [
        {
          name: 'Bob',
          points: 5,
        },
        {
          name: 'Alice',
          points: 3,
        },
      ],
    });
    await screen.findByText('Sprint 1');
    const results = await screen.findByRole('region', { name: 'Results' });
    await findByText(results, 'Bob');
    expect(queryByText(results, '5')).to.equal(null);
    await findByLabelText(results, 'Alice is ready');
  });

  it('should show the points to the user', async () => {
    render(<Estimate player="Bob" />);
    await screen.findByRole('button', { name: '0' });
    await screen.findByRole('button', { name: '0.5' });
    await screen.findByRole('button', { name: '1' });
    await screen.findByRole('button', { name: '2' });
    await screen.findByRole('button', { name: '3' });
    fireEvent.click(await screen.findByRole('button', { name: '5' }));
    sinon.assert.calledWith(send, {
      action: 'estimate',
      id,
      data: {
        name: 'Bob',
        points: 5,
      },
    });
  });

  it('the estimate points in not given then label is not ready', async () => {
    render(<Estimate player="Bob" />);
    recieved.callArgWith(0, {
      name: 'Sprint 1',
      revealed: false,
      players: [
        {
          name: 'Bob',
          points: undefined,
        },
        {
          name: 'Alice',
          points: 3,
        },
      ],
    });
    await screen.findByText('Sprint 1');
    const results = await screen.findByRole('region', { name: 'Results' });
    await findByText(results, 'Bob');
    expect(queryByText(results, '5')).to.equal(null);
    await findByLabelText(results, 'Bob is not ready');
  });

  it('should have a reveal button', async () => {
    render(<Estimate player="Bob" />);
    fireEvent.click(await screen.findByText('Reveal'));
    expect(
      sinon.assert.calledWith(send, {
        action: 'reveal',
        id,
      })
    );
  });
});
