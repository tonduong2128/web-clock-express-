import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MucChongNuoc = new Schema({
  _id: ObjectId,
  TenMuc: String,
  MoTa: String,
  LinkHinhAnh: String,
});
export default mongoose.Model("MucChongNuoc", MucChongNuoc) ;
