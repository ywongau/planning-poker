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
const ws = { send, recieved };
const id = 'id1';
const Estimate = rewiremock.proxy(
  () => require('./Estimate'),
  () => {
    rewiremock(() => require('react-router-dom')).with({
      useParams: () => ({
        id,
      }),
    });
  }
).default;

const renderComponent = () => render(<Estimate playerName="Bob" ws={ws} />);
const fakeMessage = data =>
  recieved.callArgWith(0, {
    data: JSON.stringify(data),
  });

describe('Estimate', () => {
  afterEach(async () => {
    sinon.resetHistory();
    sinon.resetBehavior();
    await cleanup();
  });

  it('should display a list of users if state message is recieved', async () => {
    renderComponent();

    fakeMessage({
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
    renderComponent();

    fakeMessage({
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
    renderComponent();

    await screen.findByRole('button', { name: '0' });
    await screen.findByRole('button', { name: '0.5' });
    await screen.findByRole('button', { name: '1' });
    await screen.findByRole('button', { name: '2' });
    await screen.findByRole('button', { name: '3' });
    fireEvent.click(await screen.findByRole('button', { name: '5' }));
    sinon.assert.calledWith(send, {
      type: 'estimate',
      id,
      payload: {
        name: 'Bob',
        points: 5,
      },
    });
  });

  it('the estimate points in not given then label is not ready', async () => {
    renderComponent();

    fakeMessage({
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
    renderComponent();

    fireEvent.click(await screen.findByText('Reveal'));
    expect(
      sinon.assert.calledWith(send, {
        type: 'reveal',
        id,
      })
    );
  });

  it('should have a reset button', async () => {
    renderComponent();

    fireEvent.click(await screen.findByText('Reset'));
    expect(
      sinon.assert.calledWith(send, {
        type: 'reset',
        id,
      })
    );
  });
});
