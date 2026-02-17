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
    Alert
} from "@mui/material";
import "./AssignExam.css";

const AssignExam = () => {
    const API_URL = import.meta.env.VITE_SERVER_URL || "https://online-exam-portal-server.onrender.com";
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [studentEmail, setStudentEmail] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchExams();
        fetchStudents();
    }, []);

    // ✅ NEW: Load assignments from localStorage on mount
    useEffect(() => {
        try {
            const savedAssignments = localStorage.getItem('assignExamAssignments');
            if (savedAssignments) {
                setAssignments(JSON.parse(savedAssignments));
            }
        } catch (err) {
            console.error('Failed to load assignments:', err);
            localStorage.removeItem('assignExamAssignments');
        }
    }, []);

    // ✅ NEW: Save assignments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('assignExamAssignments', JSON.stringify(assignments));
    }, [assignments]);

    /* ---------------- FETCH EXAMS ---------------- */
    const fetchExams = async () => {
        try {
            const res = await fetch(
                `${API_URL}/api/questions/all`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (!res.ok) throw new Error("Failed to fetch exams");

            const data = await res.json();

            const uniqueExamMap = new Map();

            data.exams.forEach((exam) => {
                if (!uniqueExamMap.has(exam.exam_title)) {
                    uniqueExamMap.set(exam.exam_title, {
                        exam_name: exam.exam_title,
                        examType: exam.exam_type || "objective",
                    });
                }
            });

            setExams([...uniqueExamMap.values()]);
        } catch (err) {
            setError(err.message || "Failed to fetch exams");
            console.log(err);
        }
    };

    /* ---------------- FETCH STUDENTS ---------------- */
    const fetchStudents = async () => {
        try {
            const res = await fetch(
                `${API_URL}/api/auth/student/all`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (!res.ok) throw new Error("Failed to fetch students");

            const data = await res.json();

            // ✅ IMPORTANT FIX
            setStudents(Array.isArray(data) ? data : data.students || []);
        } catch (err) {
            setError(err.message || "Failed to fetch students");
        }
    };

    /* ---------------- ASSIGN EXAM ---------------- */
    const handleAssign = async () => {
        if (!selectedExam || !selectedStudent) {
            setError("Please select both exam and student");
            return;
        }

        const student = students.find(s => s._id === selectedStudent);
        const exam = exams.find(e => e.exam_name === selectedExam);

        try {
            const res = await fetch(
                `${API_URL}/api/exams/assign`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        exam_name: selectedExam,
                        studentId: selectedStudent,
                        exam_type: exam.examType,
                    }),
                }
            );

            console.log(res);

            if (!res.ok) throw new Error("Assignment failed");

            setAssignments(prev => [
                ...prev,
                {
                    exam_name: exam.exam_name,
                    examType: exam.examType,
                    studentName: student.name,
                    studentEmail: student.email,
                }
            ]);

            setMessage("Exam assigned successfully");
            setStudentEmail(student.email);
            setError("");
            setSelectedExam("");
            setSelectedStudent("");

            console.log("Exam Title: ", selectedExam);
            console.log("Student Name: ", student.name);
            console.log("Exam Type: ", exam.examType);
            console.log("Student Email: ", student.email);
        } catch (err) {
            setError(err.message || "Assignment failed");
        }
    };

    // ✅ NEW: Optional - Clear localStorage button
    const clearAssignments = () => {
        setAssignments([]);
        localStorage.removeItem('assignExamAssignments');
        setMessage("Assignments cleared");
    };

    return (
        <Box className="assign-exam-container">
            <Typography variant="h4" className="page-title" gutterBottom>
                Assign Exam
            </Typography>

            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {/* EXAM DROPDOWN */}
                        <FormControl fullWidth>
                            <InputLabel>Select Exam</InputLabel>
                            <Select
                                value={selectedExam}
                                label="Select Exam"
                                onChange={(e) => setSelectedExam(e.target.value)}
                            >
                                {exams.map((exam) => (
                                    <MenuItem key={exam.exam_name} value={exam.exam_name}>
                                        {exam.exam_name} ({exam.examType})
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
                                {Array.isArray(students) &&
                                    students.map((student) => (
                                        <MenuItem key={student._id} value={student._id}>
                                            {student.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleAssign}
                            sx={{ minWidth: 160 }}
                        >
                            Assign Exam
                        </Button>
                    </Box>

                    {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </CardContent>
            </Card>

            {/* ASSIGNMENT TABLE */}
            <Card className="assignment-table-card">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Assigned Exams
                        </Typography>
                        {assignments.length > 0 && (
                            <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={clearAssignments}
                            >
                                Clear All
                            </Button>
                        )}
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Exam Title</b></TableCell>
                                <TableCell><b>Exam Type</b></TableCell>
                                <TableCell><b>Student Name</b></TableCell>
                                <TableCell><b>Student Email</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {assignments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No exams assigned yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                assignments.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.exam_name}</TableCell>
                                        <TableCell>{row.examType}</TableCell>
                                        <TableCell>{row.studentName}</TableCell>
                                        <TableCell>{row.studentEmail}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AssignExam;