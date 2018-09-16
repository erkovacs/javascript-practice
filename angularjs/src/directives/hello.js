module.exports = function(ngModule) 
{
    ngModule.directive('hello', function () {
        return {
            restrict: 'E', 
            scope: {},
            template: require('../templates/hello.html'),
            controllerAs: 'vm',
            controller: function()
            {
                var vm = this;
                vm.greeting = 'Hello World';
            }
        }
    })
}