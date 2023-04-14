import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { EditProfile } from "./edit-profile";

export const ProfileView = ({ user, token, movies }) => {
   const updateUser = user => {
      localStorage.setItem("user", JSON.stringify(user));
   };

   return (
      <div className="userViewDetails">
         <div>
            <span>Name: </span>
            <span className="name">{user.Name}</span>
         </div>
         <div className="username">
            <span>Username: </span>
            <span className="username">{user.Username}</span>
         </div>
         <div className="email">
            <span>Email: </span>
            <span>{user.Email}</span>
         </div>
         <div className="birthday">
            <span>Birthday: </span>
            <span>{user.Birthday}</span>
         </div>
         <br></br>
         <EditProfile user={user} />
         <Button variant="danger">Deregister</Button>
         <Link to={`/`}>
            <button className="back-button" variant="link">
               Back
            </button>
         </Link>
      </div>
   );
};
