import Role from './models/role';
import mongoose from 'mongoose';
import config from '../config';
import 'colors';

// ---------------------------------------------------------- //
const connectDb = () => {
    return mongoose
        .connect(process.env.MONGO_STRING || config.mongoString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            Role.initRoles();
            console.log(
                'Connected to mongodb ' +
                    (process.env.MONGO_STRING || config.mongoString).blue
            );
        })
        .catch((err) => {
            console.log(
                `Connection to mongodb ${
                    process.env.MONGO_STRING || config.mongoString
                } failed`
            );
            console.error(err);
        });
};

export default connectDb;
