const AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = (event,context,callback)=> {
	let request = JSON.stringify(event.img);
	let id = JSON.stringify(event.imageId);
	let ext = JSON.stringify(event.fileExt);
	let folder = JSON.stringify(event.folder);

	request = request.slice(1,-1);

	var filePath = id+"."+ext.slice(1,-1);
	let buffer = Buffer.from(request.replace(/^data:image\/w+;base64,/,""),'base64');

	var params = {
		Key: filePath,
		Body: buffer,
		ContentEncoding: 'base64',
		ContentType: 'image.jpeg',
		Bucket: "received-images"
	};

	s3.upload(params,function(err,data){
		if(err){
			callback(err,null);
		}
		else{
			var res = {
				"statusCode": 200,
				"headers":{
					"Content-Type": "application/json"
				}
			};
			res.body = "Uploaded";
			callback(null,res);
		}
	});
};