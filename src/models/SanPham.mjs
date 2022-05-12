import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SanPham  = new Schema({
  _id: ObjectId,
  TenSanPham: String,
  XuatXu: String,
  DuongKinhMatSo: Number,
  BeDayMatSo: String,
  Nieng: String,
  GiaBan: Number,
  SoLuongTon: Number,
  LinkHinhAnh: String,
  id_CheDoBaoHanh: ObjectId,
  id_ThuongHieu: ObjectId,
  MoTaChung: String,
  id_ChoGioTinh: ObjectId,
  id_DayDeo: ObjectId,
  id_MucChongNuoc: ObjectId,
  id_BoMayVaNangLuong: ObjectId,
  id_ChatLieuMatKinh: ObjectId,
  ChucNang: String,
  date: Date
});
export default mongoose.model("SanPham", SanPham) ;
