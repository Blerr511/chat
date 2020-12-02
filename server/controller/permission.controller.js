const { Role } = require('../db/schemas/role.schema');

/**
 * @type {import("express").RequestHandler}
 */
const getRolePermissions = async (req, res, next) => {
    try {
        const { role } = req.params;
        const myRole = await Role.findOne({ name: role }).lean();
        if (!myRole) throw new Error(`${role} role not found`);
        req.response = {
            code: 200,
            status: 'success',
            data: myRole.permissions,
        };
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * @type {import("express").RequestHandler}
 */
const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({}).lean();
        req.response = {
            code: 200,
            status: 'success',
            data: roles,
        };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRolePermissions,
    getAllRoles,
};
