const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dayjs(date).format('MM/DD/YY hh:mm:ss a'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

module.exports = reactionSchema;