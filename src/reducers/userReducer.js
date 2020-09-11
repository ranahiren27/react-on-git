const userReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      state = [];
      state = [...action.payload];
      return state;
    case "DELETE":
      return state.filter((user) => user._id !== action.payload.id);
    default:
      return state;
  }
};
export default userReducer;
