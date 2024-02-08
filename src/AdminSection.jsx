import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminNavBar from './AdminComponents/AdminNavBar';
import AdminHome from './AdminComponents/AdminHome'

const AdminSection = () => {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route index element={<AdminHome />} />
      </Routes>
    </>
  );
}

export default AdminSection;
