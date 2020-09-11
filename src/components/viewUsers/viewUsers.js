import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomToast from "../customToast/customToast";
import { deleteUserById } from "../../services";
import "./viewUsers.css";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../actions/userActions";

export default function ViewUsers(props) {
  let state = useSelector((state) => state);
  const [allUsers, setAllUser] = useState(state);
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [lastNameSort, setLastNameSort] = useState(0);
  const [DOBSort, setDOBSort] = useState(0);
  const [users, setUsers] = useState(null);
  const [toastMsg, setMsg] = useState("");
  const dispatch = useDispatch();

  const previous = () => {
    if (skip >= 0) {
      setSkip(skip - limit);
    }
  };
  const next = () => {
    if (skip + limit <= state.length) {
      setSkip(skip + limit);
    }
  };

  const sortWithDOB = () => {
    if (DOBSort === 0) {
      setDOBSort(1);
      const data = users;
      data.sort((a, b) => {
        if (a.DOB < b.DOB) {
          return 1;
        }
        if (a.DOB > b.DOB) {
          return -1;
        }
        return 0;
      });
      setUsers(data);
    } else if (DOBSort === 1) {
      setDOBSort(-1);
      const data = users;
      data.sort((a, b) => {
        if (a.DOB < b.DOB) {
          return 1;
        }
        if (a.DOB > b.DOB) {
          return -1;
        }
        return 0;
      });
      data.reverse();
      setUsers(data);
    } else {
      setDOBSort(0);
      setUsers(state.slice(skip, limit + skip));
    }
  };

  const sortWithLastName = () => {
    if (lastNameSort === 0) {
      setLastNameSort(1);
      const data = users;
      data.sort((a, b) => {
        if (a.LastName < b.LastName) {
          return 1;
        }
        if (a.LastName > b.LastName) {
          return -1;
        }
        return 0;
      });
      setUsers(data);
    } else if (lastNameSort === 1) {
      setLastNameSort(-1);
      const data = users;
      data.sort((a, b) => {
        if (a.LastName < b.LastName) {
          return 1;
        }
        if (a.LastName > b.LastName) {
          return -1;
        }
        return 0;
      });
      data.reverse();
      setUsers(data);
    } else {
      setLastNameSort(0);
      setUsers(state.slice(skip, limit + skip));
    }
  };

  const searchByName = (e) => {
    if (e.target.value !== "") {
      let data = [];
      const name = e.target.value;
      state.forEach((user) => {
        if (
          user.FirstName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        ) {
          data.push(user);
        }
      });
      setUsers(data);
    } else {
      setUsers(state.slice(skip, limit + skip));
    }
    console.log(users);
  };

  const deleteUser = async (id) => {
    try {
      const response = await deleteUserById(id);
      console.log(response);
      if (response.data) {
        setMsg(response.data.user);
        dispatch(userActions.deleteUser(id));
        const newUsers = state.filter((user) => user._id !== id);
        setAllUser(newUsers);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (allUsers !== undefined) {
      setUsers(allUsers.slice(skip, limit + skip));
    } else {
      setAllUser([]);
    }
  }, [skip, allUsers]);

  const trs = [];
  if (users !== null) {
    users.forEach((user) => {
      const date = new Date(user.DOB);
      trs.push(
        <tr>
          <td>{user.FirstName}</td>
          <td>{user.LastName}</td>
          <td>{user.email}</td>
          <td>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</td>
          <td>{user.Bio}</td>
          <td style={{ display: "flex" }}>
            <div style={{ paddingRight: "20px" }}>
              <MdDelete onClick={(e) => deleteUser(user._id)} />
            </div>
            <div>
              <Link to={`create/${user._id}`}>
                <FiEdit />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state !== undefined) {
    setUsers(state.slice(skip, limit + skip));
  }
  if (state !== undefined) {
    console.log(skip, limit, state.length);
  }
  return (
    <div>
      <div>
        <Link to="" style={{ color: "whitesmoke" }}>
          Home
        </Link>
      </div>
      {state === undefined && (
        <div style={{ color: "whitesmoke" }}>Loading...</div>
      )}
      {state !== undefined && (
        <div>
          <input
            type="text"
            placeholder="Search with First Name"
            onChange={searchByName}
          />
          <Table striped bordered hover style={{ color: "whitesmoke" }}>
            <tr>
              <td>First Name</td>
              <td onClick={sortWithLastName}>Last Name</td>
              <td>Email</td>
              <td onClick={sortWithDOB}>DOB</td>
              <td>Bio</td>
            </tr>
            {trs}
          </Table>
          <div
            style={{ color: "skyblue", textAlign: "center", cursor: "pointer" }}
          >
            {skip !== 0 && <h2 onClick={previous}>{`<-`}</h2>}
            {skip + limit <= state.length && <h2 onClick={next}>{`->`}</h2>}
          </div>
        </div>
      )}
      {toastMsg !== "" && <CustomToast msg={toastMsg} />}
    </div>
  );
}
