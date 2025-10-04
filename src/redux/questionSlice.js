import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: []
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            state.questions.push(action.payload);
        },
        removeQuestion: (state, action) => {
            state.questions.splice(action.payload, 1);
        },
        updateQuestion: (state, action) => {
            const { index, question } = action.payload;
            state.questions[index] = question;
        },
        resetQuestions: (state) => {
            state.questions = [];
        }
    }
});

export const { addQuestion, removeQuestion, updateQuestion, resetQuestions } = questionSlice.actions;
export default questionSlice.reducer;