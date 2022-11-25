import axios from "axios";
import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //   Get Single User Data
  const getUser = async (login) => {
    setLoading();

    const response = await axios.get(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.data;

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //   Get User Repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await axios.get(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.data;

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //   Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  //   Clear Users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
