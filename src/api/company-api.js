import axios from './axios.js';

export function getCompanyById(companyId) {
    axios.get('/companies/' + companyId).then(response => {
        if (response.status == 200) {
            console.log(response.data);
            return response.data
        }
    });
}

export function getCompanies() {
    return axios.get('/companies').then(response => {
        if (response.status == 200) {
            console.log(response.data);
            return response.data
        }
    });
}

export function addCompany({ NAME, CUI, EMAIL, PHONE_NUMBER, DOMAIN }) {
    const form = new FormData();

    form.append("name", NAME);
    form.append("cui", CUI);
    form.append("email", EMAIL);
    form.append("phoneNumber", PHONE_NUMBER);
    form.append("domain", DOMAIN);

    return axios.post('/companies/', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}