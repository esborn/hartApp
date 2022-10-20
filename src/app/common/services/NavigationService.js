export default class NavigationService {
    constructor($rootRouter, $rootScope) {
        this.$rootRouter = $rootRouter;
        this.$rootScope = $rootScope;
    }

    getRouterWrapper($childRouter) {
        if ($childRouter.forceNavigate) return $childRouter;

        $childRouter.forceNavigate = this.forceNavigate($childRouter);

        return $childRouter;
    }

    forceNavigate($childRouter) {
        return (route) => {
            if (!this.$rootRouter.navigating) return $childRouter.navigate(route);
            var stopWatching = this.$rootScope.$watch(
                () => {
                    return this.$rootRouter.navigating;
                },
                () => {
                    if (!this.$rootRouter.navigating) {
                        stopWatching();
                        $childRouter.navigate(route);
                    }
                });
        };
    }
}

NavigationService.$inject = ["$rootRouter", "$rootScope"]