import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getLatestTweets } from '../service';
import Button from '../../../components/shared/Button';
import Content from '../../../components/layout/Content';
import Tweet from '../components/Tweet';
import Filter from './Filter';

import './TweetsPage.css';

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Be the first one!</p>
    <NavLink to="new">
      <Button $variant="primary">Create tweet</Button>
    </NavLink>
  </div>
);

function TweetsPage() {
  const [tweets, setTweets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [saleFilter, setSaleFilter] = useState(null);

  useEffect(() => {
    getLatestTweets().then(tweets => setTweets(tweets));
  }, []);

  const filteredTweets = tweets.filter(tweet => {
    const nameMatch = tweet.name.toLowerCase().includes(nameFilter.toLowerCase());
    const saleMatch = saleFilter === null || tweet.sale === saleFilter;

    return nameMatch && saleMatch;
  });

  return (
    <Content title="What's going on...">
      <Filter
        onNameChange={(e) => setNameFilter(e.target.value)}
        onSaleChange={(value) => setSaleFilter(value)}
      />

      <div className="tweetsPage">
        {filteredTweets.length ? (
          <ul>
            {filteredTweets.map(({ id, name, sale, price, tags }) => (
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

export default TweetsPage;
