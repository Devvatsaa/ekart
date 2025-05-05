import { useSelector } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path ="/success" element={<Success/>}></Route>
        <Route path ="/failure" element={<Failure/>}></Route>
        <Route path="/search" element={<SearchResults />}> </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React, { useCallback, useState, useEffect } from "react";
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// // This is your test secret API key.
// const stripePromise = loadStripe("pk_test_51Qr7RcP2DkK5O6onGPK6km8V42lTiZkZf8aWAkqaj2587xjx8xE0SVFe24XeqgWPHwqPiSAjT7dPg1JzoPnooXML00VzwvYdRr");

// const CheckoutForm = () => {
//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("https://sq8rhv-4242.csb.app/create-checkout-session", {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = {fetchClientSecret};

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState('');

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get('session_id');

//     fetch(`https://sq8rhv-4242.csb.app/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === 'open') {
//     return (
//       <Navigate to="/checkout" />
//     )
//   }

//   if (status === 'complete') {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to {customerEmail}.

//           If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }

//   return null;
// }

// const App = () => {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/checkout" element={<CheckoutForm />} />
//           <Route path="/return" element={<Return />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App;