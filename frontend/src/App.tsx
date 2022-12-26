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
  const [apiUrl, setApiUrl] = React.useState('http://localhost:5000/api');
  
  return (
    <div className='container'>
      <Navbar isLoggedIn={isLoggedIn} />
      <BrowserRouter>
        <Routes>

          <Route index path='/' element={<Home apiUrl={apiUrl} setIsLoggedIn={setisLoggedIn} />} />
          <Route path='/register' element={<Register apiUrl={apiUrl} />} />

          <Route path='/articles'>
            <Route index element={<IndexArticles apiUrl={apiUrl} isLoggedIn={isLoggedIn} />} />
            <Route path=':id' element={<GetArticle apiUrl={apiUrl} />} />
            <Route path='create' element={<Protected isLoggedIn={isLoggedIn}><PostArticle apiUrl={apiUrl} /></Protected>}/>
            <Route path='edit/:id' element={<Protected isLoggedIn={isLoggedIn}><UpdateArticle apiUrl={apiUrl} /></Protected>} />
            <Route path='delete/:id' element={<Protected isLoggedIn={isLoggedIn}><DeleteArticle apiUrl={apiUrl} /></Protected>} />
          </Route>

          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;