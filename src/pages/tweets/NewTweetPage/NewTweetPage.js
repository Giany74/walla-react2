import { useState } from 'react';
import Content from '../../../components/layout/Content';
import Button from '../../../components/shared/Button';
import Photo from '../../../components/shared/Photo';
import Textarea from '../../../components/shared/Textarea';

import './NewTweetPage.css';
import { createTweet } from '../service';
import { useNavigate } from 'react-router';

function NewTweetPage() {
  const [content, setContent] = useState({
    name: '',
    sale: '',
    price: '',
    tags: [],
    photo: null,
  });  

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleChangeChecked = (e, key, value) => {
    setContent((prevContent) => ({ ...prevContent, [key]: value }));
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setContent((prevContent) => ({ ...prevContent, photo: file }));
  };

  const handleChangeTags = (e) => {
    const { name, checked } = e.target;
  
    setContent((prevContent) => ({
      ...prevContent,
      tags: {
        ...prevContent.tags,
        [name]: checked,
      },
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsFetching(true);
  

      const selectedTags = Object.entries(content.tags)
        .filter(([key, value]) => value)
        .map(([key]) => key.replace('tags.', ''));
  
      const formattedData = {
        name: content.name,
        sale: content.sale,
        price: content.price,
        tags: selectedTags,
        photo: content.photo,
      };
  
      const tweet = await createTweet(formattedData);
      navigate(`../${tweet.id}`, { relative: 'path' });
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      } else {
        setIsFetching(false);

      }
    }
  };

  const {
    name,
    sale,
    price,
    tags: { lifestyle, mobile, motor, work },
    photo,
  } = content;

  const buttonDisabled =
  !(
    name &&
    sale !== undefined &&
    price &&
    (lifestyle || mobile || motor || work)
  ) || isFetching;

  return (
    <Content title='Buyer or Seller?'>
      <div className='newTweetPage'>
        <div className='right'>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type='checkbox'
                name='sale'
                checked={content.sale}
                onChange={(e) => handleChangeChecked(e, 'sale', e.target.checked)}
              />{' '}
              Sale
            </div>
            <div>
              <input
                type='checkbox'
                name='purchase'
                checked={!content.sale}
                onChange={(e) => handleChangeChecked(e, 'sale', !e.target.checked)}
              />{' '}
              Purchase
            </div>
            <div>
            <input
              type='number'
              name='price'
              placeholder='Price'
              value={price}
              onChange={handleChange}
            />
            </div>
            <div>
            <input
                type='checkbox'
                name='lifestyle'
                checked={lifestyle}
                onChange={handleChangeTags}
              />{' '}
              Lifestyle
              <input
                type='checkbox'
                name='mobile'
                checked={mobile}
                onChange={handleChangeTags}
              />{' '}
              Mobile
              <input
                type='checkbox'
                name='motor'
                checked={motor}
                onChange={handleChangeTags}
              />{' '}
              Motor
              <input
                type='checkbox'
                name='work'
                checked={work}
                onChange={handleChangeTags}
              />{' '}
              Work
            </div>
            <div>
              <input
                type='file'
                accept='image/*'
                name='photo'
                onChange={handleFileChange}
              />
            </div>
            <div className='newTweetPage-footer'>
            <Button
                type='submit'
                className='newTweetPage-submit'
                $variant='primary'
                disabled={buttonDisabled}
              >
                {isFetching ? 'Connecting...' : "Let's go!"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
}

export default NewTweetPage;