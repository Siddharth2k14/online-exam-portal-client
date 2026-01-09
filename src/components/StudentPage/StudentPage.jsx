// Regular Imports
import { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/SideBar.jsx";

// MUI
import { Card, CardContent, Typography, Box } from "@mui/material";

// Theme
import { useTheme } from "../Theme Context/ThemeContext";

// CSS
import "./StudentPage.css";

// Lazy Imports
const ExamsPage = lazy(() => import("../ExamsPage/ExamsPage.jsx"));
const ViewExam = lazy(() => import("../ViewExam/ViewExam.jsx"));
const Result = lazy(() => import("../Result/Result.jsx"));
const AccountSettings = lazy(() => import("../Account Settings/AccountSettings.jsx"));
const ChangePassword = lazy(() => import("../Change Password/ChangePassword.jsx"));
const AdminList = lazy(() => import("../Admin List/AdminList.jsx"));

// Loading component
const ComponentLoading = ({ message = "Loading..." }) => (
    <div
        style={{
            padding: "40px",
            textAlign: "center",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Typography variant="h6">{message}</Typography>
    </div>
);

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const { themeMode } = useTheme();

    // ✅ Safe resize logic
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const containerStyles = useMemo(() => ({
        border: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
        left: isMobile ? '51px' : '261px',
        width: isMobile ? '832px' : '1018px',
    }), [themeMode, isMobile]);

    const renderContent = () => {
        if (!selectedSection) {
            return (
                <div className="student-welcome">
                    <Typography variant="h6" gutterBottom>
                        Welcome, {user?.name || "Student"}!
                    </Typography>
                    <Typography>
                        Use the sidebar to manage exams and settings.
                    </Typography>
                </div>
            );
        }

        return (
            <Suspense
                fallback={
                    <ComponentLoading message={`Loading ${selectedSection}...`} />
                }
            >
                {selectedSection === "Exams" && <ExamsPage />}
                {selectedSection === "View Exam" && <ViewExam />}
                {selectedSection === "Result" && <Result />}
                {selectedSection === "Account Info" && <AccountSettings />}
                {selectedSection === "Change Password" && <ChangePassword />}
                {selectedSection === "Admin List" && <AdminList />}
            </Suspense>
        );
    };

    return (
        <>
            <SideBar onSectionSelect={setSelectedSection} />

            <Box
                className="student-page"
                style={containerStyles}
            >
                <Typography
                    variant="h4"
                    className="student-heading"
                    sx={{ color: themeMode === "dark" ? "#fff" : "#333" }}
                >
                    Student Dashboard
                </Typography>

                <hr
                    style={{
                        borderTop: themeMode === "dark" ? "2px solid #fff" : "2px solid #333",
                        margin: "0 30px 30px",
                    }}
                />

                <Card
                    className="student-card"
                    sx={{
                        bgcolor: themeMode === "dark" ? "#333" : "#fff",
                        color: themeMode === "dark" ? "#fff" : "#333",
                        boxShadow:
                            themeMode === "dark"
                                ? "0 0 90px 10px rgba(86,157,228,.85)"
                                : "0 0 90px 10px rgb(141,141,141)",
                    }}
                >
                    <CardContent>{renderContent()}</CardContent>
                </Card>
            </Box>
        </>
    );
};

export default StudentPage;