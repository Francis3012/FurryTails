var counter = 0;
function changeBG() {
	var imgs = [
		'url(https://images.unsplash.com/photo-1508210233409-d910365826b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
		'url(https://images.unsplash.com/photo-1517871554-7f22f4475166?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
		'url(https://images.unsplash.com/photo-1500465498425-c0469c198569?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
		'url(https://images.unsplash.com/photo-1461752472431-08ce75a43e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
		'url(https://images.unsplash.com/photo-1528015709756-60e66c62db5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
		'url(https://images.unsplash.com/photo-1527358056026-4ee8345a88fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
	];

	if (counter === imgs.length) counter = 0;
	$('body').css('background-image', imgs[counter]);

	counter++;
}

setInterval(changeBG, 3000);
