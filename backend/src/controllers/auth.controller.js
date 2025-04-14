import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
	const { z, email, password, language, enableTextToSpeech } = req.body;
	try {
		if (!username || !email || !password) {
			return res
				.status(400)
				.json({ message: "Username, email, and password are required" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		}

		// Check for existing user by email
		const emailExists = await User.findOne({ email });
		if (emailExists)
			return res.status(400).json({ message: "Email already exists" });

		// Check for existing username
		const usernameExists = await User.findOne({ username });
		if (usernameExists)
			return res.status(400).json({ message: "Username already taken" });

		// Create new user with all fields
		const newUser = new User({
			username,
			email,
			password, // will be hashed by pre-save hook
			language: language || "en",
			enableTextToSpeech:
				enableTextToSpeech !== undefined ? enableTextToSpeech : true,
		});

		if (newUser) {
			// generate jwt token here
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				profileImage: newUser.profileImage,
				language: newUser.language,
				enableTextToSpeech: newUser.enableTextToSpeech,
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Update user's online status
		user.isOnline = true;
		await user.save();

		generateToken(user._id, res);

		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			profileImage: user.profileImage,
			language: user.language,
			enableTextToSpeech: user.enableTextToSpeech,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		// Set user offline if token exists
		if (req.user) {
			const user = await User.findById(req.user._id);
			if (user) {
				user.isOnline = false;
				await user.save();
			}
		}

		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profileImage, language, enableTextToSpeech, username } = req.body;
		const userId = req.user._id;

		const updateData = {};

		// Handle profile image if provided
		if (profileImage) {
			try {
				const uploadResponse = await cloudinary.uploader.upload(profileImage);
				updateData.profileImage = uploadResponse.secure_url;
			} catch (error) {
				console.error("Error uploading image:", error);
				return res
					.status(400)
					.json({ message: "Failed to upload profile image" });
			}
		}

		// Update language if provided
		if (language) {
			updateData.language = language;
		}

		// Update text-to-speech preference if provided
		if (enableTextToSpeech !== undefined) {
			updateData.enableTextToSpeech = enableTextToSpeech;
		}

		// Update username if provided
		if (username) {
			// Check if username is already taken (by another user)
			const existingUser = await User.findOne({
				username,
				_id: { $ne: userId },
			});
			if (existingUser) {
				return res.status(400).json({ message: "Username already taken" });
			}
			updateData.username = username;
		}

		// Only update if there's something to update
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No valid update data provided" });
		}

		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
		}).select("-password");

		res.status(200).json(updatedUser);
	} catch (error) {
		console.log("Error in update profile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log("Error in checkAuth controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
