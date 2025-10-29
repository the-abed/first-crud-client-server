// Import React and the useLoaderData hook from React Router
import React from "react";
import { useLoaderData } from "react-router";

// Component for updating an existing user
const UpdateUser = () => {
  // Load user data passed from the route loader
  const user = useLoaderData();
  console.log("Loaded user:", user);

  // -----------------------------------------------------
  // ✏️ Function to handle updating user info
  // -----------------------------------------------------
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent page reload

    // Get the updated name and email from input fields
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log("Edited:", name, email);

    // Create an updated user object
    const updatedUser = { name, email };

    // Send the updated user info to the server (PATCH request)
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH", // Use PATCH for partial update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser), // Convert object to JSON
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response:", data);
        if (data.modifiedCount > 0) {
          alert("✅ User updated successfully!");
        }
      });
  };

  // -----------------------------------------------------
  // 🧱 Render the update form
  // -----------------------------------------------------
  return (
    <div>
      <h2>Edit a User</h2>

      {/* Form for editing user details */}
      <div>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            placeholder="Enter name"
          />
          <br />

          <input
            type="text"
            name="email"
            defaultValue={user.email}
            placeholder="Enter email"
          />
          <br />

          <input type="submit" value="Update User" />
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
