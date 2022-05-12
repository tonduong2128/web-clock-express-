import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CheDoBaoHanh = new Schema({
  _id: ObjectId,
  TenCheDoBaoHanh: String,
  MoTaCheDoBaoHanh: Number,
  SoNamBaoHanh: Number
});
export default mongoose.Model("CheDoBaoHanh", CheDoBaoHanh) ;
