import * as authService from "../services/auth.js";

/* REGISTER USER */
export const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
    } = req.body;

    try {
        const savedUser = authService.register(firstName, lastName, email, password, picturePath, friends, location, occupation);
        res.status(201).json(savedUser);    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const result = await authService.login(email, password); // посмотреть как правильно передавать ошибка из функции (посмотреть исходники популярных проектов на node js)
        if (result.error) return res.status(400).json({ msg: result.msg});
        res.status(200).json({token: result.token, user: result.user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}