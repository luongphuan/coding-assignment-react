import { Tag } from 'antd';
import { STATUS } from 'client/src/ultils/constants';

export interface ITicketStatusProps {
  status: boolean
}

export function TicketStatus({ status }: ITicketStatusProps) {

  return (
    <>
      {status ? <Tag color='green' >
        {STATUS.COMPLETED}
      </Tag> : <Tag color='volcano' >
        {STATUS.INCOMPLETE}

      </Tag>}
    </>
  );
}

export default TicketStatus;
