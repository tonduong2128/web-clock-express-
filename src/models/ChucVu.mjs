import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChucVu = new Schema({
  _id: ObjectId,
  TenChucVu: String,
});
export default mongoose.model("ChucVu", ChucVu) ;
