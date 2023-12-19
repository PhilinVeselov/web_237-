
import React, { useState, useEffect } from 'react';
import EditProjectForm from './EditProjectForm';

function ViewProjects() {
  const currentUserID = localStorage.getItem('userID');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null); // Состояние для отслеживания редактируемого проекта
  const [projectUsers, setProjectUsers] = useState([]);
  const [comments, setComments] = useState({});
  const [roles, setRoles] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(''); // Статус, выбранный для фильтрации
  const [visibleComments, setVisibleComments] = useState({});
// Функция для переключения видимости комментариев
const toggleCommentsVisibility = async (projectId) => {
  if (!comments[projectId]) {
    await fetchComments(projectId);
  }
  setVisibleComments(prev => ({
    ...prev,
    [projectId]: !prev[projectId]
  }));
};
  
  
  const updateProjectsWithUsers = async (projectId) => {
    await fetchProjectUsers(projectId);
    setProjects(prevProjects => prevProjects.map(project =>
      project.ID_проекта === projectId
        ? { ...project, users: projectUsers }
        : project
    ));
  };
  useEffect(() => {
    projects.forEach((project) => {
      
    });
  }, [projects]); 
  useEffect(() => {
    fetchProjectsAndRoles();
  }, []);
  useEffect(() => {
    fetchRoles();
    // ... другие вызовы useEffect
  }, []);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchRoles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://77.73.69.213:5000/roles', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
      } else {
        throw new Error('Failed to fetch roles');
      }
    }  catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };
  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setSelectedStatusFilter(selectedStatus);
    // Вызов функции для фильтрации проектов
    filterProjectsByStatus(selectedStatus);
  };
  const filterProjectsByStatus = (status) => {
    // Если статус не выбран (пустая строка), отображаем все проекты
    if (!status) {
      setFilteredProjects(projects);
      return;
    }
  
    // Фильтрация проектов по выбранному статусу
    const filteredProjects = projects.filter((project) => project.Статус === status);
    setFilteredProjects(filteredProjects);
  };
    
  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token not found"); // Сообщаем пользователю
      return;
    }
  
    try {
      const response = await fetch('http://77.73.69.213:5000/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
  
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      alert('Ошибка при получении проектов: ' + error.message); // Сообщаем об ошибке
    }
  };


  const currentUserRole = localStorage.getItem('userRole'); // Пример получения роли пользователя
  const fetchProjectsAndRoles = async () => {
    const isAdminSystem = currentUserRole === 'Админ'; // Проверка статуса пользователя
    const token = localStorage.getItem('token');
    try {
      let response = await fetch('http://77.73.69.213:5000/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      let projectsData = await response.json();
      const numCurrentUserID = Number(currentUserID);

      // Для каждого проекта запрашиваем роли пользователей
      for (const project of projectsData.projects) {
        response = await fetch(`http://77.73.69.213:5000/project_users/${project.ID_проекта}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch project users');
        const usersData = await response.json();
        project.users = usersData.users;
        // Проверка, является ли текущий пользователь администратором проекта
        project.canEdit = isAdminSystem || project.users.some(user =>
          user.Роль === 'Администратор' && Number(user.ID_участника) === numCurrentUserID
        );    }
  
      // Обновите состояние projects с обновленным списком
      setProjects(projectsData.projects);
    }  catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };
  const deleteProject = async (projectId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://77.73.69.213:5000/delete_project/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('Проект удален'); // Информирование пользователя
        fetchProjects(); // Обновление списка проектов
      } catch (error) {
        alert('Ошибка при удалении проекта: ' + error.message); // Отображение ошибки пользователю
      }
};

  const handleStatusChange = (projectId, newStatus) => {
    // Логика для изменения статуса проекта
  };

  const handleProjectSettings = (project) => {
    // Проверка, имеет ли текущий пользователь право на редактирование проекта
    if (project.canEdit) {
      setEditingProject(project);
      fetchProjectUsers(project.ID_проекта);
    } else {
      // Вывести сообщение об отсутствии прав на редактирование
      alert('У вас нет прав на редактирование этого проекта.');
    }
  };
  
  const fetchComments = async (projectId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/get_comments/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
       if (comments[projectId]) {
       return;
     }
      if (response.ok) {
        const data = await response.json();
        setComments(prevComments => ({ ...prevComments, [projectId]: data.comments }));
      } else {
        throw new Error('Failed to fetch comments');
      }
    }  catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };
  
  const addComment = async (projectId, text) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/add_comment_to_project`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID_проекта: projectId, Текст: text }),
      });
  
      if (response.ok) {
        const newComment = await response.json();
        setComments(prevComments => {
          const updatedComments = prevComments[projectId]
            ? [...prevComments[projectId], newComment]
            : [newComment];
          return {
            ...prevComments,
            [projectId]: updatedComments
          };
        });
      }  if (!response.ok) throw new Error('Failed to add comment');
      alert('Комментарий добавлен'); // Успешное сообщение
      // ... обновление комментариев
    } catch (error) {
      alert('Ошибка при добавлении комментария: ' + error.message); // Отображение ошибки
    
    }
  };
  
  const handleSaveEditedProject = async (updatedProject) => {
    console.log("Saving project with ID:", updatedProject.ID_проекта); // Для отладки
    if (!updatedProject.ID_проекта) {
      alert("Project ID is undefined!"); // Сообщаем пользователю о проблеме
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/edit_project/${updatedProject.ID_проекта}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
  
      alert('Изменения в проекте сохранены.'); // Уведомляем пользователя об успехе
      fetchProjects(); // Обновление списка проектов
    } catch (error) {
      alert('Ошибка при сохранении изменений: ' + error.message); // Сообщаем об ошибке
    }
  
    setEditingProject(null); // Закрыть форму после сохранения
  };
  
  const fetchProjectUsers = async (projectId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/project_users/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setProjectUsers(data.users);
        return data.users;
        } else {
        throw new Error('Failed to fetch project users');
      }
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
    
  };
  
  
  
// Добавляем функцию для изменения статуса проекта
const updateProjectStatus = async (projectId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/change_project_status/${projectId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Статус: newStatus }),
      });
  
      if (response.ok) {
        // Здесь вы можете обновить статус в вашем состоянии projects,
        // чтобы он отражал изменения без перезагрузки страницы
        fetchProjects(); // или обновить конкретный проект в массиве
      }  if (!response.ok) throw new Error('Failed to update project status');
      alert('Статус проекта обновлен'); // Успешное сообщение
      fetchProjects(); // Обновление списка проектов
    } catch (error) {
      alert('Ошибка при обновлении статуса проекта: ' + error.message); // Отображение ошибки
    };
    
    
  };
  const removeUserFromProject = async (projectId, userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://77.73.69.213:5000/remove_user_from_project/${projectId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      alert('Пользователь успешно удален из проекта.'); // Успешное уведомление
      // Здесь можете обновить состояние, если это необходимо
    } catch (error) {
      alert('Ошибка при удалении пользователя: ' + error.message); // Уведомление об ошибке
    }
  };
  
  
  const addUserToProject = async (projectId, userEmail, roleId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://77.73.69.213:5000/add_user_to_project', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ID_проекта: projectId, 
        Email: userEmail,
        ID_роли: roleId 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    alert('Пользователь успешно добавлен к проекту.'); // Успешное уведомление
    // Здесь можете обновить состояние, если это необходимо
  } catch (error) {
    alert('Ошибка при добавлении пользователя: ' + error.message); // Уведомление об ошибке
  }
};


  
  // В вашем компоненте отображения проектов
  return (
    <div className='section section__projectView'>
      <h1>Проекты</h1>
      {/* Добавьте выпадающий список для выбора статуса фильтрации */}
      <select value={selectedStatusFilter} onChange={handleStatusFilterChange}>
        <option value="" disabled>Выберите статус</option>
        <option value="">Все статусы</option>

        <option value="На рассмотрении">На рассмотрении</option>
        <option value="Одобрен">Одобрен</option>
        <option value="В процессе выполнения">В процессе выполнения</option>
        <option value="Отправлен на ревью">Отправлен на ревью</option>
        <option value="Ревью пройдено">Ревью пройдено</option>
        <option value="Выполнен">Выполнен</option>
        <option value="заморожен">Заморожен</option>
      </select>
      {filteredProjects.map(project => (
        <div key={project.ID_проекта} className="projectView__card">
          <h1>{project.Название_проекта}</h1>
          <p>{project.Описание}</p>
          <select value={project.Статус} onChange={(e) => updateProjectStatus(project.ID_проекта, e.target.value)}>
            <option value="На рассмотрении">На рассмотрении</option>
            <option value="Одобрен">Одобрен</option>
            <option value="В процессе выполнения">В процессе выполнения</option>
            <option value="Отправлен на ревью">Отправлен на ревью</option>
            <option value="Ревью пройдено">Ревью пройдено</option>
            <option value="Выполнен">Выполнен</option>
            <option value="заморожен">Заморожен</option>
          </select>
  
          {project.canEdit && (
            <button onClick={() => handleProjectSettings(project)}>Редактировать</button>
          )}
  
          <button onClick={() => toggleCommentsVisibility(project.ID_проекта)}>Показать комментарии</button>
          <div className='card__comments'>
            {visibleComments[project.ID_проекта] && comments[project.ID_проекта].map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment.Дата}</p>
                <p>{comment.Имя} {comment.Фамилия}</p>
                <p>{comment.Текст}</p>
              </div>
            ))}
          </div>
  
          <form className='projectView__sendComm' onSubmit={(e) => {
            e.preventDefault();
            const commentText = e.target.elements.commentText.value;
            addComment(project.ID_проекта, commentText);
            e.target.reset();
          }}>
            <textarea name="commentText" placeholder="Написать комментарий..." />
            <button type="submit">Отправить</button>
          </form>
        </div>
      ))}
      {/* Отображение формы редактирования поверх списка проектов */}
      {editingProject && (
        <div>
          <div className="modal-backdrop" onClick={() => setEditingProject(null)} />
          <div className="section__projectEditModal">
            <EditProjectForm
              project={editingProject}
              users={projectUsers}
              fetchProjectUsers={fetchProjectUsers}
              roles={roles}
              onClose={() => setEditingProject(null)}
              onSave={handleSaveEditedProject}
              removeUserFromProject={removeUserFromProject}
              onAddUser={addUserToProject}
              onDelete={deleteProject}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProjects