import React, { useState } from 'react';
import Toast from '../../../components/shared/Toast';
import Content from '../../../components/layout/Content';
import Button from '../../../components/shared/Button';
import { createAd } from '../service';
import { useNavigate } from 'react-router';
import TagsSelect from '../../../components/shared/TagsSelect';
import PropTypes from 'prop-types';

function NewAdPage() {
  const [name, setName] = useState("");
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaleChange = (event) => {
    setSale(event.target.value === "true");
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTagsChange = (selectedTags) => {
    setTags(selectedTags);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sale", sale);
    formData.append("price", price);
    tags.forEach((tag) => formData.append("tags", tag));
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      setIsFetching(true);
      setShowToast(false);
      const advert = await createAd(formData);
      navigate("/ads/" + advert.id);
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

  const handleToastClose = () => {
    setShowToast(false);
  };

  const buttonDisabled = !(
    name &&
    sale !== undefined &&
    price &&
    tags.length > 0
  ) || isFetching;

  return (
    <Content title='Buyer or Seller?'>
      <div className='newAdPage'>
        <div className='right'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                id='name'
                name='name'
                type='text'
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label>Sale:</label>
              <input
                type='radio'
                id='saleTrue'
                name='sale'
                value='true'
                checked={sale === true}
                onChange={handleSaleChange}
              />
              <label htmlFor='saleTrue'>True</label>
              <input
                type='radio'
                id='saleFalse'
                name='sale'
                value='false'
                checked={sale === false}
                onChange={handleSaleChange}
              />
              <label htmlFor='saleFalse'>False</label>
            </div>
            <div>
              <label>Price:</label>
              <input
                id='price'
                name='price'
                type='number'
                placeholder='Price'
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <TagsSelect onTagsChange={handleTagsChange} />
            </div>
            <div>
              <input
                id='photo'
                name='photo'
                type='file'
                onChange={handlePhotoChange}
              />
            </div>
            <div className='newAdPage-footer'>
              <Button
                type='submit'
                className='newAdPage-submit'
                $variant='primary'
                disabled={buttonDisabled}
              >
                {isFetching ? 'Creating...' : "Create Ad"}
              </Button>
            </div>
          </form>
        </div>
        <Toast isOpen={showToast} message={toastMessage} onCancel={handleToastClose} />
      </div>
    </Content>
  );
}

NewAdPage.propTypes = {
  name: PropTypes.string,
  sale: PropTypes.bool,
  price: PropTypes.number,
  tags: PropTypes.array,
  photo: PropTypes.string,
  isFetching: PropTypes.bool,
  showToast: PropTypes.bool,
  toastMessage: PropTypes.string,
  navigate: PropTypes.func,
};

export default NewAdPage;
