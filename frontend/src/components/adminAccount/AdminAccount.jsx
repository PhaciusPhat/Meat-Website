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
  const [accountNeedUpdate, setAccountNeedsUpdate] = useState(null);
  useEffect(() => {
    dispatch(getAccountListAction());
  }, [dispatch]);

  const [selectedOpt, setSelectedOpt] = useState(false);
  const [account, setAccount] = useState({
    Username: "",
    Phone: "",
    Email: "",
    // Role: "",
  });
  const [error, setError] = useState({
    Username: "",
    Phone: "",
    Email: "",
    // Role: "",
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return re.test(phone);
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
        if (key === "Phone") {
          if (!validatePhone(account[key])) {
            temp[key] = "SDT sai định dạng";
            check = false;
          } else {
            setError({
              ...error,
              [key]: "",
            });
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
    // console.log();
    if (validate()) {
      let newAccount = {
        ...account,
        Role: Boolean(selectedOpt),
        Password: account.Username,
        Address: null,
      };
      setSelectedOpt(false);
      dispatch(addAccAction(newAccount));
    }
  };

  const delAcc = (Username) => {
    dispatch(delAccAction(Username));
  };

  const chooseAccountNeedUpdate = (account) => {
    setAccountNeedsUpdate(account);
  };

  const renderAccount = () => {
    return accountList.map((account) => {
      return (
        <div className="item" key={account.Username}>
          <div className="itemDiv">{account.Username}</div>
          <div className="itemDiv">{account.Email}</div>
          <div className="itemDiv">{account.Phone}</div>
          <div className="itemDiv">
            {account.Role ? "Quản trị viên" : "Khách Hàng"}
          </div>
          <div className="itemDiv">
            <button
              className="btn btn-info mr-1"
              data-toggle="modal"
              data-target={"#updateAcc"}
              onClick={() => chooseAccountNeedUpdate(account)}
            >
              sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => delAcc(account.Username)}
            >
              xóa
            </button>
          </div>
        </div>
      );
    });
  };

  const updateForm = () => {
    {
      /* sửa */
    }
    return (
      <div
        className="modal fade"
        id={"updateAcc"}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title text-dark">Cập nhật tài khoản</div>
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
              <label htmlFor="changeAcc">Quyền: </label>
              <select
                name="changeAcc"
                id="changeAcc"
                onChange={(e) => {
                  setSelectedOpt(e.target.value);
                }}
                defaultValue={false}
              >
                <option value={false}>Khách Hàng</option>
                <option value={true}>Quản trị</option>
              </select>
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
                onClick={() => handleSubmitU(accountNeedUpdate)}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmitU = (account) => {
    // console.log(, selectedOpt);
    account = {
      ...account,
      Role: selectedOpt === 'true',
    };
    // console.log(account);

    dispatch(updateAccAction(account));
  };

  return (
    <div className="container-fluid">
      <div className="AccountContent">
        <h3>Quản Lý Tài Khoản</h3>
        <div className="InvoiceTable">
          <div className="item title" id="list">
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
                <label htmlFor="role">Chọn quyền: </label>
                <select
                  name="role"
                  id="role"
                  onChange={(e) => {
                    setSelectedOpt(e.target.value);
                  }}
                >
                  <option value={false}>Khách Hàng</option>
                  <option value={true}>Quản trị</option>
                </select>
                {/* <input
                  onChange={handleChange}
                  name="Role"
                  placeholder="Quyền"
                />
                <span>{error.Role}</span> */}
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
      {/* update */}
      {updateForm()}
    </div>
  );
}

export default AdminAccount;
