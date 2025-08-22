import * as usersService from "../services/users.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.getUser(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.getUser(id);
        const friends = usersService.getUserFriends(user);
        const formattedFriends = usersService.formatUserFriends(friends);
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const friends = await usersService.addRemoveFriend(id, friendId);
        const formattedFriends = usersService.formatUserFriends(friends);
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}