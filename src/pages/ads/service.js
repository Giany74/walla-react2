import client from '../../api/client';
import PropTypes from 'prop-types';

const adsUrl = '/v1/adverts';
const authUrl = '/auth';

export const getLatestAds = () => {
  const url = adsUrl;
  return client.get(url);
};

export const createAd = (formData) => {
  const url = adsUrl;
  return client.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTags = () => {
  return client.get("/v1/adverts/tags");
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


getLatestAds.propTypes = PropTypes.func;

createAd.propTypes = {
  formData: PropTypes.object.isRequired,
};

getAd.propTypes = {
  id: PropTypes.string.isRequired,
};

getAdTag.propTypes = {
  tags: PropTypes.string.isRequired,
};

getAuthMe.propTypes = {
  me: PropTypes.string.isRequired,
};

createAuth.propTypes = {
  signup: PropTypes.object.isRequired,
};

deleteAd.propTypes = {
  id: PropTypes.string.isRequired,
};