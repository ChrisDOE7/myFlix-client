import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, FormControl } from "react-bootstrap";

export const SignupView = () => {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [birthday, setBirthday] = useState("");

   const handleSubmit = event => {
      event.preventDefault();

      const data = {
         Name: name,
         Username: username,
         Password: password,
         Email: email,
         Birthday: birthday
      };

      fetch("https://myflixapp2211.herokuapp.com/users", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json"
         }
      }).then(response => {
         if (response.ok) {
            alert("Signup successful");
            window.location.reload();
         } else {
            alert("Signup failed");
         }
      });
   };

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <FormControl
               type="text"
               value={username}
               onChange={e => setUsername(e.target.value)}
               required
               minLength="3"
            />
         </Form.Group>

         <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               required
               minLength="8"
            />
         </Form.Group>

         <Form.Group controlId="formEmail">
            <Form.Label>Email::</Form.Label>
            <Form.Control
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               required
            />
         </Form.Group>

         <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
               placeholder="name@example.com"
               type="date"
               value={birthday}
               onChange={e => setBirthday(e.target.value)}
               required
            />
         </Form.Group>
         <br></br>
         <Button variant="success" type="submit">
            Sign Up
         </Button>
      </Form>
   );
};
