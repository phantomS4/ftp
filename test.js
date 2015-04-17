var Client = require('ftp');
var fs = require('fs');
var c = new Client();
	  
c.on('ready', function() {
	console.log('ready.....');
	c.list(function(err,list){
		console.dir(list);
		list.forEach(function(element,index,arry){
			if(element.type === 'd')
			{
				c.list(element.name,function(err,list1){
						console.dir(list1);
					});
				console.log(element);
				return ;
			}		
			c.get(element.name,function(err,stream){
					if(err) throw err;
					stream.once('close',function(){
						c.end();
						});
					stream.pipe(fs.createWriteStream('./download/'+element.name));
				});
			});
		});	
});
  // connect to localhost:21 as anonymous

  var prop = {
  	host:"ftp.pku.edu.cn",

  };

c.connect(prop);
