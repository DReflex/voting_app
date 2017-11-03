const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema ({
  name:{
    type:String,
    required: [true, 'name is required'],
    unique: true
  },
  desc: {
    type: String,
    required: [true, 'describtion is required']
  },
 data:{
   poll:[],
   value: [],
   colors:[]
 },
 creator:{
   name: String,
   id: String
 }



});
const Poll = mongoose.model('poll', PollSchema);
module.exports = Poll;
