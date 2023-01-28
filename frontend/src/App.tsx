import About from './pages/about';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {IndexArticles, GetArticle, PostArticle, UpdateArticle, DeleteArticle} from './pages/Articles/Article';
import Home from './pages/home';
import AuthProvider from './components/AuthProvider';
import Navbar from './components/navbar';
import Protected from './components/Protected';
import NotFound from './pages/404';
import { useState } from 'react';
import Register from './pages/Authentication/Register';
import './App.css';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(sessionStorage.getItem('token') ? true : false);
  const [userId, setUserId] = useState(sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0);
  
  return (
      <div className='container'>
        <Navbar isLoggedIn={isLoggedIn} />
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              <Route index path='/' element={<Home setUserId={setUserId} setIsLoggedIn={setisLoggedIn} />} />
              <Route path='/register' element={<Register />} />

              <Route path='/articles'>
                <Route index element={<IndexArticles isLoggedIn={isLoggedIn} />} />
                <Route path=':id' element={<GetArticle isLoggedIn={isLoggedIn} />} />
                <Route path='create' element={<Protected isLoggedIn={isLoggedIn}><PostArticle /></Protected>}/>
                <Route path='edit/:id' element={<Protected isLoggedIn={isLoggedIn}><UpdateArticle userId={userId} /></Protected>} />
                <Route path='delete/:id' element={<Protected isLoggedIn={isLoggedIn}><DeleteArticle userId={userId} /></Protected>} />
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