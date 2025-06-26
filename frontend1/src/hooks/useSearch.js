import { useAppContext } from "../context/AppContext";

export function useSearch() {
  const { state, dispatch } = useAppContext();
  const setSearch = value => dispatch({ type: "SET_SEARCH", payload: value });
  return {
    search: state.search,
    setSearch,
  };
}
