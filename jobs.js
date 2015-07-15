var _ = require('lodash'),
	jobSetKey='KULA:jobs',
	jobHashKey='KULA:existing'
	clientsHashKey='KULA:clients'
	;

var request = require('request');

var jobs=[];
var jobTypes=[
		'twitter',
		'facebook',
		'categoright'
	];

//config 
var config=require('./data/config.json');
var KAZI_server= (!_.isUndefined(config.host) && (!_.isUndefined(config.host.url) && !_.isUndefined(config.host.port)))? config.host.url+':'+config.host.port : 'http://localhost:' + (config.host.port || 2016);

console.log(KAZI_server)

/*Categoright*/

jobs.push(
	{
		priority:'normal',
		id:'categoright:getTitles',
		name:'categoright',
		terminateJobAfter: (10*1000*60), //10 mins
		delay:0,
		data:{
			method:'getTitles'
		}
	}
);



/*twitter.tracking.update_users*/
jobs.push(
	{
		priority:'normal',
		id:'twitter.tracking.update_users',
		name:'twitter.tracking.update_users',
		terminateJobAfter: (10*1000*60), //10 mins
		delay:0,
		data:{
			method:'updateUsers'
		}
	}
);





/**/

jobs.push(
	{				
		name:'twitter.tracking.track',
		id:'twitter:1:ecitizenke',
		
		job_id:'2.ecitizenke', //should be an interger but can be postfixed with '.Something.AnotherSomething'
		_index:'tracking',
		_type: 'twitter',
		end_point:'streaming',
		terms:['#ecitizenke'],

		data:{			
			max_id:0,
			since_id:0,						
		}
	}
)


/*twitter.tracking.trending*/
jobs.push(
	{
		priority:'normal',
		id:'twitter.tracking.trending',
		name:'twitter.tracking.trending',
		terminateJobAfter: (10*1000*60), //10 mins
		delay:0,
		ttl: (60*60*3),//kill job after 3 hours
		data:{
			locale:'ke',
			woeid:1528488 //2345940
		}
	}
);

// jobs=[]


/*twitter.tracking.engagement*/
jobs.push(
	{
		priority:'normal',
		id:'twitter.tracking.engagement',
		name:'twitter.tracking.engagement',
		terminateJobAfter: (10*1000*60), //10 mins
		delay:0,
		ttl: (60*60*3),//kill job after 3 hours
		data:{
			locale:'ke',
			woeid:1528488 //2345940
		}
	}
);




var post={
		url:KAZI_server+'/queueJob', 
		form: jobs
}


console.log(post);


// //first register client
request.post(post, function(err,httpResponse,body){ 
	if(body){
		console.log(body)
	}
			
});

