import React from 'react';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Navbar from './components/navbar';
import NotFound from './pages/404';
//@ts-ignore
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='container'>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>

    
  );
}

export default App;