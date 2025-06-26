import { useAppContext } from "../context/AppContext";

export function useBookmarks() {
  const { state, dispatch } = useAppContext();
  const addBookmark = userId => dispatch({ type: "ADD_BOOKMARK", payload: userId });
  const removeBookmark = userId => dispatch({ type: "REMOVE_BOOKMARK", payload: userId });
  return {
    bookmarks: state.bookmarks,
    addBookmark,
    removeBookmark,
  };
}
