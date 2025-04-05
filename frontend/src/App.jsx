import Navbar from "./components/Navbar";

import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import LandingPage from "./pages/Landing";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/userThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const { theme } = useThemeStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth)
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<div
			data-theme={theme}
			className="flex flex-col min-h-screen overflow-hidden"
		>
			<Navbar />

			<main className="flex-1 overflow-hidden">
				<Routes>
					{/* Public landing page */}
					<Route path="/" element={<LandingPage />} />

					{/* Chat page - requires auth */}
					<Route
						path="/chat"
						element={authUser ? <HomePage /> : <Navigate to="/login" />}
					/>

					{/* Auth routes */}
					<Route
						path="/signup"
						element={!authUser ? <SignUpPage /> : <Navigate to="/chat" />}
					/>
					<Route
						path="/login"
						element={!authUser ? <LoginPage /> : <Navigate to="/chat" />}
					/>

					{/* User routes - requires auth */}
					<Route
						path="/settings"
						element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/profile"
						element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
					/>
				</Routes>
			</main>

			<Footer />
			<Toaster />
		</div>
	);
};
export default App;
