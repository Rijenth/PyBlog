import React from 'react';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import {IndexArticles, GetArticle} from './pages/Articles/Article';
import Navbar from './components/navbar';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <Navbar />
      <BrowserRouter>
        <Routes>

          <Route index path='/' element={<Home />} />

          <Route path='/articles' element={<IndexArticles />} />
          <Route path='/articles/:id' element={<GetArticle />} />
          
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
          <Route path='/articles' element={< IndexArticles/>} />
*/