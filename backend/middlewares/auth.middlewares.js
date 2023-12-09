import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { WRT } = req.cookies;

    if (!WRT) {
      return res.status(204).json({
        success: false,
        message: `Please Login first`,
      });
    }

    const data = JWT.verify(WRT, process.env.JWT_SECRET);
    req.user = data;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong`,
    });
  }
};

export default isLoggedIn;
