"use client";

import React from 'react';
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout'; // Путь к компоненту LogoutMenu
import EditProfileForm from './EditProfileForm'
import Footer from "../../components/footer/footer";
export default function Page() {

  return (
    <div className='page__profile'>
      <HeaderHandleLogout />
      <EditProfileForm />  
      <Footer />  
    </div>
  );
}
