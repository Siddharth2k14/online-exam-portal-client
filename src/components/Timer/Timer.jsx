import { Box, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import './Timer.css';

const Timer = () => {
    const [number, setNumber] = useState(null); // Initialize with null to indicate no timer set
    const [inputValue, setInputValue] = useState(''); // Fixed: Initialize with empty string
    const [start, setStart] = useState(false);
    const [hasFinished, setHasFinished] = useState(false); // Track if timer has completed

    useEffect(() => {
        if(!start || number <= 0) return;

        const interval = setInterval(() => {
            setNumber((prev) => { // Fixed: Corrected typo from setNumnber to setNumber
                if(prev <= 1){
                    setStart(false);
                    setHasFinished(true); // Mark as finished when countdown completes
                    return 0;
                }
                return prev - 1;
            })
        }, 100);

        return () => clearInterval(interval);
    }, [start, number]);

    const handleReset = () => {
        setStart(false);
        setNumber(0); // Fixed: Handle case where inputValue might be empty
    };

    return (
        <Box className="timer-container">
            <Input
                type="number"
                value={inputValue}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    setInputValue(e.target.value); // Keep original input value
                    setNumber(val || null); // Set number, null if invalid/empty
                    setHasFinished(false); // Reset finished state when changing input
                }}
                placeholder="Enter the number"
                disabled={start}
                className="timer-input"
            />
            <br />
            <Button
                onClick={() => setStart(true)} 
                disabled={start || !number || number <= 0}
                className="timer-btn"
                style={{
                    backgroundColor: (start || !number || number <= 0) ? '#ccc' : '#4CAF50',
                    cursor: (start || !number || number <= 0) ? 'not-allowed' : 'pointer'
                }}
            >
                Start
            </Button>
            <br />
            <Button 
                onClick={() => setStart(false)} 
                disabled={!start}
                className="timer-btn"
                style={{
                    backgroundColor: !start ? '#ccc' : '#f44336',
                    cursor: !start ? 'not-allowed' : 'pointer'
                }}
            >
                Stop
            </Button>
            <br />
            <Button 
                onClick={handleReset}
                disabled={!start}
                className="timer-btn"
                style={{ 
                    backgroundColor: '#2196F3',
                    cursor: 'pointer'
                }}
            >
                Reset
            </Button>
            <br />
            <Box 
                className="timer-display"
                tyle={{
                color: hasFinished ? '#f44336' : '#333'
            }}>
                {hasFinished ? "Time is Up!" : 
                 number === null ? "Enter a number to start" : 
                 `Time left: ${number}s`}
            </Box>
        </Box>
    );
}

export default Timer;