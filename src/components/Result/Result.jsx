//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//Material UI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

//Recharts
import 'react-circular-progressbar/dist/styles.css';
import { LineChart } from 'recharts';
import { Line } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { PieChart } from 'recharts';
import { Pie } from 'recharts';
import { Cell } from 'recharts';
import { Legend } from 'recharts';

//CSS
import './Result.css';

//Component
const Result = () => {
    // Get all exam results from localStorage
    const LOCAL_STORAGE_KEY = "studentExamHistory";
    let score = 0, totalQuestions = 0, percentage = 0;
    let correctAnswers = 0, wrongAnswers = 0;
    let chartData = [];
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) {
            try {
                const history = JSON.parse(data);
                if (history.length > 0) {
                    // Sum over all exams
                    score = history.reduce((sum, exam) => sum + (exam.score || 0), 0);
                    totalQuestions = history.reduce((sum, exam) => sum + (exam.totalQuestions || 0), 0);
                    correctAnswers = score;
                    wrongAnswers = totalQuestions - score;
                    percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

                    // Add this to populate chartData
                    chartData = history.map((exam, idx) => ({
                        name: `Exam ${idx + 1}`,
                        score: exam.score || 0,
                        total: exam.totalQuestions || 0,
                    }));
                }
            } catch {/* ignore */ }
        }
    }

    const pieData = [
        { name: 'Correct', value: correctAnswers },
        { name: 'Wrong', value: wrongAnswers }
    ];
    const pieColors = ['#4caf50', '#f44336'];

    const { themeMode } = useTheme();

    const resultCardStyle = {
        backgroundColor: 'transparent',
        color: 'white',
        // border: '5px solid rgb(25, 118, 210)',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: "0 2px 15px rgba(25, 118, 210, 0.749)",
        },
    };

    return (
        <div
            className="result-root"
        >
            <Typography variant="h4" gutterBottom className="result-title" sx={{
                color: themeMode === 'light' ? 'white' : '#fff'
            }}>
                Result
            </Typography>
            <div className="result-grid">
                <div className="result-left">
                    <Card className="result-large-card"
                        sx={{
                            backgroundColor: 'transparent',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.5s ease-in-out',
                                boxShadow: "0 0 90px 10px rgba(25, 118, 210, 0.749)",
                            },
                        }}
                    >
                        <div style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                        }}>
                            <Typography variant="h6" align="center" gutterBottom style={{
                                color: 'white',
                            }}>
                                Progress Chart
                            </Typography>
                            <ResponsiveContainer width="100%" height={210} >
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{
                                        fill: 'white',
                                        fontStyle: 'italic',
                                        textDecoration: 'underline',
                                    }} />
                                    <YAxis label={{
                                        value: 'Score', angle: -90, position: 'insideLeft', style: {
                                            fill: 'white',
                                            fontStyle: 'italic',
                                            textDecoration: 'underline',
                                        }
                                    }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="score" stroke="#1976d2" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    <div className="result-score">
                        <Typography variant="h6" gutterBottom className="result-card-title" style={{ marginTop: 16, color: 'white' }}>
                            Your Score: {score}
                        </Typography>
                    </div>
                </div>

                <Box className="result-box" style={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }}>
                    <div className="result-right">
                        <Card className="result-card"
                            sx={resultCardStyle}
                        >
                            <Typography variant="h6" gutterBottom className="result-card-title">
                                Total Questions: {totalQuestions}
                            </Typography>
                        </Card>
                        <Card className="result-card"
                            sx={resultCardStyle}
                        >
                            <Typography variant="h6" gutterBottom className="result-card-title">
                                Correct Answers: {correctAnswers}
                            </Typography>
                        </Card>
                        <Card className="result-card"
                            sx={resultCardStyle}
                        >
                            <Typography variant="h6" gutterBottom className="result-card-title">
                                Wrong Answers: {wrongAnswers}
                            </Typography>
                        </Card>
                        <Card className="result-card"
                            sx={resultCardStyle}
                        >
                            <Typography variant="h6" gutterBottom className="result-card-title">
                                Percentage: {percentage}%
                            </Typography>
                        </Card>
                    </div>

                    <Box
                        sx={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.5s ease-in-out',
                                boxShadow: "0 0 90px 10px rgba(25, 118, 210, 0.749)",
                            },
                        }}
                    >
                        <Typography variant="h6" align="center" gutterBottom sx={{
                            color: 'white',
                        }}>
                            Answer Distribution
                        </Typography>
                        <PieChart width={330} height={250}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default Result;
