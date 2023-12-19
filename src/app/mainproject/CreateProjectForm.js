import React, { useState } from 'react';

function CreateProjectForm({ onProjectCreate }) {
  const [projectData, setProjectData] = useState({
    Название_проекта: '',
    Описание: ''
  });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Токен не найден');
      return;
    }
    
    const dataToSend = {
      Название_проекта: projectData.Название_проекта,
      Описание: projectData.Описание
    };
  
    try {
      const response = await fetch('http://77.73.69.213:5000/create_project', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const newProject = await response.json();
        onProjectCreate(newProject.project); // Обновите состояние в родительском компоненте
        alert('Проект успешно создан, обновите страницу');
      } else {
        // Обработка ошибок, если ответ сервера не 'ok'
        const errorData = await response.json();
        alert('Ошибка при создании проекта: ' + errorData.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при создании проекта');
    }
  };
  

  return (
    <div className='section section__propose'>
      <h1>Предложить проект</h1>
      <form className='propose__form form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="Название_проекта"
          value={projectData.Название_проекта}
          onChange={handleChange}
          placeholder="Название проекта"
        />
        <textarea
          name="Описание"
          value={projectData.Описание}
          onChange={handleChange}
          placeholder="Описание проекта"
        />
        <button type="submit">Создать проект</button>
      </form>
    </div>
  );
}

export default CreateProjectForm;
