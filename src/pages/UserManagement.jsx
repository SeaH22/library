import React, { useState } from "react";

export default function UserManagement({ users, setUsers }) {
  const [userForm, setUserForm] = useState({
    name: "",
    membershipID: "",
    role: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, membershipID, role } = userForm;

    if (!name.trim() || !membershipID.trim() || !role.trim()) {
      alert("Please fill in all user information.");
      return;
    }

    const newUser = {
      name: name.trim(),
      membershipID: membershipID.trim(),
      role: role.trim(),
    };

    setUsers((prev) => [...prev, newUser]);
    setUserForm({ name: "", membershipID: "", role: "" });
    alert("User added successfully.");
  };

  const editUser = (index) => {
    const targetUser = users[index];
    const newName = prompt("Enter new name:", targetUser.name);
    const newID = prompt("Enter new membership ID:", targetUser.membershipID);
    const newRole = prompt("Enter new role:", targetUser.role);

    const updatedUsers = [...users];
    updatedUsers[index] = {
      name: newName !== null ? newName : targetUser.name,
      membershipID: newID !== null ? newID : targetUser.membershipID,
      role: newRole !== null ? newRole : targetUser.role,
    };

    setUsers(updatedUsers);
  };

  const deleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="page">
      <h2>User Management</h2>
      <form onSubmit={handleAddUser} className="form-group">
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={userForm.name}
          onChange={handleUserInputChange}
        />
        <input
          type="text"
          name="membershipID"
          placeholder="Membership ID"
          value={userForm.membershipID}
          onChange={handleUserInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g. Student, Teacher)"
          value={userForm.role}
          onChange={handleUserInputChange}
        />
        <button type="submit">Add User</button>
      </form>

      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.membershipID}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(index)}>Update</button>
                <button onClick={() => deleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}