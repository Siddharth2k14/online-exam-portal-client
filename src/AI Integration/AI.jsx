import { useState } from "react";
import axios from "axios"
import { Button, Card, Input, Typography } from "@mui/material";

const AI = () => {
    const [question, setQuetion] = useState("");
    const [answer, setAnswer] = useState("");

    const askAI = async () => {
        const res = await axios.post("https://online-exam-portal-server.onrender.com/api/ai/ask", { question });
        setAnswer(res.data.answer);
    };

    return (
        <Card>
            <Typography>ASK AI</Typography>
            <Input 
                value={question}
                onChange={(e) => setQuetion(e.target.value)} 
            />
            <Button onClick={askAI}>
                Send
            </Button>
            <p>{answer}</p>
        </Card>
    )
}

export default AI;