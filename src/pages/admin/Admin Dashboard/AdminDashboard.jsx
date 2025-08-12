//Regular Imports
import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar.jsx";
import AdminPage from "../../../components/AdminPage/AdminPage.jsx"

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <AdminPage />
        </div>
    )
}

export default AdminDashboard;