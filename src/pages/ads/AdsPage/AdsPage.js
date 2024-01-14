import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLatestAds } from '../service';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Filter from './Filter';
import Toast from '../../../components/shared/Toast';

import './AdsPage.css';

const EmptyList = () => (
  <div className="adsPage-empty">
    <p>Be the first one!</p>
    <NavLink to="new">
      <Button $variant="primary">Create ad</Button>
    </NavLink>
  </div>
);

function AdsPage() {
  const [ads, setAds] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [saleFilter, setSaleFilter] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);
    setShowToast(false);

    getLatestAds()
      .then(ads => setAds(ads))
      .catch(error => {
        setIsFetching(false);
        setToastMessage("An error occurred while fetching ads. Please try again later.");
        setShowToast(true);

        if (!isFetching && error.status === 401) {
          navigate('/login');
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [navigate]);

  const filteredAds = ads.filter(ad => {
    const nameMatch = ad.name.toLowerCase().includes(nameFilter.toLowerCase());
    const saleMatch = saleFilter === null || ad.sale === saleFilter;

    return nameMatch && saleMatch;
  });

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <Content title="What's going on...">
      <Filter
        onNameChange={(e) => setNameFilter(e.target.value)}
        onSaleChange={(value) => setSaleFilter(value)}
      />

      <div className="adsPage">
        {filteredAds.length ? (
          <ul>
            {filteredAds.map(({ id, name, sale, price, tags }) => (
              <li key={id}>
                <NavLink to={`${id}`}>
                  <div>
                    <h2>{name}</h2>
                    <p>Price: {price} €</p>
                    <p>{sale ? 'Sale' : 'Purchase'}</p>
                    <p>Tags: {tags.join(', ')}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
      <Toast isOpen={showToast} message={toastMessage} onCancel={handleToastClose} />
    </Content>
  );
}

export default AdsPage;
