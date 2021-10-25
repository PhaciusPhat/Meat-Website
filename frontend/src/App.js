import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import StoryPage from "./pages/Story/StoryPage";
import ContactPage from "./pages/Contact/ContactPage";
// import ProductPage from "./pages/Product/ProductPage";
import ListProductPage from "./pages/ListProduct/ListProductPage";
import CartPage from './pages/Cart/CartPage';
import Guard from "./decentralization/Guard";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* Home */}
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          {/* Story */}
          <Route path="/story" exact={true}>
            <StoryPage />
          </Route>
          {/* Contact */}
          <Route path="/contact" exact={true}>
            <ContactPage />
          </Route>
          {/* List Product */}
          <Route path="/list-product" exact={true}>
            <ListProductPage />
          </Route>
          {/* Product (delay) */}
          {/* <Route path="/product/:id" exact={true}></Route> */}
          {/* Cart */}
          <Route path="/cart">
            <CartPage/>
          </Route>
          {/* Sign In */}
          <Route path="/sign-in" exact={true}>
            <SignInPage />
          </Route>
          {/* Sign Up */}
          <Route path="/sign-up" exact={true}>
            <SignUpPage />
          </Route>
          <Route path="/super-admin" exact={true}>
            <Guard>
              <AdminPage/>
            </Guard>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
