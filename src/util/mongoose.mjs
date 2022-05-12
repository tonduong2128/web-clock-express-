export const mongooseToObject = (mongoosesArray)=>{
    return mongoosesArray ? mongoosesArray.toObject() : mongoosesArray;
}
export const multipleMongooseToObject = (mongoosesArrays)=>{
    return mongoosesArrays.map(mongoosesArray => mongoosesArray.toObject());
}
