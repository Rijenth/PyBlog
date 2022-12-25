import React from 'react';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import {IndexArticles, GetArticle, PostArticle, UpdateArticle, DeleteArticle} from './pages/Articles/Article';
import Navbar from './components/navbar';
import Protected from './components/Protected';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Authentication/Register';

function App() {
  const [isLoggedIn, setisLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);

  console.log("Status de connexion : ", isLoggedIn)

  return (
    <div className='container'>
      <Navbar isLoggedIn={isLoggedIn} />
      <BrowserRouter>
        <Routes>

          <Route index path='/' element={<Home setIsLoggedIn={setisLoggedIn} />} />
          <Route path='/register' element={<Register />} />

          <Route path='/articles'>
            <Route index element={<IndexArticles isLoggedIn={isLoggedIn} />} />
            <Route path=':id' element={<GetArticle />} />
            <Route path='create' element={<Protected isLoggedIn={isLoggedIn}><PostArticle /></Protected>}/>
            <Route path='edit/:id' element={<Protected isLoggedIn={isLoggedIn}><UpdateArticle /></Protected>} />
            <Route path='delete/:id' element={<Protected isLoggedIn={isLoggedIn}><DeleteArticle /></Protected>} />
          </Route>

          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;