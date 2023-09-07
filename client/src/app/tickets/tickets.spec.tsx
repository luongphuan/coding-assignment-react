import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from '../redux/store';
import Tickets from './tickets';
import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { User } from '@acme/shared-models';
import { ticketSlice } from '../redux/ticketSlice';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockStore = configureStore({
  reducer: { ticket: ticketSlice.reducer }
});

describe('Tickets', () => {
  it('Test render list', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Tickets />
        </Provider>
      </BrowserRouter>
    );
    const title = await screen.findAllByText('Tickets');
    const rows = await screen.findAllByRole('row');
    expect(title[0]).toBeInTheDocument()
    expect(rows.length).toEqual(2)
  });
});
