import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AllExpenses from "../pages/AllExpneses";
import { useSelector } from "react-redux";

const MyRoutes = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/" element={<AllExpenses />} />
          <Route path="/auth" element={<AllExpenses />} />
          <Route path="/expenses" element={<AllExpenses />} />
          <Route path="*" element={<AllExpenses />} />
        </>
      ) : (
        <>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/expenses" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;
