import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();

  return (
    <div className="user">
      <h2>Here are Users Details</h2>
      <p>Name: {user.name} </p>
      <p>Email: {user.email} </p>
    </div>
  );
};

export default UserDetails;
