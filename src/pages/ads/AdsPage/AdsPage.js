import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getLatestAds } from '../service';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Filter from './Filter';

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

  useEffect(() => {
    getLatestAds().then(ads => setAds(ads));
  }, []);

  const filteredAds = ads.filter(ad => {
    const nameMatch = ad.name.toLowerCase().includes(nameFilter.toLowerCase());
    const saleMatch = saleFilter === null || ad.sale === saleFilter;

    return nameMatch && saleMatch;
  });

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
                <Link to={`${id}`}>
                  <div>
                    <h2>{name}</h2>
                    <p>Price: {price} €</p>
                    <p>{sale ? 'Sale' : 'Purchase'}</p>
                    <p>Tags: {tags.join(', ')}</p>
                    <p></p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Content>
  );
}

export default AdsPage;
