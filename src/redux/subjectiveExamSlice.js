import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
};

const subjectiveExamSlice = createSlice({
  name: 'subjectiveExam',
  initialState,
  reducers: {
    addSubjectiveQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    setSubjectiveQuestions: (state, action) => {
      state.questions = action.payload;
    },
    clearSubjectiveQuestions: (state) => {
      state.questions = [];
    },
  },
});

export const {
  addSubjectiveQuestion,
  setSubjectiveQuestions,
  clearSubjectiveQuestions,
} = subjectiveExamSlice.actions;

export default subjectiveExamSlice.reducer;