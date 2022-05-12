import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DonDatHang = new Schema({
  _id: ObjectId,
  id_SanPham: ObjectId,
  id_KhachHang: ObjectId,
  DaThanhToan: Boolean,
  TinhTrangGiaoHang: Number,
  TenSanPham: String,
  LinkHinhAnh: String,
  GiaBan: String,
  NgayGiao: Date,
  NgayDat: Date,
  MaNhanVien: ObjectId
});
export default mongoose.model("DonDatHang", DonDatHang);
