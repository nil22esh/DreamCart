export const isAdminMiddleware = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized: User is not admin" });
  }
};
