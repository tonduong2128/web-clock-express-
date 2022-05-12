import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ThuongHieu  = new Schema({
  _id: ObjectId,
  TenThuongHieu: String,
  MoTaThuongHieu: String,
  LinkHinhAnh: String,
});
export default mongoose.model("ThuongHieu", ThuongHieu) ;
