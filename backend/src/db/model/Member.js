const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  authId: String,
  displayName: String,
  email: String,
  platform: String,
  signUpDate: Date,
  signOutDate: Date,
  lastLoginDate: Date,
  level: Number,
  display: Boolean,
})

MemberSchema.statics.drop = function () {
  return this.collection.drop()
}

MemberSchema.statics.checkUserData = function (authId) {
  return this.findOne({ authId }).exec()
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