import { expect } from 'chai';
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import rewiremock from 'rewiremock/node';

const send = sinon.spy();
const recieved = sinon.spy();
const api = { send, recieved };
const Game = rewiremock.proxy(
  () => require('./Game'),
  () => {
    rewiremock(() => require('./api')).withDefault(api);
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
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'Bob' } });
    fireEvent.click(screen.getByText('Ok'));
    sinon.assert.calledWith(send, { action: 'join', data: 'Bob' });
    expect(screen.queryByLabelText('Username')).to.equal(null);
  });
});
