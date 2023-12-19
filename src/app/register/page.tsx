// Page.js
"use client";
import React, { useState } from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout';
import RegForm from './RegForm';
import LoginForm from './LoginForm';

export default function Page() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistrationForm(true);
  };

  const handleShowLogin = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className='page__register'>
      {isUserLoggedIn ? <HeaderHandleLogout /> : <Header />}
      <div className='section section__reg'>
        {isUserLoggedIn ? (
          <h1>Вы успешно вошли</h1>
        ) : showRegistrationForm ? (
          <RegForm setIsUserLoggedIn={setIsUserLoggedIn} />
        ) : (
          <LoginForm setLoginSuccess={setIsUserLoggedIn} />
        )}
        {!isUserLoggedIn && !showRegistrationForm && (
          <div className="form__buttons">
            <button onClick={handleShowLogin}>Есть аккаунт</button>
            <button onClick={handleShowRegistration}>Нет аккаунта</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
