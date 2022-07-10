import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import useLocalStorage from 'use-local-storage';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user]);

    const[theme, setTheme] = useLocalStorage('theme' ? 'lightTheme' : 'darkTheme')

    const switchTheme = () => {
      const newTheme = theme === 'darkTheme' ? 'lightTheme' : 'darkTheme';
      setTheme(newTheme);
    }

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        theme,
        switchTheme,
      }}
    >
      { children }
    </Context.Provider>
  );
};