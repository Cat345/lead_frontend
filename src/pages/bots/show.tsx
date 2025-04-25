import { useList } from '@refinedev/core';
import { useParams } from 'react-router-dom';

export default function ShowBotPage() {
  const { id } = useParams();

  const logsRequest = useList({
    resource: `bots/logs/${id}/combined`,
  });

  if (logsRequest.isLoading) {
    return <div>Loading...</div>;
  }
  if (logsRequest.error) {
    return <div>Error: {logsRequest.error.message}</div>;
  }

  return (
    <div>
      {logsRequest.data?.message.split('\n').map((log: string) => (
        <div>{log}</div>
      ))}
    </div>
  );
}
