import React, { useState } from 'react';
import FormComponent from './FormComponent';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function RegForm({ setIsUserLoggedIn }) {
  const [formData, setFormData] = useState({ Почта: '', Имя: '', Фамилия: '', Пароль: '' });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://77.73.69.213:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      if (data.status === 'success') {
        setIsUserLoggedIn(true);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userID', data.user.ID_участника);
        setRegistrationSuccess(true);
        alert('Регистрация успешна! Вы можете войти.'); // Вывод уведомления об успешной регистрации
      }
    } catch (error) {
      alert(error.message); // Вывод уведомления об ошибке
    }
  };

  return (
    <div className='reg__form'>
      <h1>Регистрация</h1>
      {registrationSuccess ? (
        <p className="success-message">Регистрация успешна! Вы можете войти.</p>
      ) : (
        <FormComponent
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          formFields={[
            { name: 'Почта', type: 'email', placeholder: 'Почта' },
            { name: 'Имя', type: 'text', placeholder: 'Имя' },
            { name: 'Фамилия', type: 'text', placeholder: 'Фамилия' },
            { name: 'Пароль', type: 'password', placeholder: 'Пароль' }
          ]}
          buttonLabel="Зарегистрироваться"
          icon={faUserPlus}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RegForm;
