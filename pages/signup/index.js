import { useRouter } from "next/router";
import React, { useState } from "react";
import swal from "sweetalert";

function Index() {

  const rout = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const signupHandler = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/signUp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, userName, email, password })
    })

    if (res.status === 200) {
      setFirstName("")
      setLastName("")
      setUserName("")
      setEmail("")
      setPassword("")
      swal({
        title: "sign up successfully",
        text: "welcome ..",
        icon: "success",
        button: "ok"
      })

      rout.replace("/dashboard")
    } else if (res.status === 422) {
      swal({
        title: "email or username already exist ..",
        icon: "warning",
        button: "ok"
      })
    }
    console.log(res);
  }
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" autoComplete="off" value={userName} onChange={e => setUserName(e.target.value)} required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" onClick={signupHandler} />
      </form>
    </div>
  );
}

export default Index;
