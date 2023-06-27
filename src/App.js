import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Swap from "./pages/Swap";
import Buy from "./pages/Buy";
import VerifyEmail from "./pages/VerifyEmail";
import { Provider } from "react-redux";
import store from "./redux/store";
import Users from "./pages/Users";
import Send from "./pages/Send";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import LiveChart from "./pages/LiveChart";
import CoinChart from "./pages/CoinChart";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/swap" element={<Swap />}></Route>
            <Route path="/buy" element={<Buy />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot" element={<ForgotPassword />}></Route>
            <Route
              path="/account/verify-email"
              element={<VerifyEmail />}
            ></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/account/reset-password"
              element={<ResetPassword />}
            ></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/send" element={<Send />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="/terms-condition" element={<TermsCondition />}></Route>
            <Route path="/chart" element={<LiveChart />}></Route>
            <Route path="/chart/:id" element={<CoinChart />}></Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
