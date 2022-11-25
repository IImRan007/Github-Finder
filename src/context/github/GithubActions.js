import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

//   Get Search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await axios.get(`${GITHUB_URL}/search/users?${params}`);
  const { items } = await response.data;
  return items;
};

//   Get Single User Data
export const getUser = async (login) => {
  const response = await axios.get(`${GITHUB_URL}/users/${login}`);

  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.data;
    return data;
  }
};

//   Get User Repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const response = await axios.get(
    `${GITHUB_URL}/users/${login}/repos?${params}`
  );
  const data = await response.data;
  return data;
};
