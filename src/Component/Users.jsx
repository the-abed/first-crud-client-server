// Import React and required hooks/components
import React, { use, useState } from "react";
import { Link } from "react-router";

// This component shows the list of users and lets you add or delete users
const Users = ({ usersPromise }) => {

  // Load initial users using the React "use" hook (for Suspense or async data)
  const initialUser = use(usersPromise);

  // Create a state variable to store and update users
  const [users, setUsers] = useState(initialUser);

  // -----------------------------------------------------
  // 🧩 Function to handle adding a new user
  // -----------------------------------------------------
  const handleAddUser = (e) => {
    e.preventDefault(); // stops page reload on form submit

    // get data from input fields
    const name = e.target.name.value;
    const email = e.target.email.value;

    // create a new user object
    const newUser = { name, email };

    // send the new user data to the backend server
    fetch("http://localhost:3000/users", {
      method: "POST", // create (insert) new user
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser), // send data as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving", data);

        // check if user is successfully inserted
        if (data.insertedId) {
          // set the new _id for the new user
          newUser._id = data.insertedId;

          // add the new user to the existing list
          const newUsers = [...users, newUser];
          setUsers(newUsers);

          alert("✅ User added successfully!");
          e.target.reset(); // clear the form
        }
      });
  };

  // -----------------------------------------------------
  // 🗑️ Function to delete a user by ID
  // -----------------------------------------------------
  const handleDeleteUser = (id) => {
    console.log("Deleting User:", id);

    // send delete request to the server
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete user", data);

        // check if deletion was successful
        if (data.deletedCount) {
          alert("🗑️ User deleted successfully!");

          // remove deleted user from the UI list
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  // -----------------------------------------------------
  // 🧱 Render section: shows users and the add form
  // -----------------------------------------------------
  return (
    <div className="user">
     
      {/* Form to add new user */}
      <div className="user-form">
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" placeholder="Enter name" /> <br />
          <input type="text" name="email" placeholder="Enter email" /> <br />
          <input type="submit" value="Add User" />
        </form>
      </div>

      {/* Display users list */}
      <div className="user-info">
         <h2>Users : {users.length}</h2>

        {users.map((user) => (
          <div key={user._id}>
            <p>
              Name: {user.name}, Email: {user.email}{" "}
              {/* Links to other pages */}
              <Link to={`/users/${user._id}`}>Details</Link>{" "}
              <Link to={`/update/${user._id}`}>Edit</Link>{" "}
              <button onClick={() => handleDeleteUser(user._id)}>x</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
