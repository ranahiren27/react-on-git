export const addUsers = (data) => {
  return {
    type: "ADD",
    payload: data,
  };
};

export const deleteUser = (id) => {
  return {
    type: "DELETE",
    payload: id,
  };
};
