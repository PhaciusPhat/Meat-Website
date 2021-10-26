import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delCartAction,
  getCartListAction,
} from "./../../redux/action/cartAction";
import ProductHeader from "./../../components/productHeader/ProductHeader";
import Footer from "./../../components/footer/Footer";
import "./CartPage.css";
import { buyItemAction } from "../../redux/action/invoiceAction";
function CartPage() {
  const cartList = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartListAction());
  }, [dispatch]);

  const buyItem = [];

  const checkBuy = (item) => {
    if (document.getElementById(item.ProductName).checked === true) {
      const obj = {
        ProductId: item.ProductId,
        Number: document.getElementById(item.ProductName + "Number").value,
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

  const sumTotalPrices = () => {
    let totalPrices = 0;
    buyItem.forEach((item) => {
      totalPrices += Number(item.ProductPrice) * Number(item.Number);
    });
    document.getElementById("totalPrices").innerHTML = totalPrices;
  };

  const decrease = (ProductId, id, price, total) => {
    let number = document.getElementById(id).value;
    if (Number(number) === 1) return;
    else {
      number = Number(number) - 1;
    }
    document.getElementById(id).value = number;
    let totalItem = Number(number) * price;
    document.getElementById(total).innerHTML = totalItem;
    const index = buyItem.findIndex((item) => item.ProductId === ProductId);
    if (index !== -1) buyItem[index].Number = Number(number);
    sumTotalPrices();
  };

  const increase = (ProductId, id, price, total) => {
    let number = document.getElementById(id).value;
    number = Number(number) + 1;
    let totalItem = Number(number) * price;
    document.getElementById(id).value = number;
    document.getElementById(total).innerHTML = totalItem;
    const index = buyItem.findIndex((item) => item.ProductId === ProductId);
    if (index !== -1) buyItem[index].Number = Number(number);
    sumTotalPrices();
  };

  const inputChange = (e) => {
    let { name, size, value } = e.target;
    if (value <= 0) {
      e.target.value = 1;
      value = 1;
    }
    const total = Number(value) * Number(size);
    document.getElementById(name + "totalItem").innerHTML = total;
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
              id={item.ProductName}
              defaultValue=""
              onChange={() => checkBuy(item)}
            ></input>
            <img src={item.ProductImage} alt="" />
          </div>
          <div className="desc">
            <h4>{item.ProductName}</h4>
            <p>Giá: {item.ProductPrice}</p>
            <p>Số lượng: {item.ProductNumber}</p>
          </div>
          <div className="numberCartItem">
            <button
              onClick={() =>
                decrease(
                  item.ProductId,
                  item.ProductName + "Number",
                  item.ProductPrice,
                  item.ProductName + "totalItem"
                )
              }
            >
              -
            </button>
            <input
              type="number"
              id={item.ProductName + "Number"}
              name={item.ProductName, item.ProductId}
              size={item.ProductPrice}
              defaultValue={item.Number}
              onChange={inputChange}
              disabled
            />
            <button
              onClick={() =>
                increase(
                  item.ProductId,
                  item.ProductName + "Number",
                  item.ProductPrice,
                  item.ProductName + "totalItem"
                )
              }
            >
              +
            </button>
            <p
              id={item.ProductName + "totalItem"}
              style={{ textAlign: "center" }}
            >
              {item.ProductPrice}
            </p>
            <div>
              <button className="delCart" onClick={() => delCart(item.ProductId)}>
                xóa
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const buyItemSubmit = () => {
    if (buyItem.length === 0) {
      alert("Không có sản phẩm nào để thanh toán");
      return;
    } else {
      if (document.getElementById("Address").value === "") {
        document.getElementById("checkAdd").style.color = "red";
        document.getElementById("checkAdd").innerHTML = "vui lòng nhập địa chỉ";
        return;
      } else {
        document.getElementById("checkAdd").innerHTML = "";
      }
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const obj = {
        InvoiceTotalMoney: Number(
          document.getElementById("totalPrices").innerHTML
        ),
        VoucherId: null,
        InvoiceBuyDate: `${date} ${time}`,
        Address: document.getElementById("Address").value,
        productList: buyItem,
      };
      dispatch(buyItemAction(obj));
    }
  };

  return (
    <>
      <ProductHeader />
      <div style={{ marginTop: 80, paddingTop: 30 }}>
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
