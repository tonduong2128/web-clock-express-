import KhachHang from "../models/KhachHang.mjs";
import ThuongHieu from "../models/ThuongHieu.mjs";
import DayDeo from "../models/DayDeo.mjs";
import SanPham from "../models/SanPham.mjs";
import GioHang from "../models/GioHang.mjs";
import mongoose from "mongoose";
import { mongooseToObject } from "../util/mongoose.mjs";
import { multipleMongooseToObject } from "../util/mongoose.mjs";
import NhanVien from "../models/NhanVien.js";
import ChucVu from "../models/ChucVu.mjs";
import DonDatHang from "../models/DonDatHang.mjs";

export default {
  index: (req, res, next) => {
    const userId = req.cookies?.userId || req.cookies?.staffId;
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    Promise.all([ThuongHieu.find({}), DayDeo.find({}), SanPham.find({})]).then(
      (data) => {
        const brands = multipleMongooseToObject(data[0]);
        const straps = multipleMongooseToObject(data[1]);
        const products = multipleMongooseToObject(data[2]);
        const productsMail = products.filter((product) => {
          return product.MaChoGioiTinh == 1;
        });
        const productsFemail = products.filter((product) => {
          return product.MaChoGioiTinh == 2;
        });
        res.render("home", {
          userId: userId,
          adminId: adminId,
          brands: brands,
          straps: straps,
          productsMail: productsMail,
          productsFemail: productsFemail,
        });
      }
    );
  },

  dangNhap: (req, res, next) => {
    const userId = req.cookies?.userId || req.cookies?.staffId;
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    Promise.all([ThuongHieu.find({}), DayDeo.find({}), SanPham.find({})]).then(
      (data) => {
        const brands = multipleMongooseToObject(data[0]);
        const straps = multipleMongooseToObject(data[1]);
        const products = multipleMongooseToObject(data[2]);

        if (!userId) {
          res.render("login", {
            hasMessage: false,
            message: {},
            brands,
            straps,
            products,
            userId,
            adminId,
          });
        } else {
          res.redirect("/thong-tin-tai-khoan?userId=" + userId);
        }
      }
    );
  },
  _dangNhap: (req, res, next) => {
    Promise.all([
      NhanVien.findOne(req.body),
      ChucVu.findOne({ TenChucVu: "Quản trị" }),
    ])
      .then((data) => {
        const staff = mongooseToObject(data[0]);
        const admin = mongooseToObject(data[1]);
        if (staff && staff?.id_ChucVu?.toString() == admin?._id?.toString()) {
          res.cookie("adminId", staff.id_ChucVu.toString());
          res.cookie("staffId", staff._id);
          res.redirect("/admin");
          return Promise.reject();
        } else {
          return Promise.all([
            staff,
            ChucVu.findOne({ TenChucVu: "Nhân viên" }),
          ]);
        }
      })
      .then((data) => {
        if (!data) {
          return data;
        }
        const staff = data[0];
        const staffAdmin = mongooseToObject(data[1]);
        if (
          staff &&
          staff?.id_ChucVu?.toString() == staffAdmin?._id?.toString()
        ) {
          res.cookie("staffId", staffAdmin._id.toString());
          res.cookie("staffAdminId", staff.id_ChucVu);
          res.redirect("/admin");
          return Promise.reject();
        } else {
          return KhachHang.findOne(req.body);
        }
      })
      .then((data) => {
        if (!data) {
          return Promise.all([
            ThuongHieu.find({}),
            DayDeo.find({}),
            SanPham.find({}),
          ]);
        }
        const user = mongooseToObject(data);
        if (user) {
          res.cookie("userId", user._id);
          res.redirect("/");
          return;
        }
        res.redirect("/");
      })
      .then((data) => {
        const brands = multipleMongooseToObject(data[0]);
        const straps = multipleMongooseToObject(data[1]);
        const products = multipleMongooseToObject(data[2]);
        res.render("login", {
          hasMessage: true,
          message: "Đăng nhập không thành công vui lòng thử lại!!!",
          brands,
          straps,
          products,
        });
      })
      .catch(() => {});
  },

  dangKy: (req, res, next) => {
    Promise.all([ThuongHieu.find({}), DayDeo.find({}), SanPham.find({})]).then(
      (data) => {
        const brands = multipleMongooseToObject(data[0]);
        const straps = multipleMongooseToObject(data[1]);
        const products = multipleMongooseToObject(data[2]);
        res.render("register", {
          brands,
          straps,
          products,
        });
      }
    );
  },
  _dangKy: (req, res, next) => {
    req.body._id = new mongoose.Types.ObjectId();
    const khachHangMoi = new KhachHang(req.body);
    khachHangMoi.save((error) => {
      if (error) {
        res.render("register", {
          hasMessage: true,
          message: "Đăng ký không thành công!! thử lại",
        });
      }
      res.redirect("/dang-nhap");
    });
  },

  dangXuat: (req, res, next) => {
    res.clearCookie("staffId");
    res.clearCookie("staffAdminId");
    res.clearCookie("adminId");
    res.clearCookie("userId");
    res.redirect("/");
  },

  chiTiet: (req, res, next) => {
    const userId = req.cookies?.userId || req.cookies?.staffId;
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    Promise.all([
      SanPham.findOne(req.query),
      SanPham.find({}),
      ThuongHieu.find({}),
      DayDeo.find({}),
    ]).then((data) => {
      const product = mongooseToObject(data[0]);
      const products = multipleMongooseToObject(data[1]);
      const brands = multipleMongooseToObject(data[2]);
      const straps = multipleMongooseToObject(data[3]);

      const brand = brands.find((b) => {
        return b._id.toString() == product.id_ThuongHieu.toString();
      });
      if (product) {
        res.render("detail-watch", {
          product: product,
          products: products,
          brands: brands,
          brand: brand,
          straps,
          userId,
          adminId,
        });
      } else {
        res.redirect("/home");
      }
    });
  },
  gioHang: (req, res, next) => {
    const userId = req.cookies?.userId;
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    if (!userId) {
      return res.redirect("/dang-nhap");
    }
    Promise.all([
      GioHang.find({}),
      SanPham.find({}),
      ThuongHieu.find({}),
      DayDeo.find({}),
    ]).then((data) => {
      var carts = multipleMongooseToObject(data[0]);
      const products = multipleMongooseToObject(data[1]);
      const brands = multipleMongooseToObject(data[2]);
      const straps = multipleMongooseToObject(data[3]);
      carts = carts.map((cart) => {
        products.forEach((product) => {
          if (product._id.toString() == cart.id_SanPham.toString()) {
            cart = {
              ...product,
              ...cart,
            };
            cart.TongTien = cart.SoLuong * cart.GiaBan;
          }
        });
        return cart;
      });
      var total = carts.reduce((cur, cart) => cur + cart.TongTien, 0);
      res.render("cart", {
        carts: carts,
        total: total,
        brands,
        straps,
        adminId,
        userId,
      });
    });
  },
  themSanPham: (req, res, next) => {
    const data = {
      _id: new mongoose.Types.ObjectId(),
      id_KhachHang: req.cookies?.userId,
      id_SanPham: req.query._id,
      SoLuong: 1,
    };
    const newCart = new GioHang(data);
    newCart.save((error) => {
      if (error) {
      } else {
        res.redirect("back");
      }
    });
  },
  xoaSanPham: (req, res, next) => {
    const idSanPham = req.query._id;
    GioHang.deleteOne({ _id: idSanPham }).then((error) => {
      if (error.acknowledged) {
        res.redirect("/gio-hang");
      } else {
        res.json(error);
      }
    });
  },

  taiKhoan: (req, res, next) => {
    const userId = req.query.userId;
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    Promise.all([
      KhachHang.findOne({ _id: userId }),
      ThuongHieu.find({}),
      DayDeo.find({}),
      SanPham.find({}),
    ]).then((data) => {
      const brands = multipleMongooseToObject(data[1]);
      const straps = multipleMongooseToObject(data[2]);
      const products = multipleMongooseToObject(data[3]);
      if (data) {
        const user = mongooseToObject(data[0]);
        res.render("profile", {
          user: user,
          adminId,
          userId,
          straps,
          products,
          brands,
        });
      } else {
        res.json({ error: 1 });
      }
    });
  },
  _taiKhoan: (req, res, next) => {
    const userId = req.query.userId;
    KhachHang.updateOne({ _id: userId }, req.body).then((error) => {
      if (error.acknowledged) {
        res.redirect("./thong-tin-tai-khoan?userId=" + userId);
      } else {
        res.json({ error: 1 });
      }
    });
  },
  datHang: async (req, res, next) => {
    const userId = req.cookies.userId;

    if (userId) {
      Promise.all([GioHang.find({ id_KhachHang: userId }), SanPham.find({})])
        .then((data) => {
          var carts = multipleMongooseToObject(data[0]);
          var products = multipleMongooseToObject(data[1]);
          carts = carts.map((cart) => {
            products.forEach((product) => {
              if (product._id.toString() == cart.id_SanPham.toString()) {
                cart = {
                  ...cart,
                  ...product,
                };
              } else {
                cart = {
                  ...cart,
                };
              }
            });
            cart = {
              _id: new mongoose.Types.ObjectId(),
              id_SanPham: cart._id,
              id_KhachHang: userId,
              DaThanhToan: false,
              TinhTrangGiaoHang: false,
              NgayDat: new Date(),
              LinkHinhAnh: cart.LinkHinhAnh,
              GiaBan: cart.GiaBan,
              TenSanPham: cart.TenSanPham,
            };
            return cart;
          });
          return DonDatHang.create(carts);
        })
        .then((data) => {
          return GioHang.deleteMany({ id_KhachHang: userId });
        })
        .then((data) => {
          if (data.acknowledged) {
            return res.redirect("/");
          } else {
            return res.json({ message: "Something error" });
          }
        });
    } else {
      res.redirect("dang-nhap");
    }
  },
  donHang: (req, res, next) => {
    const userId = req.cookies.userId;
    const userAdmin = req.cookies?.adminId || req.cookies?.staffAdminId;
    if (userId) {
      Promise.all([
        DonDatHang.find({ id_KhachHang: userId }),
        SanPham.find({}),
        ThuongHieu.find({}),
        DayDeo.find({}),
      ]).then((data) => {
        const orders = multipleMongooseToObject(data[0]);
        const products = multipleMongooseToObject(data[1]);
        const brands = multipleMongooseToObject(data[2]);
        const straps = multipleMongooseToObject(data[3]);
        res.render("order", {
          orders: orders,
          userAdmin,
          userId,
          products,
          brands,
          straps,
        });
      });
    } else {
      res.redirect("dang-nhap");
    }
  },
  giaoHang: (req, res, next) => {
    const id_DDH = req.query._id;
    const userId = req?.cookies?.userId;
    if (userId) {
      DonDatHang.updateOne({ _id: id_DDH }, { TinhTrangGiaoHang: 1 }).then(
        (error) => {
          if (error.acknowledged) {
            res.redirect("back");
          } else {
            res.json({ error: 1 });
          }
        }
      );
    } else {
      res.redirect("dang-nhap");
    }
  },
};
