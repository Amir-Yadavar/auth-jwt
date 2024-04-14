import React, { useEffect, useState } from "react";
import Link from "next/link";
import swal from 'sweetalert'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Index() {

  const router = useRouter()

  const [isLogged, setIsLogged] = useState(false)
  const [userInfo, setUserInfo] = useState("")

  useEffect(() => {
    const userLogged = async () => {
      const res = await fetch('/api/auth/me')
      if (res.status === 200) {
        setIsLogged(true)
        const result = await res.json()
        setUserInfo(result)
      }
    }

    userLogged()
  }, [])

  const signOutHandler = async () => {
    const res = await fetch('/api/auth/signOut')
    const data = await res.json()

    if (res.status === 200) {
      swal({
        title: "sign out successfully",
        text: "Have a good time ..",
        icon: "success",
        button: "ok"
      })
      setIsLogged(false)
      router.replace('/')
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          {isLogged ? (
            <>
              {/* User is login */}
              <li>
                <Link href="/dashboard">
                  <span>
                    <FontAwesomeIcon icon={faBars} />
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" onClick={signOutHandler}>
                  <span>
                    <FontAwesomeIcon icon={faSignOut} />
                  </span>
                  Logout
                </Link>
              </li>
              {/* User is login */}
            </>
          ) : (
            <>
              {/* User not login */}
              <li>
                <Link href="/signin">
                  <span>
                    <FontAwesomeIcon icon={faSignIn} />
                  </span>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <span>
                    <FontAwesomeIcon icon={faSignIn} />
                  </span>
                  Sign up
                </Link>
              </li>
              {/* User not login */}
            </>
          )}


          {/* User is login & admin */}
          {(isLogged && userInfo.role === "ADMIN") && (
            <li>
              <Link href="/p-admin">
                <span>
                  <FontAwesomeIcon icon={faSolarPanel} />
                </span>
                Admin panel
              </Link>
            </li>
          )}

        </ul>
        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
