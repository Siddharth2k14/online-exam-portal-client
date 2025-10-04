import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import questionReducer from './questionSlice';
import examReducer from './examSlice';
import subjectiveExamReducer from './subjectiveExamSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        questions: questionReducer,
        exams: examReducer,
        subjectiveExam: subjectiveExamReducer,
    },
});

export default store;