app.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': w.height(), 
                'w': w.width()
            };
        }, function (newValue, oldValue) {
//            scope.windowHeight = newValue.h;
//            scope.windowWidth = newValue.w;
//
//            scope.resizeWithOffset = function (offsetH) {
//
//                scope.$eval(attr.notifier);
//
//                return { 
//                    'height': (newValue.h - offsetH) + 'px'
//                    //,'width': (newValue.w - 100) + 'px' 
//                };
//            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});