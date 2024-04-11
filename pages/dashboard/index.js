import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

function Dashboard({ user }) {
  return (
    <>
      <h1>{user.firstName} - {user.lastName} - Welcome To Dashboard</h1>
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
  return {
    props: { user: JSON.parse(JSON.stringify(userInfo)) }
  }
}

export default Dashboard;
