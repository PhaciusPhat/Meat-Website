import React from "react";
import format from "date-format";
import { useDispatch } from "react-redux";
import { getAllInvoiceAction } from "../../redux/action/invoiceAction";
import "./AdminStatistics.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function AdminStatistics() {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => state.invoiceReducer.invoiceList);
  // const accountList = useSelector((state) => state.accountReducer.accountList);

  useEffect(() => {
    dispatch(getAllInvoiceAction());
    // dispatch(getAccountListAction());
  }, []);

  const moneyInMonth = () => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    let sum = 0;
    invoiceList.forEach((element) => {
      let month =
        format.parse(format.ISO8601_FORMAT, element.createdAt).getMonth() + 1;
      if (month === thisMonth) {
        sum += Number(element.InvoiceTotalMoney);
      }
    });
    return sum;
  };

  const moneyInYear = () => {
    const today = new Date();
    const thisYear = today.getFullYear();
    let sum = 0;
    invoiceList.forEach((element) => {
      let year = format
        .parse(format.ISO8601_FORMAT, element.createdAt)
        .getFullYear();
      if (year === thisYear) {
        sum += Number(element.InvoiceTotalMoney);
      }
    });
    return sum;
  };

  const countInMonth = () => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    let count = 0;
    invoiceList.forEach((element) => {
      let month =
        format.parse(format.ISO8601_FORMAT, element.createdAt).getMonth() + 1;
      if (month === thisMonth) {
        count += 1;
      }
    });
    return count;
  };

  // const findName = (id) => {
  //   let name;
  //   accountList.forEach((user) => {
  //     if (user.id === id) {
  //       name = user.Username;
  //     }
  //   });
  //   return name;
  // };

  const renderInvoice = () => {
    return invoiceList.map((invoice) => {
      let date = format.parse(format.ISO8601_FORMAT, invoice.createdAt);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let datefull = day + "/" + month + "/" + year;
      // let datefull = "27/12/2001  ";
      return (
        <div className="item" key={invoice.InvoiceId}>
          <p>{invoice.InvoiceId}</p>
          <p>{invoice.Username}</p>
          <p>{invoice.InvoiceTotalMoney}</p>
          <p>{datefull}</p>
          <p className="btn-danger">Xem Chi Tiết</p>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="StatisticsContent">
        <h3>Thống kê</h3>
        <div className="StatisticsNumber">
          <div className="item">
            <p>Lợi nhuận trong tháng</p>
            <div>
              <p>{moneyInMonth()} VNĐ</p>
            </div>
          </div>
          <div className="item">
            <p>Lợi nhuận trong năm</p>
            <div>
              <p>{moneyInYear()} VNĐ</p>
            </div>
          </div>
          <div className="item">
            <p>Số hóa đơn trong tháng</p>
            <div>
              <p>{countInMonth()} Đơn</p>
            </div>
          </div>
        </div>
        <div className="find-tool">
          <form>
            <input />{" "}
            <button className="btn-danger" type="submit">
              tìm kiếm theo tên
            </button>
          </form>
          <form>
            <input type="date" />{" "}
            <button className="btn-danger" type="submit">
              tìm kiếm theo ngày
            </button>
          </form>
        </div>
        <div className="InvoiceTable">
          <div className="item title">
            <p>Mã Hóa đơn</p>
            <p>Username</p>
            <p>Tổng tiền</p>
            <p>Ngày Mua</p>
            <p></p>
          </div>
          {renderInvoice()}
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;
