import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import User from "../../pages/Profile/Profil";

function Router() {
    return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profil' element={<User />} />
            </Routes>
    )
}

export default Router;