module.exports = class Service {
    start() {
        return Promise.reject(new Error('SERVICE must declare start method'));
    }
};
