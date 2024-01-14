import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Button onClick={handleBackClick}>
        Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
