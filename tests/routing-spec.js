describe('directives', function() {
	var $scope, form;

  beforeEach(module('angular-aba-routing-validation'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;

    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.routing" name="routing" routing-number>' +
      '</form>'
    );
    $compile(element)($scope);

    $scope.model = { routing: "123" };
    form = $scope.form;
  }));

  describe('routing number', function() {
    it('should fail with short number', function() {
      form.routing.$setViewValue('12345678');
      $scope.$digest();
      expect($scope.model.routing).toBeUndefined();
      expect(form.routing.$valid).toBe(false);
      expect(form.routing.$error.abaRoutingMinLength).toBe(true);
      expect(form.routing.$error.abaRoutingMaxLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingInternal).toBeUndefined();
      expect(form.routing.$error.abaRouting).toBe(true);
    });

    it('should fail with long number', function() {
      form.routing.$setViewValue('1234567890');
      $scope.$digest();
      expect($scope.model.routing).toBeUndefined();
      expect(form.routing.$valid).toBe(false);
      expect(form.routing.$error.abaRoutingMinLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingMaxLength).toBe(true);
      expect(form.routing.$error.abaRoutingInternal).toBeUndefined();
      expect(form.routing.$error.abaRouting).toBe(true);
    });

    it('should fail with internal routing number', function() {
      form.routing.$setViewValue('500000001');
      $scope.$digest();
      expect($scope.model.routing).toBeUndefined();
      expect(form.routing.$valid).toBe(false);
      expect(form.routing.$error.abaRoutingMinLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingMaxLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingInternal).toBe(true);
      expect(form.routing.$error.abaRouting).toBe(true);
    });

    it('should fail with invalid check digit', function() {
      form.routing.$setViewValue('400000007');
      $scope.$digest();
      expect($scope.model.routing).toBeUndefined();
      expect(form.routing.$valid).toBe(false);
      expect(form.routing.$error.abaRoutingMinLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingMaxLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingInternal).toBeUndefined();
      expect(form.routing.$error.abaRouting).toBe(true);
    });

    it('should fail with non-numeric input', function() {
      form.routing.$setViewValue('a00000008');
      $scope.$digest();
      expect($scope.model.routing).toBeUndefined();
      expect(form.routing.$valid).toBe(false);
      expect(form.routing.$error.abaRoutingMinLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingMaxLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingInternal).toBeUndefined();
      expect(form.routing.$error.abaRouting).toBe(true);
    });

    it('should pass with valid check digit', function() {
      form.routing.$setViewValue('400000008');
      $scope.$digest();
      expect($scope.model.routing).toBe('400000008');
      expect(form.routing.$valid).toBe(true);
      expect(form.routing.$error.abaRoutingMinLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingMaxLength).toBeUndefined();
      expect(form.routing.$error.abaRoutingInternal).toBeUndefined();
      expect(form.routing.$error.abaRouting).toBeUndefined();
    });

    it('should pass if empty and not required', function() {
      delete $scope.model.routing;
      form.routing.$setViewValue(null);
      $scope.$digest();
      expect($scope.model.routing).toBe(null);
      expect(form.routing.$valid).toBe(true);

      form.routing.$setViewValue('');
      $scope.$digest();
      expect($scope.model.routing).toBe('');
      expect(form.routing.$valid).toBe(true);
    });
  });
});
