import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { ticketSlice } from '../redux/ticketSlice';
import TicketDetails from './ticket-details';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    ticketId: '1',
  }),
  useRouteMatch: () => ({ url: '/1' }),
}));

const mockStore = configureStore({
  reducer: { ticket: ticketSlice.reducer }
});

describe('TicketDetails', () => {
  it('Test render detail', async () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <TicketDetails />
        </Provider>
      </BrowserRouter >
    );
    const description = await screen.findAllByText('Install a monitor arm');
    expect(description[0]).toBeInTheDocument()
  });
});
