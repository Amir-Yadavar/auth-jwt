import { useRouter } from "next/router";
import React, { useState } from "react";
import swal from "sweetalert";

function Index() {

  const router = useRouter()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  //  signInHandler

  const signInHandler = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/signIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identifier, password })
    })

    if (res.status === 200) {
      setIdentifier("")
      setPassword("")

      swal({
        title: "sign In successfully",
        text: "welcome ..",
        icon: "success",
        button: "ok"
      })

      router.replace('/dashboard')
    } else if (res.status === 422) {
      setIdentifier("")
      setPassword("")

      swal({
        title: "not valid",
        text: "username or password not valid",
        icon: "warning",
        button: "ok"
      })
    } else if (res.status === 404) {
      setIdentifier("")
      setPassword("")

      swal({
        title: "not found",
        text: "username not found",
        icon: "warning",
        button: "ok"
      })
    }

    console.log(res);
  }

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" autoComplete="off" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" onClick={signInHandler} />
      </form>
    </div>
  );
}

export default Index;
