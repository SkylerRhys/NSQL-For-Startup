const { User, Thought } = require('../Models');

module.exports = {
    async getThought(req, res) {
        try {
            const data = await Thought.find();
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const data = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const data = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: data._id } },
                { runValidators: true, new: true }
            )
            res.json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const data = await Thought.findOneAndDelete({ _id: req.params.thoughtId});

            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const data = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
                );

                res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const data = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body } },
                { runValidators: true, new: true },
                );

            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const data = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId }} },
                { runValidators: true, new: true },
                );

            res.json(data);
        }   catch (err) {
            res.status(500).json(err);
        }
    }
};