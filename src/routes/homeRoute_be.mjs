import express from "express";
import HomeController_be from "../controllers/HomeController_be.mjs";
import authentication from "../middleware/authentication.mjs";
import multer from "multer";

const route = express.Router();
route.use("/", authentication);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/views/Admin/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

route.get("/", HomeController_be.index);
route.get("/them-san-pham", HomeController_be.addProduct);
route.post(
  "/them-san-pham",
  upload.single("anh"),
  HomeController_be._addProduct
);

route.get("/danh-sach-san-pham", HomeController_be.listProduct);

route.get("/sua-san-pham", HomeController_be.editProduct);
route.post(
  "/sua-san-pham",
  upload.single("anh"),
  HomeController_be._editProduct
);

route.get("/xoa-san-pham", HomeController_be.deleteProduct);

route.get("/danh-sach-don-dat-hang", HomeController_be.danhSachDonHang);
route.get("/danh-sach-nhan-vien", HomeController_be.danhSachNhanVien);
route.get("/thong-tin-tai-khoan", HomeController_be.thongTinTaiKhoan);

route.get("/dang-giao-hang", HomeController_be.giaoHang);
route.get("/xoa-don-hang", HomeController_be.xoaDonHang);
route.get("/xoa-nhan-vien", HomeController_be.xoaNhanVien);
route.get("/them-nhan-vien", HomeController_be.themNhanVien);
route.post("/them-nhan-vien", HomeController_be._themNhanVien);

export default route;
