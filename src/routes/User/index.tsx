import Home from "pages/Home";
import EditProfile from "pages/EditProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "themes/Layout";
import Profile from "pages/Profile";
import Photo from "pages/Photo";
import Search from "pages/Search";

const UserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="photos/:id" element={<Photo />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default UserRoutes;
