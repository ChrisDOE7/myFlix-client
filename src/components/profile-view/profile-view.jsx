import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProfileView = ({ users }) => {
   const { userId } = useParams();

   const user = users.find(u => u.id === userId);

   if (!user) {
      return <div>User not found!</div>;
   }

   return (
      <div className="profileViewDetails">
         <div>
            <span className="name">{user.name}</span>
         </div>
         <div>
            <span className="username">{user.username}</span>
            <span className="email">{user.email}</span>
            <span className="birthday">{user.birthday}</span>
         </div>
         <Link to={`/`}>
            <button className="back-button" variant="link">
               Back
            </button>
         </Link>
      </div>
   );
};
