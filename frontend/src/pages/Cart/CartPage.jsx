import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delCartAction,
  getCartListAction,
} from "./../../redux/action/cartAction";
import ProductHeader from "./../../components/productHeader/ProductHeader";
import Footer from "./../../components/footer/Footer";
import "./CartPage.scss";
import { buyItemAction } from "../../redux/action/invoiceAction";
import swal from "sweetalert";
function CartPage() {
  const cartList = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartListAction());
  }, [dispatch]);

  const buyItem = [];

  const sumTotalPrices = () => {
    let totalPrices = 0;
    buyItem.forEach((item) => {
      totalPrices += Number(item.ProductPrice) * Number(item.Number);
    });
    console.log(buyItem);
    document.getElementById("totalPrices").innerHTML = totalPrices;
  };

  const checkBuy = (item) => {
    if (document.getElementById(item.ProductId).checked === true) {
      const obj = {
        ProductId: item.ProductId,
        Number: document.getElementById(item.ProductId + "_Number").value,
        ProductPrice: item.ProductPrice,
      };
      buyItem.push(obj);
    } else {
      const index = buyItem.findIndex(
        (obj) => obj.ProductId === item.ProductId
      );
      buyItem.splice(index, 1);
    }
    sumTotalPrices();
  };

  const changeNumberProduct = (todo, product) => {
    let number = Number(
      document.getElementById(product.ProductId + "_Number").value
    );
    if (!todo) {
      number = number === 1 ? number : number - 1;
    } else {
      number += 1;
    }
    document.getElementById(product.ProductId + "_Number").value = number;
    document.getElementById(product.ProductId + "_Total").innerHTML =
      number * product.ProductPrice + "VND";
    const index = buyItem.findIndex(
      (item) => item.ProductId === product.ProductId
    );
    if (index !== -1) buyItem[index].Number = number;
    sumTotalPrices();
  };

  const inputChange = (e) => {
    // console.log(e.target.id, e.target.value);
    let { id, value, size } = e.target;
    const totalId = id.replace("_Number", "_Total");
    const productId = id.replace("_Number", "");
    if (value < 0) {
      e.target.value *= -1;
      value *= -1;
    }
    // const total =  * Number(size);
    document.getElementById(totalId).innerHTML =
      Number(value) * Number(size) + "VND";
    const index = buyItem.findIndex((item) => item.ProductId === productId);
    if (index !== -1) buyItem[index].Number = value;
    sumTotalPrices();
  };

  const delCart = (id) => {
    dispatch(delCartAction(id));
  };

  const renderCartList = () => {
    return cartList.map((item) => {
      return (
        <div key={item.ProductId} className="item">
          <div className="check">
            <input
              type="checkbox"
              className=""
              name=""
              id={item.ProductId}
              defaultValue=""
              onChange={() => checkBuy(item)}
            />
            <img src={item.ProductImage} alt="" />
          </div>
          <div className="desc">
            <h5>{item.ProductName}</h5>
            <p>Giá: {item.ProductPrice}VND</p>
            <p>Số lượng còn lại: {item.ProductNumber}</p>
          </div>
          <div className="numberCartItem">
            <div>
              <button
                className="btnChangeNumber"
                onClick={() => {
                  changeNumberProduct(false, item);
                }}
              >
                -
              </button>
              <input
                type="number"
                id={item.ProductId + "_Number"}
                size={item.ProductPrice}
                defaultValue={1}
                onChange={inputChange}
              />
              <button
                className="btnChangeNumber"
                onClick={() => {
                  changeNumberProduct(true, item);
                }}
              >
                +
              </button>
            </div>
            <p id={item.ProductId + "_Total"} style={{ textAlign: "center" }}>
              {item.ProductPrice}VND
            </p>
            <div>
              <button
                className="delCart"
                onClick={() => delCart(item.ProductId)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const buyItemSubmit = () => {
    if (buyItem.length === 0) {
      swal("", "Vui lòng chọn sản phẩm bạn muốn mua", "warning");
      return;
    } else {
      if (document.getElementById("Address").value === "") {
        swal("", "Vui lòng nhập địa chi giao hàng", "warning");
        return;
      } else {
        document.getElementById("checkAdd").innerHTML = "";
      }
      const obj = {
        InvoiceTotalMoney: Number(
          document.getElementById("totalPrices").innerHTML
        ),
        VoucherId: null,
        Address: document.getElementById("Address").value,
        productList: buyItem,
      };
      dispatch(buyItemAction(obj));
    }
  };

  return (
    <>
      <ProductHeader />
      <div>
        <div className="container cartContent">
          <h3>Giỏ hàng của bạn</h3>
          <div className="row">
            <div className="col-8 left">
              <div className="cartList">{renderCartList()}</div>
            </div>
            <div className="col-4 right">
              <div className="billContent">
                <h5>Hóa đơn</h5>
                <div className="voucher">
                  <input
                    type="text"
                    id="voucherCode"
                    placeholder="Nhập mã của bạn (Đang cập nhật)"
                    disabled
                  />
                  <button disabled>Áp dụng</button>
                  <span></span>
                </div>
                <input
                  type="text"
                  id="Address"
                  placeholder="nhập địa chỉ giao hàng"
                />
                <span id="checkAdd"></span>

                <h4>
                  Tổng Tiền: <span id="totalPrices">0</span>
                </h4>
                <button type="submit" onClick={buyItemSubmit} className="buy">
                  Mua Hàng
                </button>
                <hr />
                <p>Phương thức thanh toán: Trả tiền mặt khi giao</p>
                <p>Phương thức khác: Đang Cập Nhật</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
