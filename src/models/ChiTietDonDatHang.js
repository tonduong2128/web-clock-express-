import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChiTietDonDatHang = new Schema({
  _id: ObjectId,
  _idSanPham: ObjectId,
  SoLuong: Number,
  DonGia: String,
  SoNamBaoHanh: Number
});
export default mongoose.Model("ChiTietDonDatHang", ChiTietDonDatHang) ;
