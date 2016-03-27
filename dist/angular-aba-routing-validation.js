(function() {
	function passesLuhnCheck(routing) {
		var checksumTotal = (7 * (parseInt(routing.charAt(0),10) + parseInt(routing.charAt(3),10) + parseInt(routing.charAt(6),10))) +
                        (3 * (parseInt(routing.charAt(1),10) + parseInt(routing.charAt(4),10) + parseInt(routing.charAt(7),10))) +
                        (9 * (parseInt(routing.charAt(2),10) + parseInt(routing.charAt(5),10) + parseInt(routing.charAt(8),10)));
    var checksumMod = checksumTotal % 10;
    if (checksumMod !== 0) return false;
    return true;
	}

	function ABARoutingValidation($parse) {
		return {
			restrict: 'A',
			require: 'ngModel',
			compile: function(element, attributes) {
				attributes.$set('pattern', '/[012346789][0-9]{8}/');
				attributes.$set('maxlength', 9);
				attributes.$set('xAutocompletetype', 'routing-transit-number');

				return function(scope, element, attributes, ngModel) {
					ngModel.$validators.abaRoutingMinLength = function(value) {
						value = value + '';
						if (value.length < 9) return false;
						return true;
					};

					ngModel.$validators.abaRoutingMaxLength = function(value) {
						value = value + '';
						if (value.length > 9) return false;
						return true;
					};

					// internal routing numbers begin with a 5 - these are not valid routing numbers
					ngModel.$validators.abaRoutingInternal = function(value) {
						value = value + '';
						if (value.length < 1) return true; // don't fail if we don't have a value yet
						if (value.substring(0, 1) === '5') return false;
						return true;
					};

					ngModel.$validators.abaRouting = function(value) {
						
						if (typeof value !== 'string') return false;

						// should be 9 digits, not starting with a 5
						var abaRegex = /^[012346789][0-9]{8}$/;
						if (!abaRegex.test(value)) return false;

						// should pass the Luhn algorithm check
						return passesLuhnCheck(value);
					};


				};
			}
		};
	}

	ABARoutingValidation.$inject = ['$parse'];
	angular.module('angular-aba-routing-validation', []).directive('routingNumber', ABARoutingValidation);
})();