import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormComponent({ formData, setFormData, handleSubmit, formFields, buttonLabel, icon }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="component__form" onSubmit={handleSubmit}>
      {icon && <FontAwesomeIcon className="card__icon" icon={icon}></FontAwesomeIcon>}
      {formFields.map(field => (
        <input 
          key={field.name}
          type={field.type} 
          name={field.name} 
          value={formData[field.name]} 
          onChange={handleChange} 
          placeholder={field.placeholder} 
        />
      ))}
      <button className='form__btn' type="submit">{buttonLabel}</button>
    </form>
  );
}

export default FormComponent;