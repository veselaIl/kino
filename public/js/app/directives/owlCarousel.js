app.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
					slideSpeed : 800,
					autoPlay: 6000,
					items : 1,
					stopOnHover : true,
					itemsDesktop : [1199,1],
					itemsDesktopSmall : [979,1],
					itemsTablet :   [768,1],
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {					
					defaultOptions[key] = customOptions[key];
				}
				console.log(customOptions);
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);
