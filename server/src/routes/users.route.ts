import User from 'db/models/user';
import { HttpError } from 'errors/HttpError';
import { Router } from 'express';

const router = Router();

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
        if (search === '') throw new HttpError('Expected search string', 400);
        const users = await User.find(
            search
                ? {
                      $and: [
                          {
                              $or: [
                                  { username: { $regex: search } },
                                  { email: { $regex: search } },
                              ],
                          },
                          {
                              _id: { $ne: req.user._id },
                          },
                      ],
                  }
                : {}
        )
            .skip(+limit * +page)
            .limit(+limit)
            .lean();
        if (!users || users.length === 0)
            throw new HttpError('Users not found', 404);
        req.response = {
            code: 200,
            status: 'success',
            message: 'users found',
            data: users,
        };
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/', handleSearch);

export default router;
