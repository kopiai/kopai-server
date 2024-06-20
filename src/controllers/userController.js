const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
require("dotenv").config();

const UserController = {
	register: async (request, h) => {
		try {
			const { name, gender, birth, email, phone, password, address } =
				request.payload;

			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return h.response({ message: "Email already registered" }).code(400);
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await User.create({
				name,
				gender,
				birth,
				email,
				phone,
				password: hashedPassword,
				address,
				photo,
			});

			const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			return h
				.response({
					message: "User registered successfully",
					user: newUser,
					token,
				})
				.code(201);
		} catch (err) {
			console.error(err);
			return h.response({ message: "Error registering user" }).code(500);
		}
	},

	login: async (request, h) => {
		try {
			const { email, password } = request.payload;

			const user = await User.findOne({ where: { email } });
			if (!user) {
				return h.response({ message: "Invalid email or password" }).code(401);
			}

			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				return h.response({ message: "Invalid email or password" }).code(401);
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			return h
				.response({
					message: "User logged in successfully",
					user,
					token,
				})
				.code(200);
		} catch (err) {
			console.error(err);
			return h.response({ message: "Error logging in" }).code(500);
		}
	},

	update: async (request, h) => {
		try {
			const { authorization } = request.headers;
			if (!authorization) {
				return h.response({ message: "No token provided" }).code(401);
			}

			const token = authorization.split(" ")[1];
			let decoded;
			try {
				decoded = jwt.verify(token, process.env.JWT_SECRET);
			} catch (err) {
				return h.response({ message: "Invalid token" }).code(401);
			}

			const { name, gender, birth, email, phone, address } = request.payload;

			const user = await User.findByPk(decoded.id);
			if (!user) {
				return h.response({ message: "User not found" }).code(404);
			}

			user.name = name || user.name;
			user.gender = gender || user.gender;
			user.birth = birth || user.birth;
			user.email = email || user.email;
			user.phone = phone || user.phone;
			user.address = address || user.address;

			await user.save();

			return h
				.response({ message: "User updated successfully", user })
				.code(200);
		} catch (err) {
			console.error(err);
			return h.response({ message: "Error updating user" }).code(500);
		}
	},
};

module.exports = UserController;
