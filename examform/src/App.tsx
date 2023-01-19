import React from 'react';
import logo from './logo.svg';
import './App.css';
import View from './SharedComponents/View'
import ViewItem from './SharedComponents/ViewItem'
import Form  from './Form'
import './Form/form.scss'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import HeaderComponent from './SharedComponents/HeaderComponent';

function App() {
  return (
    <>
  
         <BrowserRouter>
        <HeaderComponent/>
         
         <Routes>
         <Route path="/" element={<View/>}/>
          <Route path="/view" element={<View/>}/>
          <Route path="/create" element={<Form/>}/>
          <Route path="/update/:id" element={<Form/>}/>
          <Route path="/view/:id" element={<ViewItem/>}/>
         </Routes>
         </BrowserRouter>
         
         </>
  );
}

export default App;
