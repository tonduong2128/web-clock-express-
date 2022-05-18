import express from "express";
import HomeController from "../controllers/HomeController_fe.mjs";
const route = express.Router();

// route.get("/dang-nhap", HomeController.dangNhap)
// route.post("/dang-nhap", HomeController._dangNhap)

// route.get("/dang-ky", HomeController.dangKy)
// route.post("/dang-ky", HomeController._dangKy)

// route.get("/dang-xuat", HomeController.dangXuat)

// route.get("/chi-tiet-san-pham", HomeController.chiTiet)

// route.get("/them-san-pham", HomeController.themSanPham)

// route.get("/gio-hang", HomeController.gioHang)

// route.get("/xoa-san-phan", HomeController.xoaSanPham)

// route.get("/thong-tin-tai-khoan", HomeController.taiKhoan)

// route.post("/thong-tin-tai-khoan", HomeController._taiKhoan)
// route.get("/dat-hang", HomeController.datHang)
// route.get("/don-hang", HomeController.donHang)
// route.get("/da-giao-hang", HomeController.giaoHang)

route.use("/", HomeController.index);

export default route;
