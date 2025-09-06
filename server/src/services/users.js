import User from "../models/User.js";

export const getUser = async (id) => {
    return await User.findById(id);;
}

export const getUserFriends = async (user) => {
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    return friends;
}

export const formatUserFriends = (friends) => {
    return friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    );
}

export const addRemoveFriend = async (id, friendId) => {
    const user = await getUser(id);
    const friend = await getUser(friendId);
    
    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId); // удаляем пользователя из списка друзей
        friend.friends = friend.friends.at((id) => id !== id);
    } else {
        user.friends.push(friendId);
        friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = getUserFriends(user);

    return friends;
}  