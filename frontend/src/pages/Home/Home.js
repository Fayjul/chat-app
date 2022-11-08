import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../../utils/APIRoutes';

export default function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChats, setCurrentChats] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getUser = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/signin');
    } else {
      const userFromLocalStorage = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      //console.log(userFromLocalStorage);
      setCurrentUser(userFromLocalStorage);
      console.log(currentUser);
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        console.log(currentUser);
      } else {
        navigate('/avater');
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const setAvaterImagefunction = async () => {
    if (currentUser) {
      if (currentUser.setAvaterImage) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        console.log(currentUser);
      } else {
        navigate('/avater');
      }
    } else {
      console.log('Nothing found haha this is from homejs');
    }
  };
  /*
  useEffect(() => {
    setAvaterImagefunction();
  }, []);
*/
  return (
    <div className="main-div">
      <h1 className="brand">Wellcome to our Chat App</h1>
    </div>
  );
}
