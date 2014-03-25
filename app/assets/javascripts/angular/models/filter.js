angular.module('openproject.models')

.constant('OPERATORS_REQUIRING_VALUES', ['o', 'c', '!*', '*', 't', 'w'])
.factory('Filter', ['OPERATORS_REQUIRING_VALUES', 'AVAILABLE_WORK_PACKAGE_FILTERS', function(OPERATORS_REQUIRING_VALUES, AVAILABLE_WORK_PACKAGE_FILTERS) {
  Filter = function (data) {
    angular.extend(this, data);
    this.pruneValues();
  };

  Filter.prototype = {
    toParams: function() {
      var params = {};

      params['op[' + this.name + ']'] = this.operator;
      params['v[' + this.name + '][]'] = this.valuesAsArray();

      return params;
    },

    valuesAsArray: function() {
      if (this.values instanceof Array) {
        return this.values;
      } else {
        return [this.values];
      }
    },

    requiresValues: function() {
      return OPERATORS_REQUIRING_VALUES.indexOf(this.operator) === -1;
    },

    isConfigured: function() {
      return this.operator && (this.hasValues() || !this.requiresValues());
    },

    getModelName: function() {
      return AVAILABLE_WORK_PACKAGE_FILTERS[this.name].modelName;
    },

    pruneValues: function() {
      this.values = this.values.filter(function(value) {
        return value !== '';
      });
    },

    hasValues: function() {
      return this.values && (this.values instanceof Array) ? this.values.length > 0 : !!this.values;
    }
  };

  return Filter;
}]);
