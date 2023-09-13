import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {SignUp} from './components/signUp/signUp';

function App() {
  return (
        <div className="App">
          <Router>
            <Routes> 
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
          </Router>
        </div>
  );
}

export default App;
