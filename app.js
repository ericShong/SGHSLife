var app = require("express")();
var bodyParser = require("body-parser")
var MongoClient = require("mongodb").MongoClient
var nodemailer = require("nodemailer")
var fs = require('fs')
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth:{
		user:'sghslife@gmail.com',
		pass:'lifesghssghs'
	}	
})

function Contact (name, phone, email, role){
	this.name = name;
	this.phone = phone;
	this.email = email;
	this.role = role;
}

MongoClient.connect('mongodb://localhost:27017/SGHSLife', function(err, db){
	app.use(bodyParser.urlencoded({ extended: false }))
	app.get('/', function(req,res){
		res.sendFile(__dirname+'/index.html');
	})
	
	app.post('/', function(req,res){
		db.collection('contacts').insert(new Contact(decodeURI(req.body.name), req.body.phone, req.body.email, req.body.role), function(err, inserted){
			console.log(inserted)
		});
	});
	
	app.get('/list', function(req,res){
		var contacts = [];
		db.collection('contacts').find({}, {role:1, name:1, phone:1, email:1, _id:0}).sort({name:1}).each(function(err,doc){
			if(doc){
				contacts.push(doc)
			} else res.end(JSON.stringify(contacts))
		})
	})
	app.post('/newEvent', function(req, res){
		transporter.sendMail({
			from:'sghslife@gmail.com',
			to:'erichfbla@gmail.com',
			subject:"Someone has suggested a new event.",
			text:"name: " + req.body.name + "\norganization name: " + req.body.orgName + "\nevName: " + req.body.evName + "\ndescription: " + req.body.desc + "\ntime: " + req.body.date
		}, function(err, info){
			if (err)console.log(err)
			else console.log(info.response);
		})		
		res.end();
	})
	app.get('/notificationsList', function(req, res){
		var notifications = [];
		db.collection('notifications').find({}, {notification:1, _id:0}).toArray(function(err, docs){
			res.end(JSON.stringify(docs));
		})
	})
	app.post('/newNotification', function(req, res){
		db.collection('notifications').insert({notification:req.body.notification}, function(err, inserted){
			console.log(inserted);
		})
	})
	var pics = [];
	app.get('/nOfPictures', function(req,res){
		var nOfPictures = 0;
		fs.readdir(__dirname + '/pictures/', function(err, files){
			pics = [];
			files.forEach(function(file){pics.push(file);})
			res.end(pics.length.toString())
		})
	})
	app.get('/pic/:num', function(req, res){
		res.sendFile(__dirname + '/pictures/' + pics[req.params.num])
	})
	app.get('/:fileName', function(req, res){
		res.sendFile(__dirname+'/'+req.params.fileName);
	})
	app.listen(3000);
});
