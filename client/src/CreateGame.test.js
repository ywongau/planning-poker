import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import rewiremock from 'rewiremock/node';
const create = sinon.stub();
const navigate = sinon.stub();
const api = {
  create,
};

const useNavigate = () => navigate;

const CreateGame = rewiremock.proxy(
  () => require('./CreateGame'),
  () => {
    rewiremock(() => require('./api')).withDefault(api);
    rewiremock(() => require('react-router-dom')).with({ useNavigate });
  }
).default;

describe('app', () => {
  afterEach(async () => {
    sinon.resetHistory();
    sinon.resetBehavior();
    await cleanup();
  });

  it(`should show create game screen`, async () => {
    const id = '12345';
    create.resolves({ id });
    render(<CreateGame />);
    fireEvent.change(screen.getByLabelText(`Game's name`), { target: { value: 'Sprint 1' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => undefined);
    sinon.assert.calledWith(create, 'Sprint 1');
    await waitFor(() => undefined);
    sinon.assert.calledWith(navigate, '/game/' + id);
  });
});
