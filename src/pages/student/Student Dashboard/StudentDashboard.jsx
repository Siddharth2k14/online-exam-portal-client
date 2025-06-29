import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import SideBar from '../../../components/SideBar/SideBar';
import StudentPage from '../../../components/StudentPage/StudentPage';

const StudentDashboard = () => {
    const [toggle, setToggle] = useState(false);

  return (
    <div>
      <NavBar toggle={toggle} setToggle={setToggle} name="student" />
      {/* <SideBar /> */}
      <StudentPage />
    </div>
  )
}

export default StudentDashboard
