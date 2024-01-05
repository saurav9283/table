import React from "react";

const FormInput = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea
          required={required}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e, name)}
        ></textarea>
      ) : (
        <input
          required={required}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e, name)}
        />
      )}
    </div>
  );
};

export default FormInput;
