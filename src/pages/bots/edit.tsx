import { useParams } from 'react-router-dom';

export const EditBot = () => {
  const { id } = useParams();
  return <div>EditBot {id}</div>;
};
