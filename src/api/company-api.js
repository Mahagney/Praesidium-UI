import axios from './axios';

export function getCompanyById(companyId) {
  axios.get('/companies/' + companyId).then((response) => {
    if (response.status == 200) {
      return response.data;
    }
    return null;
  });
}

export function getCompanies() {
  return axios.get('/companies').then((response) => {
    if (response.status == 200) {
      return response.data;
    }
    return null;
  });
}

export function addCompany({ NAME, CUI, EMAIL, PHONE_NUMBER, DOMAIN }) {
  const form = new FormData();

  form.append('name', NAME);
  form.append('cui', CUI);
  form.append('email', EMAIL);
  form.append('phoneNumber', PHONE_NUMBER);
  form.append('domain', DOMAIN);

  return axios.post('/companies/', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updateCompany({ ID, NAME, CUI, EMAIL, PHONE_NUMBER, DOMAIN }) {
  const form = new FormData();

  form.append('NAME', NAME);
  form.append('CUI', CUI);
  form.append('EMAIL', EMAIL);
  form.append('PHONE_NUMBER', PHONE_NUMBER);
  form.append('DOMAIN', DOMAIN);

  return axios.put('/companies/' + ID, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function deleteCompany(companyId) {
  return axios.delete('/companies/' + companyId);
}
