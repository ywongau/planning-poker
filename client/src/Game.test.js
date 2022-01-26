import { assert, expect } from 'chai';
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import rewiremock from 'rewiremock/node';

const send = sinon.spy();
const recieved = sinon.spy();
const api = { send, recieved };
const gameId = 'abcd';
const useParams = () => ({ id: gameId });
const toCanvas = sinon.spy();
const Game = rewiremock.proxy(
  () => require('./Game'),
  () => {
    rewiremock(() => require('qrcode')).withDefault({ toCanvas });
    rewiremock(() => require('./ws')).withDefault(() => api);
    rewiremock(() => require('react-router-dom')).with({ useParams });
  }
).default;

describe('game', () => {
  afterEach(async () => {
    sinon.resetHistory();
    sinon.resetBehavior();
    await cleanup();
  });

  it(`should ask user to enter username`, async () => {
    render(<Game />);
    sinon.assert.calledWith(toCanvas, document.querySelector('canvas'), window.location.href);
    fireEvent.change(screen.getByLabelText(`Player's name`), { target: { value: 'Bob' } });
    fireEvent.click(screen.getByText('Join'));
    await waitFor(() => undefined);
    sinon.assert.calledWith(send, { type: 'join', payload: 'Bob', id: gameId });
    expect(screen.queryByLabelText(`Player's name`)).to.equal(null);
  });
});
