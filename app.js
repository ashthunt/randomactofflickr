//app.js



function setbg(size, photoid, farmid, server, secret){

	// $img = "https://farm2.static.flickr.com/1596/24345077003_27615dbb16_c.jpg";
	// $size = "c";
	// $photoid = "24998236096";
	// $farmid = "2";
	// $server = "1614";
	// $secret = "ca7c134a3b";
	// alert('got here');

	var img =
	 'https://farm'+farmid+'.static.flickr.com/'+server+'/'+photoid+'_'+secret+'_'+size+'.jpg';

	//  alert(img);
	 $("#container").css('background-size', 'cover');
	$("#container").css('background-image', 'url('+img+')');
}

function makerequest(){


	$.get("https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=6c831824ff9e6778397aa5d3b9ad6cda&format=json&username=bestofrallylive&nojsoncallback=1").done(function(response){

			$loaderurl = 'ajax-loader.gif';
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
		var index = 180;
		var photoid = data.photos.photo[index].id;
		var farmid = data.photos.photo[index].farm;
		var server = data.photos.photo[index].server;
		var secret = data.photos.photo[index].secret;
				// alert(photoid);

				setbg("c", photoid, farmid, server, secret);

	});

}
