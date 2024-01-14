import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Content from '../../../components/layout/Content';
import { getAd, deleteAd } from '../service';
import defaultPhoto from '../../../assets/default-profile.png';
import ConfirmationModal from '../../../components/shared/ConfirmationModal';
import Button from '../../../components/shared/Button';
import Toast from '../../../components/shared/Toast';

function AdPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setIsFetching(true);
    getAd(params.adId)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.status === 401) {
          navigate('/login');
        } else {
          setToastMessage(`${error.message}`);
          setShowToast(true);
          setIsFetching(false); 
        }
      });
  }, [navigate, params.adId]);

  const handleDelete = async () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsFetching(true);
      setShowToast(false);
      await deleteAd(params.adId);
      navigate('/ads');
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else if (error.status === 404) {
        navigate('/404');
      } else {
        setToastMessage(`${error.message}`);
        setShowToast(true);
      }
    } finally {
      setIsFetching(false);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <Content title="Ad detail">
      <div>
        ID: {params.adId}
        {ad && (
          <div>
            <h3>Name: {ad.name}</h3>
            <p>Type: {ad.sale ? 'Sale' : 'Purchase'}</p>
            <p>Price: {ad.price}</p>
            <p>Tags: {ad.tags.join(', ')}</p>
            {ad.photo ? (
              <img src={ad.photo} alt="ad" />
            ) : (
              <img src={defaultPhoto} alt="Placeholder" />
            )}
            <div>
              <Button onClick={handleDelete} disabled={!isFetching}>
                {isFetching ? 'Delete' : 'Deleting...'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure to delete this item?"
      />
      <Toast isOpen={showToast} message={toastMessage} onCancel={handleToastClose} />
    </Content>
  );
}

export default AdPage;