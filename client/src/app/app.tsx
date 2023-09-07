import { Route, Routes } from 'react-router-dom';

import TicketDetails from './ticket-details/ticket-details';
import Tickets from './tickets/tickets';

const App = () => {
  return (
    <div className='bg-red'>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:ticketId" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
