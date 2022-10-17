import React from 'react';
import Notes from './Notes';


const Home = (props) => {

  const {showAlert}=props;
  return (
    <div className="container mt-3">
      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
