"use client";
// Page.js
import React, { useState } from 'react'; // Добавлено useState
import HeaderHandleLogout from '../../components/headerHandleLogout/headerHandleLogout';
import CreateProjectForm from './CreateProjectForm';
import ViewProjects from './ViewProjects';
import Footer from "../../components/footer/footer";

function Page() {
  const [projects, setProjects] = useState([]); // Используйте useState для инициализации состояния

  // Эта функция вызывается, когда новый проект успешно создан
  const handleNewProject = (newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  return (
    <div className='page__project'>
      <HeaderHandleLogout />
      <CreateProjectForm onProjectCreate={handleNewProject} />
      <ViewProjects projects={projects} />
      <Footer />
    </div>
  );
}

export default Page;
