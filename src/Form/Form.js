import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Form.css";
import Swal from "sweetalert2";
import FormInput from "../Formitem/FormInput.js";
import FormDataRow from "../FormData/FormDataRow.js";

const Form = () => {
  const [sortField, setSortField] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [recordsToShow, setRecordsToShow] = useState(3);

  useEffect(() => {
    const savedData = localStorage.getItem("submittedData");
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);

  const openModalToAdd = () => {
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    setShowModal(true);
  };

  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;
    if (index !== undefined) {
      const updatedData = submittedData.map((data, dataIndex) =>
        dataIndex === index ? { ...data, [fieldName]: value } : data
      );
      setSubmittedData(updatedData);
    } else {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  const handleEdit = (index) => {
    setEditedIndex(index);
    setIsEditing(true);
    setFormData(submittedData[index]);
    // setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedSubmittedData = submittedData.map((data, index) =>
        index === editedIndex ? formData : data
      );
      setSubmittedData(updatedSubmittedData);
      toast.success("Data updated successfully!", { position: "top-center" });
    } else {
      const updatedSubmittedData = [...submittedData, formData];
      setSubmittedData(updatedSubmittedData);
      toast.success("Data added successfully!", { position: "top-center" });
    }
    setShowModal(false);
    setEditedIndex(null);
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSubmittedData = submittedData.filter(
          (_, i) => i !== index
        );
        setSubmittedData(updatedSubmittedData);
        localStorage.setItem(
          "submittedData",
          JSON.stringify(updatedSubmittedData)
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleSave = (index) => {
    const updatedData = submittedData.map((data, dataIndex) =>
      dataIndex === index ? formData : data
    );
    setSubmittedData(updatedData);
    localStorage.setItem("submittedData", JSON.stringify(updatedData));
    setEditedIndex(null);
    toast.success("Data updated successfully!", { position: "top-center" });
  };
  const handleRecordsToShowChange = (e) => {
    const newRecordsToShow = parseInt(e.target.value, 10);
    setRecordsToShow(newRecordsToShow);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  return (
    <>
    <div className="filter">
      <div className="title">
        <h1>Welcome To Form</h1>
      </div>
      <div className="search">
        <label className="label">Search by: </label>
        <select className="select" value={sortField} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="fatherName">Father's Name</option>
          <option value="motherName">Mother's Name</option>
        </select>
      </div>
      </div>

      <div className="add">
        <button onClick={openModalToAdd}>+Add</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <FormInput
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Father Name"
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Mother Name"
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Address"
                type="text"
                name="address"
                value={formData.address2}
                onChange={handleChange}
                required
              />

              <button type="submit">Submit</button>
              <button type="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {submittedData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.slice(0, recordsToShow).map((data, index) => (
              <FormDataRow
                key={index}
                data={data}
                index={index}
                editedIndex={editedIndex}
                formData={formData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            ))}
          </tbody>
          <div className="Pagination">
            <h3 className="h3">
              Visible Record {recordsToShow} - {submittedData.length}
            </h3>
            <input
              type="number"
              min="1"
              max={submittedData.length}
              value={recordsToShow}
              onChange={handleRecordsToShowChange}
            />
          </div>
        </table>
      ) : (
        <h1>No data available. Please add something.</h1>
      )}

      <ToastContainer />
    </>
  );
};

export default Form;
