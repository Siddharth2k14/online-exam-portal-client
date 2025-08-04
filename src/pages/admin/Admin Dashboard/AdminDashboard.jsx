//Regular Imports
import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";

//Lazy Imports
import {lazy, Suspense} from "react";
const AdminPage = lazy(() => import("../../../components/AdminPage/AdminPage"));

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            
            <Suspense fallback={<div>Loading...</div>}>
                <AdminPage />
            </Suspense>
        </div>
    )
}

export default AdminDashboard;