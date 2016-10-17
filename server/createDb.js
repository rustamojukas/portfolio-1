var User = require('./models/users');
var Skill = require('./models/skills');
var Work = require('./models/works');
var async = require('async');
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

// var work = new Work({
//   title:'Очень длинное название проекта',
//   tech:'mongo, css, jquery, angular, react',
//   pic:'img/lorem5.jpg',
//   link:'#5'
// });
// work.save(function (err,data) {
//   if(err){
//     throw err;
//   }
//   console.log(data);
// });
// var key = 'HTML5';
// Skill.findOne({list:{$elemMatch:{name:key}}})
//     // .where({list:{$elemMatch:{name:key}}})
//     .exec(function (err, data) {
//       if (err) {
//         throw err;
//       }
//       console.log(data);
//     });


var skills = [
  {
    title: 'html5',
    percent: 90,
    category: 'frontend'
  },
  {
    title: 'css3',
    percent: 90,
    category: 'frontend'
  },
  {
    title: 'js',
    percent: 90,
    category: 'frontend'
  },
  {
    title: 'php',
    percent: 10,
    category: 'backend'
  },
  {
    title: 'mysql',
    percent: 10,
    category: 'backend'
  },
  {
    title: 'nodejs',
    percent: 10,
    category: 'backend'
  },
  {
    title: 'mongo',
    percent: 10,
    category: 'backend'
  },
  {
    title: 'git',
    percent: 10,
    category: 'workflow'
  },
  {
    title: 'gulp',
    percent: 10,
    category: 'workflow'
  },
  {
    title: 'bower',
    percent: 10,
    category: 'workflow'
  },
];




// function createSkills(callback){
//   async.each(skills,function(skillData,callback){
//     var skill=new Skill(skillData);
//     skill.save(callback);
//   },callback);
// }
// Skill.find({},function(err,data){
//   console.log(data);
// });

//============================
var upSkills=[{html5:33},{nodejs:33}];
// upSkills.forEach(function(item){
//   var key = Object.keys(item)[0];
//   console.log(key,item[key]);
// });
//=========================
// function updateSkills(callback){
//   async.each(upSkills,function(data,callback){
//     var key = Object.keys(data)[0];
//     Skill.update({title:key},{percent:data[key]},callback);
//   },function(err){
//     console.log('updated');
//   });
// }
//
// updateSkills();
//========
// async.series([createSkills],function(err){
//   console.log(arguments);
// });

// function createSkill(callback) {
//   async.parallel([
//     function (callback) {
//       var html = new Skill({});
//       html.save(function (err) {
//         callback(err, html);
//       });
//     }
//   ], callback);
//
// }


// var skill = new Skill({
//   title:'html5',
//   percent:90,
//   category:'frontend'
//
//
// });
// skill.save(function (err, data) {
//   if (err)throw err;
//   console.log(data);
// });
//

// Skill.findOneAndUpdate({}, {
//   Categories: {
//     Frontend: {
//       html5: 10,
//       css3: 10,
//       js: 10
//     },
//     Backend: {
//       php: 10,
//       mysql: 10,
//       nodejs: 10,
//       mongo: 10
//     },
//     Workflow: {
//       git: 10,
//       gulp: 10,
//       bower: 1020
//     }
//   }
//
// }, function (err, eff, data) {
//   if (err)throw err;
//   console.log(err, eff, data);
// });
// Skill.find({},function(err,data){
//   console.log(data[0].Categories);
// });