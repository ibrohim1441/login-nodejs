import jwt from "jsonwebtoken";
export function checkToken(req, res, next) {
  try {
    let token = req.headers.token;
    console.log(token);
    if (jwt.verify(token, "Secret")) {
      return next();
    }
    throw new Error("Unauthorized");
  } catch (error) {
    res.send({ status: 401, message: error.message });
  }
}
