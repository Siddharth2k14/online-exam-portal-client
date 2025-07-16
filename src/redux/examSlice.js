import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: []
};

const examSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {
        addExam: (state, action) => {
            // Check if exam with the same title already exists
            const existingExam = state.exams.find(exam => exam.title === action.payload.title);
            if (!existingExam) {
                state.exams.push({ ...action.payload, questions: [] });
            }
            // If you want to update the existing exam, you can do so here instead
        },
        deleteExam: (state, action) => {
            state.exams = state.exams.filter(exam => exam.title !== action.payload);
        },
        addQuestionToExam: (state, action) => {
            const { title, question } = action.payload;
            const exam = state.exams.find(e => e.title === title);
            if (exam) exam.questions.push(question);
        }
    }
});

export const { addExam, deleteExam, addQuestionToExam } = examSlice.actions;
export default examSlice.reducer;