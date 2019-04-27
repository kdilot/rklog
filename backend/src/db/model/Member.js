const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  authId: String,
  displayName: String,
  email: String,
  platform: String,
  signUpDate: { type: Date, default: new Date() },
  signOutDate: Date,
  lastLoginDate: { type: Date, default: new Date() },
  level: { type: Number, default: 0 },
  display: { type: Boolean, default: true },
})

MemberSchema.statics.drop = function () {
  return this.collection.drop()
}

MemberSchema.statics.checkUserData = function (authId) {
  return this.findOneAndUpdate({ authId, display: true }, { lastLoginDate: new Date() }).exec()
}

MemberSchema.statics.checkNameData = function (displayName) {
  return this.findOne({ displayName }).exec()
}

MemberSchema.statics.removeData = function (_id, authId) {
  return this.findOneAndUpdate({ _id, authId }, { display: 0, signOutDate: new Date() }, { upsert: false, new: true }).exec()
}

MemberSchema.statics.editData = function (_id, authId, data) {
  return this.findOneAndUpdate({ _id, authId }, { ...data }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('member', MemberSchema)