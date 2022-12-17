import React from 'react';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import {IndexArticles, GetArticle, PostArticle, UpdateArticle} from './pages/Articles/Article';
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

          <Route path='/articles'>
            <Route index element={<IndexArticles />} />
            <Route path=':id' element={<GetArticle />} />
            <Route path='create' element={<PostArticle />} />
            <Route path='update/:id' element={<UpdateArticle />} />
          </Route>
        
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