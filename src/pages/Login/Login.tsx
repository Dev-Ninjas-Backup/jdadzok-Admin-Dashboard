import React, { useState, FormEvent, ChangeEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import {
	useForgetPasswordMutation,
	useLoginMutation,
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

interface LoginFormData {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const [forgetPassword, { isLoading: isResetting }] =
		useForgetPasswordMutation();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await login({
				email: formData.email,
				password: formData.password,
			}).unwrap();
			if (!res.success) {
				toast.error(res.message || "Login failed");
				return;
			}
			dispatch(
				setCredentials({
					token: res.data.accessToken,
					user: res.data.user,
				})
			);
			toast.success(res.response?.message || "Login successful");
			navigate("/dashboard");
		} catch {
			toast.error("Login failed");
		}
	};

	const handleForgotPassword = async () => {
		if (!formData.email.trim()) {
			toast.error("Enter your email first");
			return;
		}
		try {
			await forgetPassword({ email: formData.email.trim() }).unwrap();
			toast.success("Password reset email sent");
		} catch {
			toast.error("Failed to send reset email");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
			<div className="w-full max-w-md relative z-10">
				<div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
					<div className="flex flex-col items-center pt-8 pb-6 px-8 bg-white">
						<div className="w-16 h-16 flex items-center justify-center mb-4">
							<img
								src={logo}
								alt="Synqulan"
								className="w-11 h-11 rounded-full object-cover"
							/>
						</div>
						<h3 className="text-[#1F2024] text-2xl font-bold">Synqulan</h3>
						<p className="text-slate-500 text-sm mt-1">
							Sign in to your admin dashboard
						</p>
					</div>

					<div className="px-8 py-6">
						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full pl-11 pr-4 py-3 border text-slate-800 border-slate-300 rounded-lg outline-none transition-all"
										placeholder="admin@example.com"
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="w-full pl-11 pr-12 py-3 text-slate-800 border border-slate-300 rounded-lg outline-none transition-all"
										placeholder="Enter your password"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
									>
										{showPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-[#1447E6] cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-[#153fc0] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
							>
								Sign In
							</button>

							<div className="flex items-center w-full justify-center">
								<button
									type="button"
									onClick={handleForgotPassword}
									disabled={isResetting}
									className="text-[#1447E6] text-sm cursor-pointer hover:text-[#0e2a7e] font-medium disabled:opacity-50"
								>
									{isResetting ? "Sending..." : "Forgot password?"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
