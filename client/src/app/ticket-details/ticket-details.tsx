import { Ticket, User } from '@acme/shared-models';
import { Select, Spin, Button } from 'antd';
import { ticketServices, userServices } from 'client/src/services';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss'
import { STATUS } from 'client/src/ultils/constants';
import { useAppSelector } from '../redux/hooks';

export function TicketDetails() {
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [loading, setLoading] = useState<boolean>(false);
  const [changingStatus, setChangingStatus] = useState<boolean>(false);
  const [changingUser, setChangingUser] = useState<boolean>(false);
  const { ticketId } = useParams();
  const users = useAppSelector(state => state.ticket.users);

  const fetchTicketDetail = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await ticketServices.getTicketDetailAPI(Number(ticketId));
      setTicket(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const changeTicketStatus = async (status: STATUS): Promise<void> => {
    setChangingStatus(true);
    try {
      switch (status) {
        case STATUS.COMPLETED:
          await ticketServices.completeTicketAPI(Number(ticketId));
          setTicket({ ...ticket, completed: false })
          break;
        case STATUS.INCOMPLETE:
          await ticketServices.incompleteTicketAPI(Number(ticketId));
          setTicket({ ...ticket, completed: true })
          break;
      }
    } catch (error) {
    } finally {
      setChangingStatus(false);
    }
  }

  const assignTicket = async (userId: number): Promise<void> => {
    setChangingUser(true);
    try {
      await ticketServices.assignToUserAPI(Number(ticket.id), Number(userId));
      setTicket({ ...ticket, assigneeId: userId })
    } catch (error) {
    } finally {
      setChangingUser(false);
    }
  }

  const unassignTicket = async (): Promise<void> => {
    setChangingUser(true);
    try {
      await ticketServices.unassignToUserAPI(Number(ticket.id));
      setTicket({ ...ticket, assigneeId: null })
    } catch (error) {
    } finally {
      setChangingUser(false);
    }
  }

  const handleChange = (value: STATUS) => {
    changeTicketStatus(value);
  }

  const handleChangeUser = (user: number | null) => {
    if (!user) {
      unassignTicket()
    } else {
      assignTicket(user)
    }
  }

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetail();
    }
  }, [ticketId]);

  return (
    <div className='ticket-details'>
      <h2>Ticket Detail</h2>
      <Link to='/'>
        <Button> Back to ticket list</Button>
      </Link>
      <Spin spinning={loading} >
        <div>
          <p>Description</p>
          <p>{ticket.description}</p>
        </div>

        <div>
          <p>Status:</p>
          <Select
            value={ticket.completed ? STATUS.COMPLETED : STATUS.INCOMPLETE}
            style={{ width: 120 }}
            onChange={handleChange}
            loading={changingStatus}
            options={[
              { value: STATUS.INCOMPLETE, label: STATUS.INCOMPLETE },
              { value: STATUS.COMPLETED, label: STATUS.COMPLETED },
            ]}
          />
        </div>

        <div>
          <p>Owner:</p>
          {ticket && <Select
            allowClear
            value={ticket.assigneeId || null}
            style={{ width: 120 }}
            onChange={handleChangeUser}
            loading={changingUser}
            options={users.map(item => { return { value: Number(item.id), label: item.name } })}
          />}
        </div>
      </Spin>
    </div>
  );
}

export default TicketDetails;
