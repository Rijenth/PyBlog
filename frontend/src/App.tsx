import About from './pages/about';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {IndexArticles, GetArticle, PostArticle, UpdateArticle, DeleteArticle} from './pages/Articles/Article';
import Home from './pages/home';
import AuthProvider from './components/AuthProvider';
import Navbar from './components/navbar';
import Protected from './components/Protected';
import NotFound from './pages/404';
import React from 'react';
import Register from './pages/Authentication/Register';
import './App.css';

function App() {
  const [isLoggedIn, setisLoggedIn] = React.useState(sessionStorage.getItem('token') ? true : false);
  const [userId, setUserId] = React.useState(sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0);
  const [apiUrl] = React.useState('http://localhost:5000/api');

  return (
    <div className='container'>
      <Navbar isLoggedIn={isLoggedIn} />
      <AuthProvider apiUrl={apiUrl}>
        <BrowserRouter>
          <Routes>

            <Route index path='/' element={<Home setUserId={setUserId} apiUrl={apiUrl} setIsLoggedIn={setisLoggedIn} />} />
            <Route path='/register' element={<Register apiUrl={apiUrl} />} />

            <Route path='/articles'>
              <Route index element={<IndexArticles apiUrl={apiUrl} isLoggedIn={isLoggedIn} />} />
              <Route path=':id' element={<GetArticle apiUrl={apiUrl} isLoggedIn={isLoggedIn} />} />
              <Route path='create' element={<Protected isLoggedIn={isLoggedIn}><PostArticle apiUrl={apiUrl} /></Protected>}/>
              <Route path='edit/:id' element={<Protected isLoggedIn={isLoggedIn}><UpdateArticle userId={userId} apiUrl={apiUrl} /></Protected>} />
              <Route path='delete/:id' element={<Protected isLoggedIn={isLoggedIn}><DeleteArticle userId={userId} apiUrl={apiUrl} /></Protected>} />
            </Route>

            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;