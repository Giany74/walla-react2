import { id } from 'date-fns/locale';
import client from '../../api/client';

const tweetsUrl = '/v1/adverts';
const authUrl = '/auth';

export const getLatestTweets = () => {
  const url = tweetsUrl;
  return client.get(url);
};

export const createTweet = (tweet) => {
  const url = tweetsUrl;

  const formData = new FormData();

  Object.entries(tweet).forEach(([key, value]) => {
    if (key === 'photo') {

      formData.append(key, value, value.name);
    } else if (key === 'name' || key === 'tags') {

      formData.append(key, value);
    } else if (key === 'price') {

      formData.append(key, parseFloat(value));
    } else {

      formData.append(key, JSON.stringify(value));
    }
  });

  return client.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTweet = id => {
  const url = `${tweetsUrl}/${id}`;
  return client.get(url);
};

export const getTweetTag = tags => {
  const url = `${tweetsUrl}/${tags}`;
  return client.get(url);
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


export const deleteTweet = id => {
  const url = `${tweetsUrl}/${id}`;
  return client.delete(url);
};