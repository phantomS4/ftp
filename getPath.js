var path = require('path');
var fs = require('fs');
var client = require('ftp');

var c = new client();

var prop = {
	host:'ftp.pku.edu.cn'
};

c.on('ready',function(){
		
		console.log('ready---------------------');
		travel(c,'.');
		c.end();
		});

function travel(c,pathname){

	c.list(pathname,function(err,list){
			if(err) throw err;
			
			list.forEach(function(element,index,array){
				if(element.type === 'd')
				{
				  var paths=pathname+'/'+element.name;
					console.log(paths);
					travel(c,paths);
					return;
				}
				else
				{
					console.log("--"+pathname+'/'+element.name);
				}
				});
			});
}

c.connect(prop);
