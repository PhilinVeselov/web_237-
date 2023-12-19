import React, { useState, useEffect } from 'react';
import PortfolioDownloadButton from './portfolio';

function EditProfileForm() {
  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Необходимо войти в систему.');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://77.73.69.213:5000/my_profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setProfileData({
        email: data.user.Почта,
        firstName: data.user.Имя,
        lastName: data.user.Фамилия,
      });
      setCurrentUserId(data.user.ID_участника); // Сохраняем ID пользователя
    } catch (error) {
      alert('Ошибка загрузки данных профиля: ' + error.message);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Необходимо войти в систему.');
      window.location.href = '/login';
      return;
    }
  
    try {
      const response = await fetch('http://77.73.69.213:5000/edit_profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileData.email,
          Имя: profileData.firstName,
          Фамилия: profileData.lastName,
          Пароль: profileData.password ? profileData.password : undefined,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      alert(data.message); // Уведомление пользователя об успешном обновлении
    } catch (error) {
      alert('Ошибка при редактировании профиля: ' + error.message); // Уведомление об ошибке
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className='section section__profile'>
      <h1>Редактирование профиля</h1>
      {error && <p>{error}</p>}
      <form className='profile__form form' onSubmit={handleEditProfile}>
        <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="Имя" />
        <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Фамилия" />
        <input type="password" name="password" value={profileData.password} onChange={handleChange} placeholder="Пароль" />
        <button type="submit">Сохранить</button>
        
      </form>
      {/* Добавьте кнопку скачивания портфолио здесь */}
      {currentUserId && <PortfolioDownloadButton userId={currentUserId} />}
    </div>
  );
}

export default EditProfileForm;
