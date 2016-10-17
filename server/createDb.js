var User = require('./models/users');
var Skill = require('./models/skills');
var Work = require('./models/works');
// var user = new User({
//   login:'*',
//   password:'*'
// });
//
// user.save(function(err,user){
//   if(err){
//     throw err;
//   }
//   console.log(user);
// });

var work = new Work({
  title:'Очень длинное название проекта',
  tech:'mongo, css, jquery, angular, react',
  pic:'img/lorem5.jpg',
  link:'#5'
});
work.save(function (err,data) {
  if(err){
    throw err;
  }
  console.log(data);
});
// var key = 'HTML5';
// Skill.findOne({list:{$elemMatch:{name:key}}})
//     // .where({list:{$elemMatch:{name:key}}})
//     .exec(function (err, data) {
//       if (err) {
//         throw err;
//       }
//       console.log(data);
//     });

