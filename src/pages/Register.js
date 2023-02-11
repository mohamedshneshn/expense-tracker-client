import React from "react";
import { Form, Input, Button,message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

function Register() {

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // const url = "https://expense-tracker-v1.adaptable.app/";


    const onFinish = (values) => {
        setLoading(true);
      
        axios
            .post("https://expense-tracker-v1.adaptable.app/users/register", values)
            .then((res) => {
              message.success("Registration Successful");
              console.log(res.data);
                if (typeof window !== "undefined") {
                  localStorage.setItem("token", JSON.stringify({ ...res.data , password: ""})); // the password is removed from the local storage
                  setLoading(false);
                
                  navigate("/");
                
                
                }
              })
            .catch((err) => {
      
              err.response.data.email && setError(err.response.data.email);
              err.response.data.name && setError(err.response.data.name) ;
              setLoading(false);
            }
            );
    };

    
    useEffect(() => {                           // useEffect is a hook that runs after every render
      if (localStorage.getItem("token")) {     // if the token is present in the local storage then the user is redirected to the home page
        navigate("/");
      }
      // eslint-disable-next-line
    }, []);
  


  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 m-auto lottie">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_06a6pf9i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-5 m-auto">
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h1 className="">EXPENSE-TRACER / REGISTER</h1>
            <Form.Item
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
                { min: 3, message: "Username must be atleast 3 characters"}
              ]}
            >
              <Input />
            </Form.Item>
            {error === "Username already exists" && <div className="text-danger">{error}</div>}

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email"}
                    ]}
              
            >
              <Input />
            </Form.Item>
            {error === "Email already exists" && <div className="text-danger">{error}</div>}

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be atleast 6 characters"},
                { max: 15, message: "Password must be atmost 15 characters"},
                { pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"), message: "Password must contain atleast one uppercase, one lowercase and one number" }

              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
                

              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">
                Already have an account? , Click here to login
              </Link>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
