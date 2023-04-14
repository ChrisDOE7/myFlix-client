import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, FormControl } from "react-bootstrap";

export const EditProfile = ({ user }) => {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [birthday, setBirthday] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleSubmit = async event => {
      event.preventDefault();

      setIsLoading(true);
      setError(null);

      const data = {
         Name: name,
         Username: username,
         Password: password,
         Email: email,
         Birthday: birthday
      };

      try {
         const response = await fetch(
            `https://myflixapp2211.herokuapp.com/users/${user.Username}`,
            {
               method: "PUT",
               body: JSON.stringify(data),
               headers: {
                  "Content-Type": "application/json"
               }
            }
         );

         if (response.ok) {
            alert("Change successful");
            window.location.reload();
         } else {
            setError("Change failed");
         }
      } catch (error) {
         setError("An error occurred. Please try again later.");
      }

      setIsLoading(false);
   };

   return (
      <Form className="w-50" onSubmit={handleSubmit}>
         {error && <div className="error">{error}</div>}
         <Form.Group controlId="Name">
            <Form.Label>Name:</Form.Label>
            <FormControl
               type="text"
               value={name}
               onChange={e => setName(e.target.value)}
            />
         </Form.Group>
         <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <FormControl
               type="text"
               value={username}
               onChange={e => setUsername(e.target.value)}
            />
         </Form.Group>

         <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
         </Form.Group>

         <Form.Group controlId="formEmail">
            <Form.Label>Email::</Form.Label>
            <Form.Control
               placeholder="name@example.com"
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
         </Form.Group>

         <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
               type="date"
               value={birthday}
               onChange={e => setBirthday(e.target.value)}
            />
         </Form.Group>
         <br></br>
         <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
         </Button>
      </Form>
   );
};
