const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: { unique: true },
        },
        permissions: { type: [String], default: [] },
    },
    { versionKey: false }
);

RoleSchema.methods.hasPermission = function (permission) {
    if (this.name === "admin") return true;
    return this.permissions.includes(permission);
};
RoleSchema.statics.initRoles = async function () {
    const user = await this.findOne({ name: "user" });
    if (!user) {
        await Role.create({ name: "user" });
    }
    const admin = await this.findOne({ name: "admin" });
    if (!admin) {
        await Role.create({ name: "admin" });
    }
};

const Role = model("role", RoleSchema);

module.exports = { Role, RoleSchema };
