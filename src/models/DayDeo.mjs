import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DayDeo = new Schema({
  _id: ObjectId,
  TenDayDeo : String,
  MoTa: Number,
  LinkHinhAnh: String,
});
export default mongoose.model("DayDeo", DayDeo) ;
