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
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchExams();
        fetchStudents();
    }, []);

    /* ---------------- FETCH EXAMS ---------------- */
    const fetchExams = async () => {
        try {
            const res = await fetch(
                "https://online-exam-portal-server.onrender.com/api/questions/all"
            );

            if (!res.ok) throw new Error("Failed to fetch exams");

            const data = await res.json();

            const uniqueExamMap = new Map();

            data.forEach((q) => {
                if (!uniqueExamMap.has(q.exam_name)) {
                    uniqueExamMap.set(q.exam_name, {
                        exam_name: q.exam_name,
                        examType: q.examType || "objective",
                    });
                }
            });

            setExams([...uniqueExamMap.values()]);
        } catch (err) {
            setError(err.message || "Failed to fetch exams");
        }
    };

    /* ---------------- FETCH STUDENTS ---------------- */
    const fetchStudents = async () => {
        try {
            const res = await fetch(
                "https://online-exam-portal-server.onrender.com/api/auth/student/all"
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

        try {
            const res = await fetch(
                "https://online-exam-portal-server.onrender.com/api/exams/assign",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        exam_name: selectedExam,
                        studentId: selectedStudent,
                    }),
                }
            );

            if (!res.ok) throw new Error("Assignment failed");

            const student = students.find(s => s._id === selectedStudent);
            const exam = exams.find(e => e.exam_name === selectedExam);

            setAssignments(prev => [
                ...prev,
                {
                    exam_name: exam.exam_name,
                    examType: exam.examType,
                    studentName: student.name,
                }
            ]);

            setMessage("Exam assigned successfully");
            setError("");
            setSelectedExam("");
            setSelectedStudent("");
        } catch (err) {
            setError(err.message || "Assignment failed");
        }
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
                            {assignments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No exams assigned yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                assignments.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.exam?.title || row.exam_name}</TableCell>
                                        <TableCell>{row.exam?.examType || "N/A"}</TableCell>
                                        <TableCell>{row.student?.name || "N/A"}</TableCell>
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