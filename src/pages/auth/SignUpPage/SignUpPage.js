import { useState } from 'react';
import Content from '../../../components/layout/Content';
import Button from '../../../components/shared/Button';
import { createAuth } from '../service';
import { useNavigate } from 'react-router';
import Toast from '../../../components/shared/Toast';
import './SignUpPage.css';

function SignUpPage() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
  });

  const [isFetching, setIsFetching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);

      const response = await createAuth(userData);

      console.log('Signup successful:', response);

      navigate('/login');
    } catch (error) {
      setIsFetching(false);
      console.error('Error during signup:', error);
      setToastMessage("An error occurred during signup. Please try again later.");
      setShowToast(true);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const { email, password, username, name } = userData;

  const buttonDisabled = !(email && password && username && name) || isFetching;

  return (
    <Content title='Sign Up'>
      <div className='signUpPage'>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={handleChange}
              className='formField-input'
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={handleChange}
              className='formField-input'
            />
          </div>
          <div>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={handleChange}
              className='formField-input'
            />
          </div>
          <div>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={handleChange}
              className='formField-input'
            />
          </div>
          <div>
            <Button
              type='submit'
              $variant='primary'
              disabled={buttonDisabled}
              className='loginForm-submit'
            >
              {isFetching ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
      <Toast isOpen={showToast} message={toastMessage} onCancel={handleToastClose} />
    </Content>
  );
}

export default SignUpPage;
