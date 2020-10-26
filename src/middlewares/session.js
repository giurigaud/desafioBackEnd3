const jwt = require("jsonwebtoken");
const response = require("../controllers/response");

require("dotenv").config();

const verify = async (ctx, next) => {
  try {
    const [bearer, token] = ctx.headers.authorization.split(" ");

    const verification = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return response(ctx, 403, "Ação proibida");
  }

  return next();
};

module.exports = { verify };
