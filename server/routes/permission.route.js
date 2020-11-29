const { Role } = require('../mongodb/schemas/role.schema');

const router = require('express').Router();

/**
 * Handle permission request
 * @type {import("express").RequestHandler}
 */
const handleGetPermissionList = async (req, res, next) => {
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
 * Handle get roles
 * @type {import("express").RequestHandler}
 */
const handleGetRoles = async (req, res, next) => {
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
router.get('/', handleGetRoles);
router.get('/:role', handleGetPermissionList);

module.exports = router;
