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
import ClientPage from "./pages/Client/ClientPage";
import NotFound from "./pages/404/NotFound";

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
          {/* Cart */}
          <Route path="/cart">
            <CartPage/>
          </Route>
          {/* Client */}
          <Route path="/user">
            <ClientPage/>
          </Route>
          {/* Sign In */}
          <Route path="/sign-in" exact={true}>
            <SignInPage />
          </Route>
          {/* Sign Up */}
          <Route path="/sign-up" exact={true}>
            <SignUpPage />
          </Route>
          {/* Admin */}
          <Route path="/super-admin" exact={true}>
            <Guard>
              <AdminPage/>
            </Guard>
          </Route>
           {/* else */}
           <Route path="/*" exact={true}>
            <NotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
