import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminAccount.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addAccAction,
  delAccAction,
  getAccountListAction,
  updateAccAction,
} from "../../redux/action/accountAction";
function AdminAccount() {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.accountReducer.accountList);

  useEffect(() => {
    dispatch(getAccountListAction());
  }, []);

  const [account, setAccount] = useState({
    Username: "",
    Phone: "",
    Email: "",
    Role: "",
  });
  const [error, setError] = useState({
    Username: "",
    Phone: "",
    Email: "",
    Role: "",
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError({
        ...error,
        [name]: "Không được bỏ trống",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const validate = () => {
    let check = true;
    let temp = { ...error };
    for (const key in account) {
      if (account[key].trim() === "") {
        check = false;
        temp[key] = "Không được bỏ trống";
      } else {
        if (key === "Email") {
          if (!validateEmail(account[key])) {
            temp[key] = "Email sai định dạng";
            check = false;
          } else {
            setError({
              ...error,
              [key]: "",
            });
          }
        }
        if (key === "Role") {
          if (account[key] === "client" || account[key] === "admin") {
            setError({
              ...error,
              [key]: "",
            });
          } else {
            temp[key] = "Quyền là 'admin' hoặc 'client'";
            check = false;
          }
        }
      }
    }
    if (check === false) {
      setError({
        ...temp,
      });
    }
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let newAccount = {
        ...account,
        Password: account.Username,
        Address: null,
      };
      dispatch(addAccAction(newAccount));
    }
  };

  const delAcc = (id) => {
    dispatch(delAccAction(id));
  };

  const renderAccount = () => {
    return accountList.map((account) => {
      return (
        <div className="item" key={account.id}>
          <div className="itemDiv">{account.Username}</div>
          <div className="itemDiv">{account.Email}</div>
          <div className="itemDiv">{account.Phone}</div>
          <div className="itemDiv">{account.Role ? "Quản trị viên" : "Khách Hàng"}</div>
          <div className="itemDiv">
            <button
              className="btn btn-info mr-1"
              data-toggle="modal"
              data-target={"#updateAcc" + account.id}
            >
              sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => delAcc(account.id)}
            >
              xóa
            </button>

            {/* sửa */}
            <div
              className="modal fade"
              id={"updateAcc" + account.id}
              tabIndex={-1}
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-title text-dark">
                      Cập nhật tài khoản
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input
                      onChange={updateChange}
                      name="RoleUpdate"
                      placeholder={account.Role}
                      className="w-100"
                    />
                    <span className="text-danger" style={{ fontSize: 12 }}>
                      {newError.RoleUpdate}
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleSubmitU(account.id)}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const [newError, setNewError] = useState({
    RoleUpdate: "",
  });

  const [update, setUpdate] = useState({
    RoleUpdate: "",
  });

  const validateU = () => {
    let check = true;
    let temp = { ...newError };
    for (const key in update) {
      if (update[key].trim() === "") {
        check = false;
        temp[key] = "Không được bỏ trống";
      } else {
        if (key === "RoleUpdate") {
          if (update[key] === "client" || update[key] === "admin") {
            setNewError({
              ...newError,
              [key]: "",
            });
          } else {
            temp[key] = "Quyền là 'admin' hoặc 'client'";
            check = false;
          }
        }
      }
    }
    if (check === false) {
      setNewError({
        ...temp,
      });
    }
    return check;
  };

  const handleSubmitU = (id) => {
    if (validateU()) {
      const index = accountList.findIndex((acc) => acc.id === id);
      let newAccount = {
        ...accountList[index],
        Role: update.RoleUpdate,
      };
      dispatch(updateAccAction(id, newAccount));
    }
  };

  const updateChange = (e) => {
    const { name, value } = e.target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };

  const [found, setFound] = useState({
    found: [],
  });

  const findAcc = () => {
    let temp = [];
    const find = document.getElementById("find").value;
    accountList.forEach((acc) => {
      if (acc.Username.indexOf(find) !== -1) {
        temp.push(acc);
      }
    });
    setFound({
      found: temp,
    });
  };

  const renderFound = () => {
    return found.found.map((account) => {
      return (
        <div className="item" key={account.id}>
          <div className="itemDiv">{account.Username}</div>
          <div className="itemDiv">{account.Email}</div>
          <div className="itemDiv">{account.Phone}</div>
          <div className="itemDiv">{account.Role}</div>
          <div className="itemDiv">
            Đang Cập Nhật
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="AccountContent">
        <h3>Quản Lý Tài Khoản</h3>
        <div className="find">
          <input id="find" />
          <button className="btn-danger" onClick={findAcc}>Tìm Kiếm theo tên</button>
        </div>
        {/* <div className="FindTable">
          <div className="item title">
            <p>Username</p>
            <p>Email</p>
            <p>Số Điện Thoại</p>
            <p>Vai Trò</p>
            <p>Chức Năng</p>
          </div>
          {renderFound()}
        </div> */}
        <div className="InvoiceTable">
          <div className="item title">
            <p>Username</p>
            <p>Email</p>
            <p>Số Điện Thoại</p>
            <p>Vai Trò</p>
            <p>Chức Năng</p>
          </div>
          {renderAccount()}
        </div>
        <div className="addAcc">
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#addModel"
          >
            Thêm
          </button>
        </div>
      </div>
      {/* add */}
      <div
        className="modal fade"
        id="addModel"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thêm Tài Khoản</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modelInput">
              <div>
                <input
                  onChange={handleChange}
                  name="Username"
                  placeholder="Tài Khoản"
                />
                <span>{error.Username}</span>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  name="Email"
                  placeholder="Email"
                />
                <span>{error.Email}</span>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  name="Phone"
                  type="number"
                  placeholder="Số Điện Thoại"
                />
                <span>{error.Phone}</span>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  name="Role"
                  placeholder="Quyền"
                />
                <span>{error.Role}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
