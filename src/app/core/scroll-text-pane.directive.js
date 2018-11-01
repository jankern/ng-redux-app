export
default ['$parse', '$sce', '$window', '$timeout', ($parse, $sce, $window, $timeout) => {
    return {
        restrict: 'E',
        template: '<article translate="TEXT_TERMS_AND_CONDITIONS"></article><md-button class="md-fab btn1" aria-label="Read terms and conditions" ng-show="displayButton" ng-click="scrollToBottom()" ng-disabled="disableButton"><md-icon md-font-icon="icon-arrow-down"></md-icon></md-button>',
        scope: {
            scrollContent: '=',
            isScrolledToBottom: '=',
            displayButton: '=',
            displayMode: '<'
        },
        link: (scope, elem, attrs, ctrl) => {

            scope.isScrolledToBottom = false;
            scope.disableButton = false;
            
            // Deprecated here, text will be securly sce handled by $translate 
            // Usage: <article ng-bind-html="renderHtml(htmlString)">
            scope.renderHtml = (htmlContent) => {
                return $sce.trustAsHtml(htmlContent);
            }

            let el = elem.find("article");

            scope.scrollToBottom = () => {

                let body = document.body,
                    html = document.documentElement;

                window.scrollTo(0, body.scrollHeight);
                window.scrollTo(0, html.scrollHeight);

            }

            let checkScrollPosition = () => {
                if (scope.displayMode === 'agree') {
                    let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                    let body = document.body,
                        html = document.documentElement;

                    if (Math.floor(body.scrollHeight - body.scrollTop) <= windowHeight || Math.floor(html.scrollHeight - html.scrollTop) <= windowHeight) {
                        scope.disableButton = true;
                        scope.isScrolledToBottom = true;
                        scope.$apply();
                    }
                }
            }

            $timeout(() => {
                checkScrollPosition();
            });

            angular.element($window).bind("scroll", function() {
                checkScrollPosition();
            });

            scope.$on('$destroy', function() {
                angular.element($window).unbind('scroll');
            });

        }
    };
}]