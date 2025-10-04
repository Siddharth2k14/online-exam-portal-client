//Regular Imports
import { lazy, Suspense, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar.jsx";

//Lazy Loading
const AdminPage = lazy(() => import("../../../components/AdminPage/AdminPage.jsx"));

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <Suspense fallback={<h1>Loading...</h1>}>
                <AdminPage />
            </Suspense>
        </div>
    )
}

export default AdminDashboard;