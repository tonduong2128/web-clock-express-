import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const KhachHang = new Schema({
  _id: ObjectId,
  HoTenKhachHang: String,
  TaiKhoan: String,
  MatKhau: String,
  Email: String,
  DiaChiKhachHang: String,
  DienThoaiKhachHang: String,
  NgaySinh: Date
});
export default mongoose.model("KhachHang", KhachHang) ;
