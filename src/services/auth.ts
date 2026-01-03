import client from "../services/client";
import { User } from "../stores/authStore";

type Data = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string;
  gender: string;
};

interface ResUser extends Exclude<User, "joinDate"> {
  _id: string;
  createdAt: string;
}

// Registration/Login
export const loginUser = (data: { email: string; password: string }) =>
  client.post<{
    success: boolean;
    data: {
      user: ResUser;
      token: string;
    };
    message: string;
  }>("/auth/login", data);

export const verifyOTP = (data: { email: string; emailOTP: string }) =>
  client.post<{
    success: boolean;
    data: { [key: string]: any };
    user: { [key: string]: any };
  }>("/auth/verify-login-otp", data);

export const registerUser = (data: Data) =>
  client.post<{
    success: boolean;
    error?: string;
    user: Record<string, string>;
  }>("/auth/signup", data);

// Password Reset
export const requestPasswordRequest = (email: string) =>
  client.post("/auth/request-password-reset", { email });

export const resetPassword = ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => client.post("/auth/reset-password", { email, newPassword });

export const verifyResetCode = (data: { email: string; emailOTP: string }) =>
  client.post("/auth/verify-password-otp", data);
