const path = require("path");
const express = require("express");

const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//admin/add-product=>GET
router.get("/add-product", isAuth, adminController.getAddProduct);

//admin/add-product=>GET
router.get("/products", isAuth, adminController.getProducts);

//admin/add-product=>POST
router.use(
  "/add-product",
  [
    body("title", "Enter Valid Title").isString().isLength({ min: 5 }).trim(),
    body("price", "Enter Valid Price").isFloat(),
    body("description", "Enter Valid Description").isLength({ min: 5 }).trim(),
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Enter Valid Title").isString().isLength({ min: 5 }).trim(),
    body("price", "Enter Valid Price").isFloat(),
    body("description", "Enter Valid Description").isLength({ min: 5 }).trim(),
  ],
  isAuth,
  adminController.PostEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
