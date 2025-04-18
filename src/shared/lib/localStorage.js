export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Load state error", e);
    return undefined;
  }
};

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (e) {
    console.error("Save state error", e);
  }
};
