import "./App.css";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}



// function protectedRoute(props) {
//   if (localStorage.getItem("token")) {
//     console.log("token present");
//     return props;
//   }else {
//     console.log("token not present");
//     return <Navigate to="/login" />;
//   }
  
// }


// function unProtectedRoute(props) {         //  this function is used to protect the routes from authorised access
//   if (!localStorage.getItem("token")) {   // if the token is not present in the local storage then only the user can access the routes
//     return props;
//   }
//   return <Navigate to="/" />;

// }

export default App;
