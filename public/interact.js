$(document).ready(function(){

	alert("Hello World");

	$("li").hover(function(){
		$( this ).addClass( "hover" );
	}, function() {
		$( this ).removeClass( "hover" );
	});

	$("#theList > li").click(function(){
	    $('.newShowItem').removeClass('newShowItem').addClass('oldShowItem');
	    $(this).removeClass('oldShowItem').addClass('newShowItem');
	});
	
});