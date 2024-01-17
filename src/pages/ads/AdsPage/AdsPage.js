import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLatestAds } from '../service';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Filter from './Filter';
import Toast from '../../../components/shared/Toast';
import PropTypes from 'prop-types';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <Content title="Last ads">
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

AdsPage.propTypes = {
  ads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sale: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  nameFilter: PropTypes.string,
  saleFilter: PropTypes.bool,
  showToast: PropTypes.bool,
  toastMessage: PropTypes.string,
  navigate: PropTypes.func,
};

export default AdsPage;
