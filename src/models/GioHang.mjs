import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GioHang = new Schema({
  _id: ObjectId,
  id_Khachhang: ObjectId,
  id_SanPham:  ObjectId,
  SoLuong: Number,
});
export default mongoose.model("GioHang", GioHang) ;