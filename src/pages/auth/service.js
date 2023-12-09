import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';

const authUrl = '/auth';

export const login = credentials => {
  return client.post('/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};

export const getAuthMe = me => {
  const url = `${authUrl}/${me}`;
  return client.get(url);
};

export const createAuth = (signup) => {
  const url = `${authUrl}/signup`;

  return client.post(url, signup, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};