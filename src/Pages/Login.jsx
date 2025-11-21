import React from "react";
import MultiColumnTemplate from "../Components/Template/MultiColumnTemplate";
import {LoginForm} from "../Components/Athentication/Login";
import shipperImg from "../Components/Assets/fullshipper.jpg";

const LoginInfo = (
  <div style={{background: '#FDF8ED', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(32,44,88,0.08)', color: '#1F2B56', fontFamily: 'serif', fontSize: 16}}>
    <ul style={{margin: 0, paddingLeft: 20}}>
      <li>Login to access your dashboard and manage your shipments or loads.</li>
      <li>If you forgot your password, use the reset link below.</li>
      <li>For support, contact us via the help section.</li>
    </ul>
  </div>
);

const LoginPage = () => {
  return (
   <MultiColumnTemplate
      imageSrc={shipperImg}
      heading="Login"
      subheading="Access your account"
      rightComponent={<LoginForm />}
      extraInfo={LoginInfo}
      extraLink={{ url: "/forgot-password", label: "Forgot Password?" }}
    />
  );
};

export default LoginPage;
