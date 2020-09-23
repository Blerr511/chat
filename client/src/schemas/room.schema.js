const { default: messageSchema } = require("./message.schema");
const { default: userSchema } = require("./user.schema");

const required = true;
const roomSchema = {
    title: "roomSchema",
    type: "object",
    properties: {
        _id: {
            type: "string",
            required,
        },
        name: {
            type: "string",
            required,
        },
        createdAt: {
            type: "string",
        },
        members: {
            type: "array",
            items: {
                type: userSchema,
            },
        },
        messages: {
            type: "array",
            items: messageSchema,
        },
    },
};
export default roomSchema;
