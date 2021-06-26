import axios from 'axios';

const host = process.env.REACT_APP_HOST;

export const setToken = token => {

  localStorage.setItem('jwtToken', token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};

export default { setToken, call };