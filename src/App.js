import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Main from './Main';
import SongInfo from './SongInfo';

function App() {

  return (
    <div>
      <Router>
        <nav className='top'>
          <Link to='/' className='link' >Home</Link>
          <Link to='/search' className='link' >Search</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<SongInfo />}></Route>
          {/* <Route path='/main' element={<Main />}></Route> */}
        </Routes>
        {/* <nav className='bottom'>
          <p className='disclaimer'>DISCLAIMER: THIS WEBSITE DOES NOT PROVIDE MEDICAL ADVICE<br></br>
            The information, including but not limited to, text, graphics, images and other material contained on this website are for informational and entertaining purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
        </nav> */}
      </Router>
    </div>
  );
}

export default App;
