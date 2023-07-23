export function check(req, res, next) {
    try {
        return next();
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
}
