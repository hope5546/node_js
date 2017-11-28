var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
var urlencodeParser = bodyParser.urlencoded({extended:false});
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "nodejs"
});

app.get('/',function(req,res){
	res.send("Hsdsds");
});

app.get('/getStudent',function(req,res){
	var sql = "SELECT * FROM student";
	con.query(sql,function(err,result){
		var tmp = JSON.stringify(result);
		res.send(tmp);
	});
});

app.post('/postStudent',urlencodeParser,function(req,res){
	var sql = "INSERT INTO student (id,name,age) VALUE('"+
	req.body.id+"','"+req.body.name+"','"+req.body.age+"')";
	res.send(sql);
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT INSERT");
		}else{
			console.log("INSERT SUCCESS");
		}
	});
});

app.put('/updateStudent',urlencodeParser,function(req,res){
	var sql = "UPDATE student set name = '"+req.body.name+"' WHERE id = '"+req.body.id+"'";
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT UPDATE");
		}else{
			console.log("UPDATE SUCCESS");
		}
	});
});

app.delete('/deleteStudent',urlencodeParser,function(req,res){
	var sql = "DELETE FROM student WHERE id = '"+req.body.id+"'";
	con.query(sql,function(err){
		if(err){
			console.log("CANNOT DELETE");

		}else{
			console.log("DELETE SUCCESS");
		}
	});
});



app.listen(3000,function(){
	console.log('port 3000');
})