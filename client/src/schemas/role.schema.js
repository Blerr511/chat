const required = true;

const roleSchema = {
    title: "roleSchema",
    type: "object",
    properties: {
        name: { type: "string", required },
        permissions: { type: "array", items: { type: "string" } },
    },
    required,
};
export default roleSchema;
