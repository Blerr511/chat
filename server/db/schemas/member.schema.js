const { Schema, model } = require('mongoose');
const { Role } = require('./role.schema');

const MemberSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'role',
        },
    },
    { _id: false, autoIndex: false, id: false, validateBeforeSave: false }
);

MemberSchema.pre('save', async function () {
    if (!this.role) {
        const userRole = await Role.findOne({ name: 'user' });
        this.role = userRole;
    }
});

/**
 * set user role by role name , creat if role not exists
 * @param {String} name - role name
 */
MemberSchema.methods.setRole = async function (name) {
    let role = await Role.findOne({ name });
    if (!role) {
        role = new Role({ name });
        await role.save();
    }
    this.role = role;
};

const Member = model('member', MemberSchema);

module.exports = { Member, MemberSchema };
