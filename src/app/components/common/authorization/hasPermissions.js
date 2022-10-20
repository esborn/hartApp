let hasPermissions = ( ngIfDirective, userService ) => {
    let ngIf = ngIfDirective[0];

    return {
        transclude: ngIf.transclude,
        priority: ngIf.priority,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,
        link: function ( $scope, $element, $attr ) {
            let value = $scope.$eval($attr.hasPermissions);

            if (!Array.isArray(value))
            {
                value = [value];
            }

            let ngIfValue = userService.hasPermissions(value);

            $attr.ngIf = () => {
                return ngIfValue;
            };

            ngIf.link.apply(ngIf, arguments);
        }
    };
};

hasPermissions.$inject = ["ngIfDirective", "userService"];

export default hasPermissions;
