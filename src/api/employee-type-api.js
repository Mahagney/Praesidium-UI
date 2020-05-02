import axios from './axios.js';

export function getEmployeeTypes() {
    return axios.get('/employeeTypes').then(response => {
        if (response.status == 200) {
            return response.data
        }
    });
}

export function getEmployeeTypesByCourseId(courseId) {
    return axios.get('/employeeTypes/course/'+courseId).then(response => {
        if (response.status == 200) {
            return response.data
        }
    });
}

export function addEmployeeType({ NAME, CODE }) {
    const form = new FormData();

    form.append("name", NAME);
    form.append("code", CODE);

    return axios.post('/employeeTypes/', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export function deleteEmployeeType(employeeTypesId) {
    return axios.delete('/employeeTypes/' + employeeTypesId);
}