//Закомментила, потому что неуверена, что этот файл вообще нужен

// "use client";
// import React, { useState } from 'react';
// import RegForm from './RegForm'; // Импортируем RegistrationForm
// import LoginForm from './LoginForm'; // Импортируем LoginForm

// export default function Page() {
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);

//   const handleShowRegistration = () => {
//     setShowRegistrationForm(true);
//   };

//   const handleShowLogin = () => {
//     setShowRegistrationForm(false);
//   };

//   return (
//     <div className="section__main">
//       <div className="container">
//         <button onClick={handleShowLogin}>Есть аккаунт</button>
//         <button onClick={handleShowRegistration}>Нет аккаунта</button>
//       </div>
//       {showRegistrationForm ? (
//         <RegForm />
//       ) : (
//         <LoginForm />
//       )}
//     </div>
//   );
// }

