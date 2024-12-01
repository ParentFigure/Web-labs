import React from "react";
import Home from "./components/home page/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CatalogPage from "./components/catalog/catalog_page";
import ItemPage from "./components/item page/item_page";
import CartPage from "./components/cart page/cart_page";
import CheckoutPage from "./components/cart page/checkout_page";
import SuccessCartPage from "./components/cart page/success_cart_page";
import SignUpPage from "./components/sign up page/sign_up_page";
import LoginPage from "./components/login page/login_page";
import ProtectedRoute from "./components/protected_route";

function App() {
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/sign-up" element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>

        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/catalog" element={<ProtectedRoute> <CatalogPage /> </ProtectedRoute>}/>
        <Route path="/albums/:id" element={<ProtectedRoute> <ItemPage /> </ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>}/>
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}/>
        <Route path="/success-cart" element={<ProtectedRoute> <SuccessCartPage /></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default App;
