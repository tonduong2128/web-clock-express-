import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NhanVien = new Schema({
  _id: ObjectId,
  HoTenNhanVien: String,
  TaiKhoan: String,
  MatKhau: String,
  id_ChucVu: ObjectId,
  DiaChi: String,
  SoDienThoai: String,
  NgaySinh: Date,
  GioiTinh: Boolean
});
export default mongoose.model("NhanVien", NhanVien) ;
