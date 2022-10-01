import React from 'react';
import { LogIn } from './components/login/login.component';
import {Routes, Route} from "react-router-dom";
import { HomePage } from './components/homepage/homepage.component';
import { MessagesPage } from './components/messagespage/messagespage.component';


export const App = () => (
    <Routes>
      <Route path="/" element={<LogIn />}/>
      <Route path="/home">
        <Route index element={<HomePage />}/>
        <Route path="messages" element={<MessagesPage />}/>
      </Route>
    </Routes>
);
