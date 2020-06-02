module.exports = {
  userOnly: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send("Please log in");
    }
    next();
  },

  adminOnly: (req, res, next) => {
    if (!req.session.user.isAdmin) {
      return res.status(403).send("Must be an admin to view");
    }
    next();
  },
};
