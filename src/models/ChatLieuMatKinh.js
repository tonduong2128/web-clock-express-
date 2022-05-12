import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatLieuMatKinh = new Schema({
  _id: ObjectId,
  TenMatKinh: String,
  MoTa: String,
  LinkHinhAnh: String,
});
export default mongoose.Model("ChatLieuMatKinh", ChatLieuMatKinh) ;
