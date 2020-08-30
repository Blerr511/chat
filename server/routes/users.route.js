const router = require("express").Router();

const User = require("../mongodb/schemas/user.schema");
const { userErrors } = require("../messages/error/mongoose.error");
const catchHelper = require("../helpers/catch.helper");

/**
 * Handle create or get new room request
 * @param {ExpressRequest} req - request
 * @param {ExpressResponse} res - response
 * @param {ExpressNextFunction} next - next callback
 * @return {Promise<void>}
 */
const handleSearch = async (req, res, next) => {
    try {
        const { search, page = 0, limit = 500 } = req.query;
        if (search === "") throw new Error(userErrors.no_users);

        const users = await User.find(
            search
                ? {
                      $or: [
                          { username: { $regex: search } },
                          { email: { $regex: search } },
                      ],
                  }
                : {}
        )
            .skip(+limit * +page)
            .limit(+limit)
            .lean();
        if (!users || users.length === 0) throw new Error(userErrors.no_users);
        req.response = {
            code: 200,
            status: "success",
            message: "users found",
            data: users,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};

router.get("/", handleSearch);

module.exports = router;
