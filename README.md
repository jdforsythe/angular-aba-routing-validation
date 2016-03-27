angular-aba-routing-validation
==============================

An Angular directive for validating a routing number input field.

## Installation
```bash
$ bower install angular-aba-routing-validation
```

## Setup

Include `angular-aba-routing-validation'` in your module's dependencies:

```js
angular.module('myApp', ['angular-aba-routing-validation']);
```

## Usage

Simply add the `routing-number` attribute to your `<input>` field.

The directive attaches four properties to the `$error` property of your form field, so they can be used like any of the built-in validation directives (like `ng-minlength`, `ng-pattern`, etc.).

1. `formName.fieldName.$error.abaRouting` - the provided routing number fails validation (invalid length, invalid starting number, or fails algorithm check). Note that this does not set an error if the model is empty (`null` or `""`) so that you can make the input conditionally optional. You'll need to include `required` or `ng-required` to error when the model is empty.
2. `formName.fieldName.$error.abaRoutingInternal` - the provided routing number indicates a bank's internal routing number (begins with a 5) and is not a valid account routing number
3. `formName.fieldName.$error.abaRoutingMinLength` - the provided routing number is too short (less than 9 digits)
4. `formName.fieldName.$error.abaRoutingMaxLength` - the provided routing number is too long (more than 9 digits) - this probably shouldn't happen because `ng-maxlength` is automatically applied, which should restrict the user from being able to type in more than 9 characters, but...

This directive also includes `x-autocompletetype="routing-transit-number"` for good measure.

### Example with `ng-messages`

```html
<form name="checkInputForm">
  <input type="text" ng-model="vm.routingNumber" name="routingInput" ng-required="true" routing-number>
  <div ng-messages="checkInputForm.routingInput.$dirty && checkInputForm.routingInput.$invalid">
		<div ng-message="required">Routing number is required</div>
		<div ng-message="abaRoutingMinLength">Routing number must be exactly 9 digits</div>
    <div ng-message="abaRoutingInternal">You have provided an internal bank routing number</div>
    <div ng-message="abaRouting">Routing number is invalid</div>
  </div>
</form>
```

### Without `ng-messages`

```html
<form name="checkInputForm">
  <input type="text" ng-model="vm.routingNumber" name="routingInput" ng-required="true" routing-number>
  <div ng-if="checkInputForm.routingInput.$dirty && checkInputForm.routingInput.$invalid">
		<div ng-if="checkInputForm.routingInput.$error.required">Routing number is required</div>
		<div ng-if="checkInputForm.routingInput.$error.abaRoutingMinLength">Routing number must be exactly 9 digits</div>
    <div ng-if="checkInputForm.routingInput.$error.abaRoutingInternal">You have provided an internal bank routing number</div>
    <div ng-if="checkInputForm.routingInput.$error.abaRouting">Routing number is invalid</div>
  </div>
</form>
```

### Optional

```html
<form name="paymentInputForm">
  <div>
    <input type="radio" ng-model="vm.paymentType" name="paymentType" ng-required="true" value="credit">Credit<br>
    <input type="radio" ng-model="vm.paymentType" name="paymentType" ng-required="true" value="check">Check
  </div>
  <div>
    <input type="text" ng-model="vm.routingNumber" name="routingInput" ng-required="vm.paymentType == 'check'" routing-number>
    <div ng-if="checkInputForm.routingInput.$dirty && checkInputForm.routingInput.$invalid">
      <div ng-if="checkInputForm.routingInput.$error.required">Routing number is required when choosing check</div>
      <div ng-if="checkInputForm.routingInput.$error.abaRouting">Routing number is invalid</div>
    </div>
  </div>
</form>
```

## Tests

A round of tests is included. To run the tests, execute:

```
karma start karma.conf.js
```

## Contributions

Contributions are always welcome. Please submit issues and pull requests.

## License

[MIT](LICENSE)
