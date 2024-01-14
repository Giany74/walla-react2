import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLatestAds } from '../service';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Filter from './Filter';
import Toast from '../../../components/shared/Toast';

import './AdsPage.css';

const EmptyList = ({ isFilterApplied }) => (
  <div className="adsPage-empty">
    <h3>{isFilterApplied ? 'No matching ads found' : 'No ads available... Be the first one!'}</h3>
    {!isFilterApplied && (
      <NavLink to="new">
        <Button $variant="primary">Create ad</Button>
      </NavLink>
    )}
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
    const fetchData = async () => {
      try {
        setIsFetching(true);
        setShowToast(false);

        const latestAds = await getLatestAds();
        setAds(latestAds);
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
        } else if (error.status === 404) {
          navigate('/404');
        } else {
          setToastMessage("An error occurred while fetching ads. Please try again later.");
          setShowToast(true);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();

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
        {ads.length > 0 ? (
          filteredAds.length > 0 ? (
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
            <EmptyList isFilterApplied={nameFilter || saleFilter !== null} />
          )
        ) : (
          <EmptyList isFilterApplied={false} />
        )}
      </div>
      <Toast isOpen={showToast} message={toastMessage} onCancel={handleToastClose} />
    </Content>
  );
}

export default AdsPage;