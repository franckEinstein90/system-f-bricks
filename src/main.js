
jQuery(function($){
	let $workspace = $("#workspace")
	$('.drag')
		.drag("start",function( ev, dd ){
			$( this ).addClass('active')
			dd.limit = $workspace.offset()
			dd.limit.bottom = dd.limit.top + $workspace.outerHeight() - $( this ).outerHeight()
			dd.limit.right = dd.limit.left + $workspace.outerWidth() - $( this ).outerWidth()
		})

		.drag(function( ev, dd ){
			$( this ).css({
				top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
				left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
			})
		})

		.drag('end', function(){
			$( this ).removeClass('active')
		})
});


