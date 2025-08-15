//Regular Imports
import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar.jsx";

//Lazy Imports
import {lazy, Suspense} from "react";
import SideBar from "../../../components/SideBar/SideBar.jsx";
const StudentPage = lazy(() => import("../../../components/StudentPage/StudentPage"));

const StudentDashboard = () => {
    const [toggle, setToggle] = useState(false);

  return (
    <div>
      <NavBar toggle={toggle} setToggle={setToggle} name="student" />
      {/* <SideBar /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <StudentPage />
      </Suspense>
    </div>
  )
}

export default StudentDashboard
