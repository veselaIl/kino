myApp.directive('checkboxGroup', function() {
return {
    restrict: 'E',
    controller: function($scope, $attrs) {
    var self = this;
    var ngModels = [];
    var minRequired;
    self.validate = function() {
        var checkedCount = 0;
        angular.forEach(ngModels, function(ngModel) {
        if ( ngModel.$modelValue ) {
            checkedCount++;
        }
        });
        console.log('minRequired', minRequired);
        console.log('checkedCount', checkedCount);
        var minRequiredValidity = checkedCount >= minRequired;
        angular.forEach(ngModels, function(ngModel) {
        ngModel.$setValidity('checkboxGroup-minRequired', minRequiredValidity, self);
        });
    };
    
    self.register = function(ngModel) {
        ngModels.push(ngModel);
    };
    
    self.deregister = function(ngModel) {
        var index = this.ngModels.indexOf(ngModel);
        if ( index != -1 ) {
        this.ngModels.splice(index, 1);
        }
    };
        
    $scope.$watch($attrs.minRequired, function(value) {
        minRequired = parseInt(value, 10);
        self.validate();
    });
    }
};
});

myApp.directive('input', function() {
return {
    restrict: 'E',
    require: ['?^checkboxGroup','?ngModel'],
    link: function(scope, element, attrs, controllers) {
    var checkboxGroup = controllers[0];
    var ngModel = controllers[1];
    if ( attrs.type=='checkbox' && checkboxGroup && ngModel ) {
        checkboxGroup.register(ngModel);
        scope.$watch(function() { return ngModel.$modelValue; }, checkboxGroup.validate );
        // In case we are adding and removing checkboxes dynamically we need to tidy up after outselves.
        scope.$on('$destroy', function() { checkboxGroup.deregister(ngModel); });
    }
    }
};
  });