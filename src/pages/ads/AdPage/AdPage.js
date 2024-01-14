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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setShowToast(false);

      try {
        const fetchedAd = await getAd(params.adId);
        setAd(fetchedAd);
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
        } else if (error.status === 404) {
          navigate('/404');
        } else {
          setToastMessage(`${error.message}`);
          setShowToast(true);
        }
      }
    };

    fetchData();

  }, [navigate, params.adId]);

  const handleDelete = async () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
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
              <Button onClick={handleDelete}>
                Deleting...
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
