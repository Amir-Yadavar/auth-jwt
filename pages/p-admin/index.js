import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import React from "react";

function PAdmin({ user }) {
  return <h1>Welcome To Admin Panel ❤️ {user.firstName} - {user.lastName}</h1>;
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/signin'
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

  const userInfo = await userModel.findOne({ email: isValidToken.email }, '-password -__v')

  if (userInfo.role !== "ADMIN") {
    return {
      redirect: {
        destination: '/dashboard'
      }
    }
  }
  return {
    props: { user: JSON.parse(JSON.stringify(userInfo)) }
  }
}

export default PAdmin;
