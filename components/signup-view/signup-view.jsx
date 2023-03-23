import { useState } from "react";

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
      <form onSubmit={handleSubmit}>
         <label>Sign Up:</label> <br></br>
         <label>
            Name:
            <input
               type="text"
               value={name}
               onChange={e => setName(e.target.value)}
               required
            />
         </label>
         <label>
            Username:
            <input
               type="text"
               value={username}
               onChange={e => setUsername(e.target.value)}
               required
               minLength="3"
            />
         </label>
         <label>
            Password:
            <input
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               required
               minLength="8"
            />
         </label>
         <label>
            Email:
            <input
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               required
            />
         </label>
         <label>
            Birthday:
            <input
               type="date"
               value={birthday}
               onChange={e => setBirthday(e.target.value)}
               required
            />
         </label>
         <button type="submit">Submit</button>
      </form>
   );
};
