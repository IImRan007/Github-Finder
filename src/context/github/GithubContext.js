import axios from "axios";
import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //   Get Initial Users(testing purposes)
  const fetchUsers = async () => {
    setLoading();

    const response = await axios.get(`${GITHUB_URL}/users`);
    const data = await response.data;

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  //   Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
