const controller = require('../controller');

const router = require('express').Router();

router.get('/', controller.permission.getAllRoles);

router.get('/:role', controller.permission.getRolePermissions);

module.exports = router;
