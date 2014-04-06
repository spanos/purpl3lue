$("li").click(function(){
	var input = $('<input type="test" />',{
		value: $(this).text()
	}).click(function(){
		$.get('editsave.php?tekstny=' + $(this).value(), function(response){
			var span = $('span',{
				text: response
			});
			$(this).replaceWith(span);
		});
	});
	$(this).replaceWith(input);
});
$("li").css("color","red");