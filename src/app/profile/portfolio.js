import React from 'react';

const PortfolioDownloadButton = ({ userId }) => {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Необходимо войти в систему.');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`http://77.73.69.213:5000/download_portfolio/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const errorData = await response.json();
        alert('Ошибка при скачивании портфолио: ' + errorData.message);
      }
    } catch (error) {
      alert('Ошибка при скачивании портфолио: ' + error.message);
    }
  };

  return (
    <button onClick={handleDownload}>Скачать портфолио</button>
  );
};

export default PortfolioDownloadButton;
