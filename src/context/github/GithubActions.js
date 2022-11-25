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
