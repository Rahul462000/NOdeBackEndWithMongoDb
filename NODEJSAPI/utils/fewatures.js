import Jwt from "jsonwebtoken";

const sendCookie = (user, res, message, statusCode = 200) => {
  const TOKEN = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  console.log(TOKEN);

  // when user is created we will send a cookie successfully
  res
    .status(statusCode)
    .cookie("token", TOKEN, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};

export default sendCookie;
