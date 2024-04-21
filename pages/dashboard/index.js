import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { modelTodo } from "@/models/Todo";
import { useRouter } from "next/router";

function Dashboard({ user, todos }) {
  const router = useRouter()

  const [showInput, setShowInput] = useState(false)

  const [inputValue, setInputValue] = useState("")

  const [allTodo, setAllTodo] = useState([...todos])

  const getAllTodo = async () => {
    const res = await fetch('/api/todo')
    const data = await res.json()
    setAllTodo(data)
  }



  // addBtnTodoHandler 

  const addBtnTodoHandler = async () => {
    if (inputValue) {
      const res = await fetch('/api/todo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: inputValue })
      })

      if (res.status === 200) {
        setInputValue("")
        setShowInput(false)
        getAllTodo()
      }

      console.log(res);
    }
  }


  // removeTodoHandler

  const removeTodoHandler = async (todoId) => {

    const res = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: todoId })
    })

    if (res.status === 200) {
      getAllTodo()
    }

  }


  // signOut Handler

  const signOutHandler = async () => {
    try {
      const res = await fetch('/api/auth/signOut')
      if (res.status === 200) {
        router.replace('/signin')
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (


    <>


      <div className="container-todo">
        <div className="form-container" style={{ display: `${showInput ? "block" : "none"}` }}>
          <div className="add-form">
            <input
              id="input"
              type="text"
              placeholder="Type your To-Do works..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
            />
            <button type="submit" id="submit" onClick={addBtnTodoHandler}>
              ADD
            </button>
          </div>
        </div>
        <div className="head">
          <div className="date">
            <p>{user.firstName} - {user.lastName}</p>
          </div>
          <div className="add" onClick={(e) => setShowInput(true)}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
          <div className="time">
            <a href="#" onClick={signOutHandler}>Logout</a>
          </div>
        </div>
        <div className="pad">
          <div id="todo">
            <ul id="tasksContainer">
              {allTodo && allTodo.map(todo => (
                <li key={todo._id}>
                  <span className="mark">
                    <input type="checkbox" className="checkbox" />
                  </span>
                  <div className="list">
                    <p>{todo.title}</p>
                  </div>
                  <span className="delete" onClick={() => removeTodoHandler(todo._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              ))}

            </ul>
          </div>
        </div>
      </div>
    </>

  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies

  connectToDB()

  if (!token) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const isValidToken = verifyToken(token)

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/signin'
      }
    }
  }

  const userInfo = await userModel.findOne({ email: isValidToken.email }, "-password -__v")
  console.log(userInfo);

  const allTodo = await modelTodo.find({ user: userInfo._id })
  console.log(allTodo);

  return {
    props: {
      user: JSON.parse(JSON.stringify(userInfo)),
      todos: JSON.parse(JSON.stringify(allTodo))
    }
  }
}

export default Dashboard;
