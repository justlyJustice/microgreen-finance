import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";

import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";

import NewPassword from "./pages/auth/NewPassword";

import { useBalancePolling } from "./hooks/useBalancePolling";
import { useAuthStore } from "./stores/authStore";

import useTransactions from "./hooks/useTransactions";
import ConvertUSD from "./pages/ConvertUSD";
import FundNaira from "./pages/FundNaira";
import Vouchers from "./pages/voucher/Vouchers";
import LoanForm from "./pages/loan/LoanForm";
import AppliedLoansPage from "./pages/loan/AppliedLoans";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener(
      "beforeunload",
      import.meta.env.MODE === "development" ? () => {} : handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        import.meta.env.MODE === "development" ? () => {} : handleBeforeUnload
      );
    };
  }, []);

  useTransactions();
  useBalancePolling(user?.id);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ removeDelay: 6000 }} />

      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/recovery/forgot-password"
          element={
            !isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/recovery/verify-email"
          element={
            !isAuthenticated ? <VerifyCode /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/recovery/set-new-password"
          element={
            !isAuthenticated ? <NewPassword /> : <Navigate to="/dashboard" />
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-funds/naira" element={<FundNaira />} />
            <Route path="/add-funds/usd" element={<ConvertUSD />} />
            <Route path="/vouchers/purchased" element={<Vouchers />} />
            <Route path="/vouchers/purchase" element={<Vouchers />} />
            <Route path="/loan/apply" element={<LoanForm />} />
            <Route path="/loan/applied-loans" element={<AppliedLoansPage />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
