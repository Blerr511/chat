const required = true;
const messageSchema = {
    title: "messageSchema",
    type: "object",
    properties: {
        sender: {
            type: "string",
            required,
        },
        data: {
            type: "string",
            required,
        },
    },
    required: true,
};

export default messageSchema;
