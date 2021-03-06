import React from "react";
import format from "date-format";
import { useDispatch } from "react-redux";
import {
  getAllInvoiceAction,
  getUserInvoices,
} from "../../redux/action/invoiceAction";
import "./AdminStatistics.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getInvoiceDetail } from "./../../redux/action/invoiceAction";
function AdminStatistics() {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => state.invoiceReducer.invoiceList);
  const invoiceDetail = useSelector(
    (state) => state.invoiceReducer.invoiceDetail
  );
  const userInvoices = useSelector(
    (state) => state.invoiceReducer.userInvoices
  );

  // const [cancelBtnFindName, setCancelBtnFindName] = useState(true);

  useEffect(() => {
    dispatch(getAllInvoiceAction());
    // dispatch(getAccountListAction());
  }, [dispatch]);

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

  const findName = (e) => {
    e.preventDefault();
    // setCancelBtnFindName(false);
    const name = document.getElementById("findByName").value;
    // console.log(name);
    dispatch(getUserInvoices(name));
    document.getElementById("InvoiceTable").style.display = "none";
    document.getElementById("FInvoiceTable").style.display = "block";
    document.getElementById("cancelBtnFindName").style.display = "block";
  };

  const cancelFind = (e) => {
    e.preventDefault();
    document.getElementById("findByName").value = "";
    document.getElementById("InvoiceTable").style.display = "block";
    document.getElementById("FInvoiceTable").style.display = "none";
    document.getElementById("cancelBtnFindName").style.display = "none";
  };

  const f_renderInvoice = () => {
    return userInvoices.map((invoice) => {
      let date = format.parse(format.ISO8601_FORMAT, invoice.createdAt);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let datefull = day + "/" + month + "/" + year;
      return (
        <div className="item" key={invoice.InvoiceId}>
          <p>{invoice.InvoiceId}</p>
          <p>{invoice.Username}</p>
          <p>{invoice.InvoiceTotalMoney}</p>
          <p>{datefull}</p>
          <p
            className="btn-danger"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              dispatch(getInvoiceDetail(invoice.InvoiceId));
            }}
          >
            Xem Chi Ti???t
          </p>
        </div>
      );
    });
  };

  const renderInvoice = () => {
    return invoiceList.map((invoice) => {
      let date = format.parse(format.ISO8601_FORMAT, invoice.createdAt);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let datefull = day + "/" + month + "/" + year;
      return (
        <div className="item" key={invoice.InvoiceId}>
          <p>{invoice.InvoiceId}</p>
          <p>{invoice.Username}</p>
          <p>{invoice.InvoiceTotalMoney}</p>
          <p>{datefull}</p>
          <p
            className="btn-danger"
            data-toggle="modal"
            data-target="#modelId"
            onClick={() => {
              dispatch(getInvoiceDetail(invoice.InvoiceId));
            }}
          >
            Xem Chi Ti???t
          </p>
        </div>
      );
    });
  };

  const renderProductsOfInvoice = (products) => {
    return products?.map((product) => {
      return (
        <div className="productList" key={product.ProductId}>
          <img src={product.ProductImage} alt={product.ProductName} />
          <span>{product.ProductName}</span>
          <span>{product.ProductPrice}VND</span>
          <span>{product.Number}</span>
          <span>
            {Number(product.Number) * Number(product.ProductPrice)}VND
          </span>
        </div>
      );
    });
  };

  const modal = () => {
    return (
      <>
        <div
          className="modal fade"
          id="modelId"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi Ti???t H??a ????n</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="productListTitle">
                  <span>H??nh ???nh</span>
                  <span>T??n</span> <span>Gi??</span>
                  <span>S??? L?????ng</span> <span>T???ng Gi??</span>
                </div>
                {renderProductsOfInvoice(invoiceDetail?.ProductList)}

                <div className="totalMoney">
                  <p>T???ng Ti???n: {invoiceDetail?.TotalMoney}VND</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  ????ng
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="StatisticsContent">
        <h3>Th???ng k??</h3>
        <div className="StatisticsNumber">
          <div className="item">
            <p>L???i nhu???n trong th??ng</p>
            <div>
              <p>{moneyInMonth()} VN??</p>
            </div>
          </div>
          <div className="item">
            <p>L???i nhu???n trong n??m</p>
            <div>
              <p>{moneyInYear()} VN??</p>
            </div>
          </div>
          <div className="item">
            <p>S??? h??a ????n trong th??ng</p>
            <div>
              <p>{countInMonth()} ????n</p>
            </div>
          </div>
        </div>
        <div className="find-tool">
          <form>
            <input id="findByName" />
            <button onClick={findName} className="btn-danger" type="submit">
              t??m ki???m theo username
            </button>
            <button
              className="btn-dark"
              style={{ display: "none" }}
              id="cancelBtnFindName"
              onClick={cancelFind}
            >
              H???y t??m ki???m
            </button>
          </form>
          {/* <form>
            <input type="date" />
            <button className="btn-danger" type="submit">
              t??m ki???m theo ng??y
            </button>
          </form> */}
        </div>
        <div className="InvoiceTable" id="InvoiceTable">
          <div className="item title">
            <p>M?? H??a ????n</p>
            <p>Username</p>
            <p>T???ng ti???n</p>
            <p>Ng??y Mua</p>
            <p></p>
          </div>
          {renderInvoice()}
        </div>
        <div
          className="InvoiceTable"
          id="FInvoiceTable"
          style={{ display: "none" }}
        >
          <div className="item title">
            <p>M?? H??a ????n</p>
            <p>Username</p>
            <p>T???ng ti???n</p>
            <p>Ng??y Mua</p>
            <p></p>
          </div>
          {f_renderInvoice()}
        </div>
        {/* <div className="pagination">
          <a href="/">
            <i className="fas fa-arrow-alt-circle-left"></i>
          </a>
          <div>1/1</div>
          <a href="/">
            <i className="fas fa-arrow-alt-circle-right"></i>
          </a>
        </div> */}
      </div>
      {modal()}
    </div>
  );
}

export default AdminStatistics;
