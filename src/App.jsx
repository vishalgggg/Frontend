import { useEffect } from "react";
import MyRoutes from "./routes/MyRoutes";
import { loginAction } from "./store/actions/authActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await axios.post("http://localhost:4000/auth/authenticateuser", {
            token: token,
          });
          dispatch(loginAction());
          navigate("/expenses");
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <MyRoutes />
    </>
  );
};

export default App;
