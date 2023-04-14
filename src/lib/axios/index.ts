import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5eGhuZnFhZGt3dG1pdGx1cHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4ODE2MjYsImV4cCI6MTk5NjQ1NzYyNn0.Q-0g9JV9VaJ59cqycpFUfqoHU9G3IMGA_6aXQNH1nEw';
const apikey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5eGhuZnFhZGt3dG1pdGx1cHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4ODE2MjYsImV4cCI6MTk5NjQ1NzYyNn0.Q-0g9JV9VaJ59cqycpFUfqoHU9G3IMGA_6aXQNH1nEw';
export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    apikey,
    Authorization: 'Bearer ' + token
  }
});


