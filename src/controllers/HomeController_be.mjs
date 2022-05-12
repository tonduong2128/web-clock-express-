import mongoose from 'mongoose'
import SanPham from '../models/SanPham.mjs'
import { mongooseToObject, multipleMongooseToObject } from '../util/mongoose.mjs'
import fs from 'fs'
import DonDatHang from '../models/DonDatHang.mjs'
import KhachHang from '../models/KhachHang.mjs'
import NhanVien from '../models/NhanVien.js'
import ChucVu from '../models/ChucVu.mjs'

export default {
    index: (req, res, next) => {
        res.render("./Admin/home", {
            isAdmin: true
        })
    },
    addProduct: (req, res, next) => {
        res.render("./Admin/addProduct", {
            isAdmin: true
        })
    },
    _addProduct: ((req, res) => {
        if (req.file) {
            var path = req.file.path;
            path = "./" + path.slice(path.indexOf("uploads")).replaceAll(`\\`, "/");
            req.body.LinkHinhAnh = path;
        }
        const product = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        }
        SanPham.create(product)
            .then((data) => {
                if (data) {
                    return res.redirect("back");
                }
                return res.json({ message: 0 })
            })
    }),
    listProduct: (req, res, next) => {
        SanPham.find({})
            .then((data) => {
                const products = multipleMongooseToObject(data);
                res.render("./Admin/listProduct", {
                    isAdmin: true,
                    products: products
                })
            })

    },
    editProduct: (req, res, next) => {
        const _id = req.query._id;
        SanPham.findOne({ _id: _id })
            .then((data) => {
                const product = mongooseToObject(data);
                res.render("./Admin/editProduct", {
                    isAdmin: true,
                    product: product
                })
            })
    },
    _editProduct: (req, res, next) => {
        const _id = req.query._id;
        if (req.file) {
            var path = req.file.path;
            path = "./" + path.slice(path.indexOf("uploads")).replaceAll(`\\`, "/");
            req.body.LinkHinhAnh = path;
            try {
                const url = "src/views/Admin" + req.body.oldUrlImg.slice(1);
                fs.unlinkSync(url);
                console.log("File removed:", path);
            } catch (err) {
                console.error(err);
            }
        }
        const product = {
            ...req.body
        }
        SanPham.updateOne({ _id: _id }, product)
            .then((error) => {
                if (error.acknowledged) {
                    res.redirect("./danh-sach-san-pham")
                } else {
                    res.json(error);
                }
            })
    },
    deleteProduct: (req, res, next) => {
        const _id = req.query._id;
        SanPham.findOne({ _id: _id })
            .then((data) => {
                const product = mongooseToObject(data);
                try {
                    const url = "src/views/Admin" + product.LinkHinhAnh.slice(1);
                    fs.unlinkSync(url);
                    console.log("File removed:", path);
                } catch (err) {
                    console.error(err);
                }
                return SanPham.deleteOne({ _id: _id });
            })
            .then((error) => {
                if (error.acknowledged) {
                    res.redirect("back");
                } else {
                    res.json(error);
                }
            })
    },
    danhSachDonHang: (req, res, next) => {
        Promise.all([DonDatHang.find({}).sort({ id_KhachHang: 1 }), KhachHang.find({})])
            .then(data => {
                var orders = multipleMongooseToObject(data[0]);
                var customers = multipleMongooseToObject(data[1]);
                orders = orders.map((order) => {
                    customers.forEach(customer => {
                        if (order.id_KhachHang.toString() == customer._id.toString()) {
                            order = {
                                ...order,
                                TenKhachHang: customer.HoTenKhachHang,
                                DiaChiKhachHang: customer.DiaChiKhachHang,
                                DienThoaiKhachHang: customer.DienThoaiKhachHang,
                            }
                        }
                    });
                    return order;
                })
                return orders;
            })
            .then((orders) => {
                res.render("./Admin/listOrder", {
                    isAdmin: true,
                    orders: orders
                });
            })
    },
    danhSachNhanVien: (req, res, next) => {
        Promise.all([NhanVien.find({}), ChucVu.find({})])
            .then((data) => {
                var hasDel = req?.cookies?.adminId ? true : false;
                var staffs = multipleMongooseToObject(data[0]);
                const positions = multipleMongooseToObject(data[1]);
                staffs = staffs.map((staff) => {
                    positions.forEach((position) => {
                        if (staff?.id_ChucVu?.toString() == position?._id.toString()) {
                            staff.TenChucVu = position.TenChucVu;
                        }
                    })
                    return {
                        ...staff,
                        hasDel: hasDel,
                    };
                })
                return res.render("./Admin/listStaff", {
                    isAdmin: true,
                    staffs: staffs,
                });
            })
    },
    thongTinTaiKhoan: (req, res, next) => {
        return res.render("./Admin/profile", {
            isAdmin: true,
        });
    },
    giaoHang: (req, res, next) => {
        const id_DDH = req.query._id;
        DonDatHang.updateOne({ _id: id_DDH }, { TinhTrangGiaoHang: 0, NgayGiao: new Date() })
            .then((error) => {
                if (error.acknowledged) {
                    res.redirect("back");
                } else {
                    res.json({ message: 0 })
                }
            })
    },
    xoaDonHang: (req, res, next) => {
        const id_DDH = req.query._id;
        DonDatHang.deleteOne({ _id: id_DDH })
            .then((error) => {
                if (error.acknowledged) {
                    res.redirect("back");
                } else {
                    res.json({ message: 0 })
                }
            })
    },
    xoaNhanVien: (req, res, next) => {
        const _id = req.query._id;
        NhanVien.deleteOne({ _id: _id })
            .then((error) => {
                if (error.acknowledged) {
                    res.redirect("back");
                } else {
                    res.json({ message: 0 })
                }
            })
    },
    themNhanVien: (req, res, next) => {
        var hasDel = req?.cookies?.adminId ? true : false;
        res.render("./Admin/addStaff", {
            isAdmin: true,
            hasDel: hasDel
        })
    },
    _themNhanVien: (req, res, next) => {
        ChucVu.findOne({ TenChucVu: "Nhân viên" })
            .then(data => {
                var staffAd = mongooseToObject(data);
                var id_ChucVu = staffAd._id;
                const staff = {
                    ...req.body,
                    _id: mongoose.Types.ObjectId(),
                    id_ChucVu: id_ChucVu
                }
                return NhanVien.create(staff)
            })
            .then((data) => {
                if (data) {
                    res.redirect("./danh-sach-nhan-vien");
                } else {
                    res.json({ message: 0 });
                }
            })
    }
}