import React from "react";

function Dashboard() {
  return (
    <>
      <h1>Amin - Saeedi - Welcome To Dashboard</h1>
    </>
  );
}

export async function getServerSideProps(context) {

  console.log(context.req.cookies);
  return {
    props: {}
  }
}

export default Dashboard;
