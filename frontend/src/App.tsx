import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {IndexArticles, GetArticle, PostArticle, UpdateArticle, DeleteArticle} from './pages/Articles/Article';
import About from './pages/about';
import Home from './pages/home';
import NotFound from './pages/404';
import AuthProvider from './components/AuthProvider';
import Navbar from './components/navbar';
import Protected from './components/Protected';
import { Provider } from 'react-redux';
import RegisterUser from './pages/Authentication/RegisterUser';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/store/store';
import './App.css';

function App() {  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='container'>
          <AuthProvider>
            <BrowserRouter>
            <Navbar />

              <Routes>

                <Route index path='/' element={<Home />} />
                <Route path='/register' element={<RegisterUser />} />

                <Route path='/articles'>
                  <Route index element={<IndexArticles />} />
                  <Route path=':id' element={<GetArticle />} />
                  <Route path='create' element={<Protected><PostArticle /></Protected>}/>
                  <Route path='edit/:id' element={<Protected><UpdateArticle /></Protected>} />
                  <Route path='delete/:id' element={<Protected><DeleteArticle /></Protected>} />
                </Route>

                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
                
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;