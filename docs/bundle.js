(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

jQuery(function($){
	let $workspace = $("#workspace")
	$('.drag')
		.drag("start",function( ev, dd ){
			dd.limit = $workspace.offset();
			dd.limit.bottom = dd.limit.top + $workspace.outerHeight() - $( this ).outerHeight();
			dd.limit.right = dd.limit.left + $workspace.outerWidth() - $( this ).outerWidth();
		})
		.drag(function( ev, dd ){
			$( this ).css({
				top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
				left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
			});   
		});	
});



},{}]},{},[1]);
