import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Alert,
    Stack
} from "@mui/material";
import axios from "axios";
import "./AssignExam.css";

const AssignExam = () => {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const [examRes, studentRes, assignmentRes] = await Promise.all([
            axios.get("https://online-exam-portal-server.onrender.com/api/exams"),
            axios.get("https://online-exam-portal-server.onrender.com/api/auth/students"),
            axios.get("https://online-exam-portal-server.onrender.com/api/exams/assignments"),
        ]);

        setExams(examRes.data);
        setStudents(studentRes.data);
        setAssignments(assignmentRes.data);
    };

    const handleAssign = async () => {
        if (!selectedExam || !selectedStudent) {
            setError("Please select both exam and student");
            return;
        }

        try {
            await axios.post("https://online-exam-portal-server.onrender.com/api/exams/assign", {
                examId: selectedExam,
                studentId: selectedStudent,
            });

            setMessage("Exam assigned successfully");
            setError(null);
            setSelectedExam("");
            setSelectedStudent("");

            fetchInitialData();
        } catch (err) {
            setError(err.response?.data?.message || "Assignment failed");
            setMessage(null);
        }
    };

    return (
        <Box className="assign-exam-container">
            <Typography variant="h4" className="page-title" gutterBottom>
                Assign Exam
            </Typography>

            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        {/* EXAM DROPDOWN */}
                        <FormControl fullWidth>
                            <InputLabel>Select Exam</InputLabel>
                            <Select
                                value={selectedExam}
                                label="Select Exam"
                                onChange={(e) => setSelectedExam(e.target.value)}
                            >
                                {exams.map((exam) => (
                                    <MenuItem key={exam._id} value={exam._id}>
                                        {exam.title} ({exam.examType})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* STUDENT DROPDOWN */}
                        <FormControl fullWidth>
                            <InputLabel>Select Student</InputLabel>
                            <Select
                                value={selectedStudent}
                                label="Select Student"
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                {students.map((student) => (
                                    <MenuItem key={student._id} value={student._id}>
                                        {student.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="contained" size="medium" onClick={handleAssign}>
                            Assign Exam
                        </Button>

                        {message && <Alert severity="success">{message}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </Box>
                </CardContent>
            </Card>

            {/* ASSIGNMENT TABLE */}
            <Card className="assignment-table-card">
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Assigned Exams
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Exam Title</b></TableCell>
                                <TableCell><b>Exam Type</b></TableCell>
                                <TableCell><b>Student Name</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {assignments.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.exam.title}</TableCell>
                                    <TableCell>{row.exam.examType}</TableCell>
                                    <TableCell>{row.student.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AssignExam;