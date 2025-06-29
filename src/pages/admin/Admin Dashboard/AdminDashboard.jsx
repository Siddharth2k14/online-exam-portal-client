import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SideBar from "../../../components/SideBar/SideBar";
import AdminPage from "../../../components/AdminPage/AdminPage";

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <SideBar />
            <AdminPage />
        </div>
    )
}

export default AdminDashboard;