$(document).ready(function(){

	alert("Hello World");

	$("li").hover(function(){
		$( this ).addClass( "hover" );
	}, function() {
		$( this ).removeClass( "hover" );
	});
});