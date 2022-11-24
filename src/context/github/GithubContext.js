import axios from "axios";
import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //   Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await axios.get(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.data;

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

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

  //   Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  //   Clear Users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
