import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BoMayVaNangLuong = new Schema({
  _id: ObjectId,
  Ten: String,
  MoTa: Number,
  LinkHinhAnh: String,
});
export default mongoose.Model("BoMayVaNangLuong", BoMayVaNangLuong) ;