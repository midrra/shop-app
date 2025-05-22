// const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
// const expressHbs = require("express-handlebars");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",     //for handlebars
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");  //for handlebars
// app.set("views", "views");     //for handlebars
// app.set("view engine", "pug"); /// for bug
// app.set("views", "views");  /// for bug the first view is from bug and the second is from my the second can by any thing else like screen fro example

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(400).sendFile(path.join(__dirname,'views','404.html'));
  res.status(400).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
// const server = app.listen(3000) in vanill node js
// we use app.write("<h1>any title</h1>") instead of app.use in express
