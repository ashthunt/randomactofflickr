//app.js
// Marsel Van Oosten
// _rebekka
// olivia bee
// rosiehardy
// FataliGallery
function initapp(){
// alert('got here');
	var presets = ["_rebekka", "olivia bee", "rosiehardy","FataliGallery","Marsel Van Oosten"];
	// alert(cars.length);
	var randomindex = Math.floor(Math.random() * presets.length);
	// alert(presets[randomindex]);
	var user = presets[randomindex];
	// alert(user);
	$("#username").attr('placeholder', user);

	makerequest(user);
}
function setbg(size, photoid, farmid, server, secret){

	var img =
	'https://farm'+farmid+'.static.flickr.com/'+server+'/'+photoid+'_'+secret+'_'+size+'.jpg';

	// document.getElementById('loader').src = "";
$("#spinner").html("");
	$("#wallpaper").css('background-size', 'cover');
	$("#wallpaper").css('background-image', 'url('+img+')');

}

function makerequest(user){
$("#spinner").html("<div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div>");
	var userinput = document.getElementById('username').value;
	// alert(userinput);
	if(userinput == ""){
		userinput = user;
	}

	$.get("https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=6c831824ff9e6778397aa5d3b9ad6cda&format=json&username="+userinput+"&nojsoncallback=1").done(function(response){
		// $("#container").css('background-color', 'white');

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
