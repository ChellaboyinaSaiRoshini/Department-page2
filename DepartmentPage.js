import React, { useState } from 'react';
import './DepartmentPage.css';

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add or Update Department
  const handleSubmit = () => {
    if (editDepartmentId) {
      // Update existing department
      const updatedDepartments = departments.map((dept) =>
        dept.id === editDepartmentId
          ? { ...dept, name: departmentName }
          : dept
      );
      setDepartments(updatedDepartments);
    } else {
      // Add new department
      const newDepartment = {
        id: Date.now().toString(),
        name: departmentName,
      };
      setDepartments([...departments, newDepartment]);
    }
    setModalVisible(false);
    setDepartmentName('');
    setDepartmentDescription('');
    setEditDepartmentId(null);
  };

  // Edit Department
  const handleEdit = (id) => {
    const department = departments.find((dept) => dept.id === id);
    setDepartmentName(department.name);
    setEditDepartmentId(id);
    setModalVisible(true);
  };

  // Delete Department
  const handleDelete = (id) => {
    const updatedDepartments = departments.filter((dept) => dept.id !== id);
    setDepartments(updatedDepartments);
  };

  // Filter Departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="department-page">
      <div className="header">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search Department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="add-department-btn" onClick={() => setModalVisible(true)}>
          Add Department
        </button>
      </div>

      {/* Department Table */}
      <table className="department-table">
        <thead>
          <tr>
            <th>Dept ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.name}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(dept.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(dept.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Department Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModalVisible(false)}>❌</button>
            <h2>{editDepartmentId ? 'Edit Department' : 'Add Department'}</h2>
            <input
              type="text"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            <textarea
              placeholder="Department Description (Optional)"
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
