import React, { useState} from 'react';
import ViewToggle from './viewToggle';
import PictureMode from './PictureMode';
import ListView from '../ListView/ListView';
import Navbar from './Navbar';
import { Icon } from '@iconify/react';
import axios from 'axios';

// CSS imports
import "./Dashboard.css";

import Cookies from "universal-cookie";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Dashboard = () => { 
  const [isToggled, setIsToggled] = useState(false);
  let [ userData, setUserData ] = useState(null)
  let [searchClicked, setSearchClick] = useState(false);
  let [searchText, setSearchText] = useState('');
  let [getArtefactCallback, setGetArtefactCallback] = useState([handleDashboard]);

  let [response, setResponse] = useState(null);
  let [rendered, setRendered] = useState(false);
  if (!rendered) {
      handleDashboard(setResponse);
      setRendered(true);
  }


  let searchContent;
  if (searchClicked) {
      searchContent = (
          <>
          <Icon icon='akar-icons:search'/>
          <form
            onSubmit={(e) => {
                changeCallback(e, setGetArtefactCallback, handleSearch);
                getArtefactCallback(setResponse);
            }}
          >
            <input type='text'
              className=''
              onClick={() => console.log("Hello world")}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
             
          </>
      )
  }
  else {
      searchContent = <Icon icon='akar-icons:search'/>
  }

  async function handleSearch (setResponse) {
    const configuration = {
      method: "get",
      url: `http://localhost:5100/search-artefacts/${searchText}`,
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    let promise = await axios(configuration);
    if (!promise) {
    } else {
      console.log(promise);
      setResponse(promise);
    }
  }


  return (
    <>
    <Navbar />
    <div className="dashboard-header">
        <h2>My Artefacts</h2>

        <div className='dashboard-header__right-area'>
          <div className='search-icon extended'
               onClick={() => setSearchClick(true)}
          >
            {searchContent}
          </div>

          <ViewToggle
             className="viewToggle"
             isToggled={isToggled}
             onToggle={()=>setIsToggled(!isToggled)}
          />
        </div>
    </div>
    { isToggled ?
        <ListView
          userData={userData}
          setUserData={setUserData}
          response={response}
        /> :
        <PictureMode 
          userData={userData}
          setUserData={setUserData}
          response={response}
        />
    }
    </>
  );


};

function changeCallback (e, setter, callback) {
  e.preventDefault();
  setter(callback);
}

async function handleDashboard(setResponse) {
  const configuration = {
    method: "get",
    url: "http://localhost:5100/data",
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

  // make the API call
  const response = await axios(configuration);
  console.log(response.data.artefactRecords);
  if (!response) {
  } else {
    setResponse(response);
  }
}

export default Dashboard;
