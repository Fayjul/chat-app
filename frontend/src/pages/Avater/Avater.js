import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/loader.gif';
import './Avater.css';
import { Buffer } from 'buffer';
import { ToastContainer, toast } from 'react-toastify';
import { setAvaterRouter } from '../../utils/APIRoutes';

const Avater = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avaters, setAvaters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvater, setSelectedAvater] = useState(undefined);

  const setProfilePicture = async () => {
    if (selectedAvater === undefined) {
      toast.error('Please select an avatar', { position: 'bottom-center' });
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const { data } = await axios.post(`${setAvaterRouter}/${user._id}`, {
        image: avaters[selectedAvater],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        console.log('This come from backend');
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again.', {
          position: 'bottom-center',
        });
      }
    }
  };

  const asyncLoadData = async () => {
    const data = [];

    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
    }
    setAvaters(data);
    setIsLoading(false);
  };
  useEffect(() => {
    asyncLoadData();
  }, []);
  const isLogIn = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate('/signin');
  };
  useEffect(() => {
    isLogIn();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="main-div">
          <img src={loader} alt="loader" className="loader"></img>
        </div>
      ) : (
        <div className="main-div">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avaters.map((avatar, index) => {
              return (
                <div>
                  <div
                    className={`avatar ${
                      selectedAvater === index ? 'selected' : ''
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvater(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button onClick={setProfilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Avater;
