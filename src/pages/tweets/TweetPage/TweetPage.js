import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Content from '../../../components/layout/Content';
import { getTweet, deleteTweet } from '../service';
import defaultPhoto from '../../../assets/default-profile.png';
import ConfirmationModal from '../../../components/ConfirmationModal';

function TweetPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    getTweet(params.tweetId)
      .then(tweet => setTweet(tweet))
      .catch(error => {
        if (error.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, params.tweetId]);

  const handleDelete = async () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTweet(params.tweetId);
      console.log(`Tweet con ID ${params.tweetId} eliminado con éxito`);
      navigate('/tweets');
    } catch (error) {
      console.error('Error al eliminar el tweet', error);
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <Content title="Tweet detail">
      <div>
        ID: {params.tweetId}
        {tweet && (
          <div>
            <h3>Name: {tweet.name}</h3>
            <p>Type: {tweet.sale ? 'Sale' : 'Purchase'}</p>
            <p>Price: {tweet.price}</p>
            <p>Tags: {tweet.tags.join(', ')}</p>
            {tweet.photo ? (
              <img src={tweet.photo} alt="tweet" />
            ) : (
              <img src={defaultPhoto} alt="Placeholder" />
            )}
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de borrar este ítem?"
      />
    </Content>
  );
}

export default TweetPage;
