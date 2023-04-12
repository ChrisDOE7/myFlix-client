import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const ProfileView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const { userId } = useParams();

   const users = users.find(u => u.id === userId);

   const updateUser = user => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
   };

   useEffect(() => {
      if (!token) return;

      fetch("https://myflixapp2211.herokuapp.com/users", {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then(response => response.json())
         .then(users => {
            const usersFromApi = users.map(user => {
               return {
                  // value names match to API database
                  id: user._id,
                  name: user.Name,
                  username: user.Username,
                  email: user.Email,
                  birthday: user.Birthday,
                  favoriteMovies: user.FavoriteMovies
               };
            });
            setUser(usersFromApi);
         });
   }, [token]);
};

// import React from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap/Button";

// export const ProfileView = ({ users }) => {
//    const { userId } = useParams();

//    const user = users.find(u => u.id === userId);
//    console.log(user);
//    if (!user) {
//       return <div>User not registered!</div>;
//    }

//    return (
//       <div className="userViewDetails">
//          <div>
//             <span>Name: </span>
//             <span className="name">{user.name}</span>
//          </div>
//          <div className="username">
//             <span>Username: </span>
//             <span className="username">{user.username}</span>
//          </div>
//          <div className="email">
//             <span>Email: </span>
//             <span>{user.email}</span>
//          </div>
//          <div className="birthday">
//             <span>Birthday: </span>
//             <span>{user.birthday}</span>
//          </div>
//          <br></br>
//          <Button variant="danger">Deregister</Button>
//          <Link to={`/`}>
//             <button className="back-button" variant="link">
//                Back
//             </button>
//          </Link>
//       </div>
//    );
// };
