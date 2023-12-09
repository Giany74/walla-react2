import { useState, useEffect } from 'react';
import Button from '../../../components/shared/Button';
import FormField from '../../../components/shared/FormField';
import { login } from '../service';
import { useAuth } from '../context';

import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router';

function LoginPage() {
	const { onLogin } = useAuth();
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState(null);
	const [isFetching, setIsFeching] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			setIsFeching(true);

			const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];

			if (remember) {
				const newCredentials = {
					email: credentials.email,
					password: credentials.password,
				};
				const userExists = savedUsers.some(
					user => user.email === credentials.email
				);
				if (!userExists) {
					const updatedUsers = [...savedUsers, newCredentials];
					localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
				}
			}

			await login(credentials);
			setIsFeching(false);
			onLogin();
			const to = location?.state?.from?.pathname || '/';
			navigate(to, { replace: true });
		} catch (error) {
			setIsFeching(false);
			setError(error);
		}
	};

	const handleChange = event => {
		setCredentials(currentCredentials => ({
			...currentCredentials,
			[event.target.name]: event.target.value,
		}));
	};

	const handleRememberChange = () => {
		setRemember(prevRemember => !prevRemember);
	};

	const resetError = () => {
		setError(null);
	};

	const { email, password } = credentials;
	const buttonDisabled = !(email && password) || isFetching;

	return (
		<div className='loginPage'>
			<h1 className='loginPage-title'>Log in to Ads</h1>
			<form onSubmit={handleSubmit}>
				<FormField
					type='text'
					name='email'
					label='phone, email or email'
					className='loginForm-field'
					onChange={handleChange}
					value={credentials.email}
				/>
				<FormField
					type='password'
					name='password'
					label='password'
					className='loginForm-field'
					onChange={handleChange}
					value={credentials.password}
				/>
				<label>
					Remember
					<input
						type='checkbox'
						name='remember'
						checked={remember}
						onChange={handleRememberChange}
					/>
				</label>
				<Button
					type='submit'
					$variant='primary'
					disabled={buttonDisabled}
					className='loginForm-submit'
				>
					{isFetching ? 'Connecting...' : 'Log in'}
				</Button>
				{error && (
					<div className='loginPage-error' onClick={resetError}>
						{error.message}
					</div>
				)}
			</form>
		</div>
	);
}

export default LoginPage;
