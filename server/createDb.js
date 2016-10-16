var User = require('./models/users');
var Skill = require('./models/skills');
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

// var frontend = new Skill({
//   title:'WorkFlow',
//   list:[{name:'Git',percent:95},{name:'Gulp',percent:80},{name:'Bower',percent:90}]
// });
// frontend.save(function (err,skill) {
//   if(err){
//     throw err;
//   }
//   console.log(skill);
// });
var key = 'HTML5';
Skill.findOne({list:{$elemMatch:{name:key}}})
    // .where({list:{$elemMatch:{name:key}}})
    .exec(function (err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
    });

