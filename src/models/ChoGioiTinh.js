import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChoGioiTinh = new Schema({
  _id: ObjectId,
  TenChoGioiTinh: String,
  MoTa: Number,
  LinkHinhAnh: String,
});
export default mongoose.Model("ChoGioiTinh", ChoGioiTinh) ;
