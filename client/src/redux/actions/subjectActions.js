import axios from 'axios';
import { 
    GET_SUBJECTS,
    SUBJECTS_LOADING, 
    GET_ERRORS, 
} 
from './types';

export const createSubjects = (subjectData, history) => dispatch => {
    axios.post('/api/subjects', subjectData)
        .then(res => history.push('/subjects'))
        .catch(err => console.log(err));
}

// Get all subjects
export const getSubjects = () => dispatch => {
    dispatch(setSubjectsLoading());
    axios.get('/api/subjects')
    .then(res => {
        dispatch({
            type: GET_SUBJECTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });
}

// Delete a subject by ID
export const removeSubject = (subjectId, history) => dispatch => {
     axios.delete('/api/subjects', {data: { id: subjectId }} )
         .catch(err => console.log(err));
}

// Subjects loading
export const setSubjectsLoading = () => {
    return {
        type: SUBJECTS_LOADING
    };
}
