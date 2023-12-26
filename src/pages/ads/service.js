import { id } from 'date-fns/locale';
import client from '../../api/client';

const adsUrl = '/v1/adverts';
const authUrl = '/auth';

export const getLatestAds = () => {
  const url = adsUrl;
  return client.get(url);
};

export const createAd = (ad) => {
  const url = adsUrl;

  const formData = new FormData();

  Object.entries(ad).forEach(([key, value]) => {
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

export const getAd = id => {
  const url = `${adsUrl}/${id}`;
  return client.get(url);
};

export const getAdTag = tags => {
  const url = `${adsUrl}/${tags}`;
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


export const deleteAd = id => {
  const url = `${adsUrl}/${id}`;
  return client.delete(url);
};

export const deleteAdvert = advertId => {
  return client.delete(`${advertsPath}/${advertId}`);
};