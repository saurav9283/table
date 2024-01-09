import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const FormDataRow = ({
  data,
  index,
  editedIndex,
  formData,
  handleEdit,
  setFormData,
  handleDelete,
  handleSave,
  handelCancelChange,
}) => {
  const isBeingEdited = editedIndex === index;

  const handleChange =(e,name,index)=>{
      const value = e.target.value;
      const updatedData = {
        ...formData, [name]:value
      }
      setFormData(updatedData)
    
  }

  return (
    <tr key={index}>
      <td>
        {isBeingEdited ? (
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange(e, "firstName", index)}
          />
        ) : (
          data.firstName
        )}
      </td>
      <td>
        {isBeingEdited ? (
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange(e, "lastName", index)}
          />
        ) : (
          data.lastName
        )}
      </td>
      <td>
        {isBeingEdited ? (
          <input
            type="text"
            value={formData.fatherName}
            onChange={(e) => handleChange(e, "fatherName", index)}
          />
        ) : (
          data.fatherName
        )}
      </td>
      <td>
        {isBeingEdited ? (
          <input
            type="text"
            value={formData.motherName}
            onChange={(e) => handleChange(e, "motherName", index)}
          />
        ) : (
          data.motherName
        )}
      </td>
      <td>
        {isBeingEdited ? (
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange(e, "address", index)}
          />
        ) : (
          data.address
        )}
      </td>
      <td>
        <div className="buttons">
          {isBeingEdited ? (
            <>
            <button onClick={() => handleSave(index)}>Save</button>
            <button onClick={()=> handelCancelChange(index)}>cancel</button>
            </>
          ) : (
            <>
              <EditIcon onClick={() => handleEdit(index)} />
              <DeleteIcon onClick={() => handleDelete(index)} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default FormDataRow;
