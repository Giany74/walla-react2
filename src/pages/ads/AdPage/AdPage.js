import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Content from '../../../components/layout/Content';
import { getAd, deleteAd } from '../service';
import defaultPhoto from '../../../assets/default-profile.png';
import ConfirmationModal from '../../../components/shared/ConfirmationModal';
import Button from '../../../components/shared/Button';

function AdPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    getAd(params.adId)
      .then(ad => setAd(ad))
      .catch(error => {
        if (error.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, params.adId]);

  const handleDelete = async () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAd(params.adId);
      console.log(`Ad con ID ${params.adId} eliminado con éxito`);
      navigate('/ads');
    } catch (error) {
      console.error('Error al eliminar el ad', error);
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
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
              Delete
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
    </Content>
  );
}

export default AdPage;
