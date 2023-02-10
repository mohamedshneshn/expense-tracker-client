import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useEffect } from "react";


function Login() {
  const [loading, setLoading] = React.useState(false);   // loading state for spinner
  const navigate = useNavigate();                        // navigate hook for redirecting to other pages
  const [error, setError] = React.useState("");          // error state for error message from server
  const url = "http://localhost:5002/";

  // const [url, setUrl] = React.useState("http://localhost:5002/");
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   // dev code
  //   console.log("development");
  //   setUrl("http://localhost:5002/");
    
  // } else {
  //   // production code
  //   setUrl("https://expense-tracker-v1.adaptable.app/");
  //   console.log("production");
  // }


  const onFinish = (values) => {
    setLoading(true);
    // console.log("Success:", values);
    axios.post(url+"users/login", values)
      .then((res) => {
        message.success("Login Successful");
        if (typeof window !== "undefined") {   // if window is defined then only the local storage will be set
          localStorage.setItem("token", JSON.stringify({ ...res.data.user , password: ""}));  // the password is removed from the local storage
          setLoading(false); // stop the spinner
          navigate("/");     // redirect to home page
        }
      })
      .catch((err) => {
        err.response.data.password && setError(err.response.data.password);
        err.response.data.email && setError(err.response.data.email);
        setLoading(false);
      });

  };

  useEffect(() => {    // if the user is already logged in then redirect to home page to avoid multiple login
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);


  return (
    <div className="register">             
      {loading && <Spinner />}   

      <div className="row justify-content-center align-items-center">

        <div className="col-md-5 m-auto">
          <Form layout="vertical" name="basic" initialValues={{ remember: true }}  onFinish={onFinish} >
            <h1 >EXPENSE-TRACER / LOGIN</h1>

            <Form.Item label="Email"  name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input />
            </Form.Item>
            {error === "User Not Found" &&  <div className="text-danger">{error}</div>}
          
            <Form.Item label="Password" name="password"rules={[{ required: true, message: "Please input your password!" }]} >
              <Input.Password />
            </Form.Item>
            {error === "Incorrect Password" &&  <div className="text-danger">{error}</div>}
           
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/Register"> Not Registered Yet, Click Here to Register</Link>
              <Button type="primary" htmlType="submit">Login</Button>
            </div>
          </Form>
        </div>

        <div className="col-md-5 m-auto lottie">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_06a6pf9i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

      </div>
    </div>
  );
}

export default Login;
