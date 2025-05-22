exports.get404 = (req, res, next) => {
  res.status(400).render("404", {
    pageTitle: "Page Not Found",
    path: "/400",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(400).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
