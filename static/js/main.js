(function($){
	var proxy = $.proxy;

    Page = {
        init: function(){
			var that = this;
			
			$("#back-to-top").on("click",proxy(that.onTopClick,that));
			$(window).scroll(function() {
				$(this).scrollTop() > 100 ? $("#back-to-top").fadeIn() : $("#back-to-top").fadeOut()
			});

			$('img.lazy').lazyload({
				effect: 'fadeIn'
			});
        },
		onTopClick: function(e) {
			return e.preventDefault(),
				$("html, body").animate({
					scrollTop: 0
				}, 1000), false
		}
    };
	
    Page.init();
})(jQuery);