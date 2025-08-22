import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function register (firstName, lastName, email, password, picturePath, friends, location, occupation) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000)
    });
    return await newUser.save();
}

export async function login (email, password) {
    const user = await User.findOne(email, password);
    if (!user) return {error: true, msg: "User do not exists."};
    const isMatch = await bcrypt.compare(password, user.password); // посмотреть как передается пользователю соль при использовании bcrypt.compare
    if (!isMatch) return {error: true, msg: "Invalid credentials."};

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;  

    return {error: false, user: user, token: token};
}
