import { useParams } from 'react-router-dom';

export const EditBotPage = () => {
  const { id } = useParams();
  return <div>EditBot {id}</div>;
};
