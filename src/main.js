
jQuery(function($){
	$('.drag').drag(function( ev, dd ){
		$( this ).css({
			top: dd.offsetY,
			left: dd.offsetX
		});
	});
});


