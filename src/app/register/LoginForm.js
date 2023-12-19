//LoginForm.js
import React, { useState } from 'react';
import FormComponent from './FormComponent';
import { faUser } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ setLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://77.73.69.213:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userID', data.user.ID_участника);
        setLoginSuccess(true); // Обновление состояния в компоненте Page
      } else {
        throw new Error('Token not received. Please try again.');
      }
    } catch (error) {
      alert(error.message); // Здесь выводим алерт с сообщением об ошибке
    }
  };
  
  return (
    <div className='login__form'>
      <h1>Вход</h1>
      <FormComponent
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        formFields={[
          { name: 'email', type: 'email', placeholder: 'Email' },
          { name: 'password', type: 'password', placeholder: 'Пароль' }
        ]}
        buttonLabel="Войти"
        icon={faUser}
      />
      {error && <p className="error-message">{error}</p>}

    </div>
  );
}

export default LoginForm;