//app.js

function setbg(size, photoid, farmid, server, secret){

	var img =
	'https://farm'+farmid+'.static.flickr.com/'+server+'/'+photoid+'_'+secret+'_'+size+'.jpg';

	document.getElementById('loader').src = "";

	$("#container").css('background-size', 'cover');
	$("#container").css('background-image', 'url('+img+')');
}
function startLoader(){
	var count = 0;
	setInterval(function(){
		count++;
		var periods = new Array(count % 10).join('.');
		document.getElementById('loader').innerHTML =  periods;
	}, 1000);
}
function resetLoader(){
	document.getElementById('loader').innerHTML =  null;
}
function makerequest(){

	var userinput = document.getElementById('username').value;
	// alert(userinput);
	if(userinput == ""){
		userinput = "BestOfRallyLive";
	}
	// loaderurl = 'ajax-loader.gif';
	// document.getElementById('loader').src = loaderurl;
	startLoader();

	$.get("https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=6c831824ff9e6778397aa5d3b9ad6cda&format=json&username="+userinput+"&nojsoncallback=1").done(function(response){
		// $("#container").css('background-image', 'url('+$loaderurl+')');

		$("#container").css('background-color', 'white');
		$("#container").css('transition', 'background 200ms ease-in 3s');

		buildstring(response.user.nsid);
	});
}

function printme(){
	alert(document.getElementById("username").submit());
}

function buildstring($o){
	var str = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=6c831824ff9e6778397aa5d3b9ad6cda&user_id="+$o+"&format=json&per_page=200&nojsoncallback=1";
	// alert(str);
	request(str);
}

function request(str){
	// alert(str);
	$.get(str).done(function(data){
		// alert(data.photos.photo[0].id);

		var pages = data.photos.pages;
		var perpage = data.photos.perpage;
		var total = pages*perpage;
		// alert(perpage);
		var randomvalue = Math.floor(Math.random() * 200);
		// alert(randomvalue);

		var index = randomvalue;

		var photoid = data.photos.photo[index].id;
		var farmid = data.photos.photo[index].farm;
		var server = data.photos.photo[index].server;
		var secret = data.photos.photo[index].secret;
		// alert(photoid);

		setbg("c", photoid, farmid, server, secret);

	});

}
