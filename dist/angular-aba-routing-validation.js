/* angular-aba-routing-validation v1.0.0 (https://github.com/jdforsythe/angular-aba-routing-validation) */
'use strict';
(function() {
  angular.module('angular-aba-routing-validation', [])
    .directive('routingNumber', ABARoutingValidation);

  function ABARoutingValidation() {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function(element, attributes) {
        attributes.$set('pattern', '/[012346789][0-9]{8}/');
        attributes.$set('maxlength', 9);
        attributes.$set('xAutocompletetype', 'routing-transit-number');

        return function(scope, elm, attrs, ngModel) {
          ngModel.$validators.abaRoutingMinLength = function(value) {
            if (!value || value === '') return true;
            value = String(value);
            if (value.length < 9) return false;
            return true;
          };

          ngModel.$validators.abaRoutingMaxLength = function(value) {
            if (!value || value === '') return true;
            value = String(value);
            if (value.length > 9) return false;
            return true;
          };

          // internal routing numbers begin with a 5 - these are not valid routing numbers
          ngModel.$validators.abaRoutingInternal = function(value) {
            if (!value || value === '') return true;
            value = String(value);
            if (value.length < 1) return true; // don't fail if we don't have a value yet
            if (value.substring(0, 1) === '5') return false;
            return true;
          };

          ngModel.$validators.abaRouting = function(value) {
            if (!value || value === '') return true;
            if (typeof value !== 'string') return false;

            // should be 9 digits, not starting with a 5
            var abaRegex = /^[012346789][0-9]{8}$/;
            if (!abaRegex.test(value)) return false;

            // should pass the Luhn algorithm check
            return _passesLuhnCheck(value);
          };
        };
      },
    };
  }

  function _passesLuhnCheck(routing) {
    var checksumTotal = (7 * (parseInt(routing.charAt(0), 10) + parseInt(routing.charAt(3), 10) + parseInt(routing.charAt(6), 10))) +
      (3 * (parseInt(routing.charAt(1), 10) + parseInt(routing.charAt(4), 10) + parseInt(routing.charAt(7), 10))) +
      (9 * (parseInt(routing.charAt(2), 10) + parseInt(routing.charAt(5), 10) + parseInt(routing.charAt(8), 10)));
    var checksumMod = checksumTotal % 10;
    if (checksumMod !== 0) return false;
    return true;
  }

})();
