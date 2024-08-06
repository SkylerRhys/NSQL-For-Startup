const { User, Thought } = require('../Models');

module.exports = {
    async getUsers(req, res) {
        try {
            const data = await User.find().populate('thoughts').populate('friends');
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const data = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const data = await User.create(req.body);
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const data = await User.findOneAndDelete({ _id: req.params.userId});

            await Thought.deleteMany({ _id: { $in: data.thoughts } });
            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true }
                );

                res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true },
                );

            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const data = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: req.params.friendId },
                { runValidators: true, new: true },
                );

            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    }
};