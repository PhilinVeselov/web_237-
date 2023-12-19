import React from 'react';
import MainPage from './main';
import Footer from "../../components/footer/footer";
import HeaderHandleLogout from "../../components/headerHandleLogout/headerHandleLogout"; // Путь к вашему компоненту LoginForm

export default function App() {
  return (
    <div>
      <HeaderHandleLogout />
      <MainPage />
      <Footer />
    </div>
  );
}