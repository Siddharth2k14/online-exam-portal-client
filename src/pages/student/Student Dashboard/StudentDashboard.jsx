import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import SideBar from '../../../components/SideBar/SideBar';
<<<<<<< HEAD
import StudentPage from '../../../components/StudentPage/StudentPage';
=======
import StudentPage from '../../../components/StudentPage/StudentPage.jsx';
>>>>>>> master

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

<<<<<<< HEAD
export default StudentDashboard
=======
export default StudentDashboard;
>>>>>>> master
