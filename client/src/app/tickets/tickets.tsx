import { Ticket } from '@acme/shared-models';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ticketServices, userServices } from 'client/src/services';
import { useEffect, useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { TicketStatus } from '../components/common';
import { setUsers } from '../redux/ticketSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export function Tickets() {

  const [tickets, setTickets] = useState([] as Ticket[]);
  const [loading, setLoading] = useState(false);
  const users = useAppSelector(state => state.ticket.users);
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLoading(true)
    try {
      async function fetchTickets() {
        const data = await ticketServices.getTicketsAPI();
        setTickets(data);
        const users = await userServices.getUsersAPI();
        dispatch(setUsers(users))
      }
      fetchTickets();
    } catch (error) {
      // handle error here
    } finally {
      setLoading(false)
    }
  }, []);

  const columns: ColumnsType<Ticket> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (status) => <TicketStatus status={status} />
    },
    {
      title: 'Owner',
      dataIndex: 'assigneeId',
      key: 'assigneeId',
      render: (assigneeId) => users.find(item => item.id === assigneeId)?.name || ''
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: Ticket) => (
        <Link to={`/${record.id}`}>Edit</Link>
      ),
    },
  ];

  return (
    <div className='tickets'>
      <h2>Tickets</h2>
      <Table rowKey='id' dataSource={tickets} columns={columns} loading={loading} />
    </div>
  );
}

export default Tickets;
