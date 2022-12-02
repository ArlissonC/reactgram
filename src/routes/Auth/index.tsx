// Pages
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Layout from "themes/Layout";

// Routes
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
