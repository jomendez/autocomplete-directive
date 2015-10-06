var myApp = angular.module('myApp', ['CustomSelect']);


myApp.controller('Ctrl', myController);

myController.$inject = ['$scope']

function myController($scope) {
    $scope.listFromServer = [{
        name: 'aa',
        value: 'aaVal'
    }, {
        name: 'bb',
        value: 'bbVal'
    }, {
        name: 'cc',
        value: 'ccVal'
    }, {
        name: 'dd',
        value: 'ddVal'
    }, {
        name: '1aa',
        value: '1aaVal'
    }, {
        name: '1bb',
        value: '1bbVal'
    }, {
        name: '1cc',
        value: '1ccVal'
    }, {
        name: '1dd',
        value: '1ddVal'
    }, {
        name: '2aa',
        value: '2aaVal'
    }, {
        name: '2bb',
        value: '2bbVal'
    }, {
        name: '2cc',
        value: '2ccVal'
    }, {
        name: '2dd',
        value: '2ddVal'
    }, {
        name: '3aa',
        value: '3aaVal'
    }, {
        name: '3bb',
        value: '3bbVal'
    }, {
        name: '3cc',
        value: '3ccVal'
    }, {
        name: '3dd',
        value: '3ddVal'
    }, {
        name: '4aa',
        value: '4aaVal'
    }, {
        name: '4bb',
        value: '4bbVal'
    }, {
        name: '4cc',
        value: '4ccVal'
    }, {
        name: '4dd',
        value: '4ddVal'
    }, {
        name: '5aa',
        value: '5aaVal'
    }, {
        name: '5bb',
        value: '5bbVal'
    }, {
        name: '5cc',
        value: '5ccVal'
    }, {
        name: '5dd',
        value: '5ddVal'
    }];
};

angular.module('CustomSelect', [])
    .directive('customSelect', customSelectDirective)

customSelectDirective.$inject = ['$timeout'];

function customSelectDirective($timeout) {
    return {
        scope: {
            csList: '=csList',
            csSelectedElement: '=csSelectedElement',
            csName: '@csName',
            csValue: '@csValue',
            csSelectMultiples: '=csSelectMultiples',
            csEnabled: '=',
            csDisabled: '='
        },
        link: function (scope, element, attrs) {

            if (!attrs.id) {
                throw "You need to specify an Id";
            }

            if (typeof scope.csEnabled == 'undefined' && typeof scope.csDisabled == 'undefined') {
                scope.showEx = true;
            }
            //make a watch so every time csList is udated the internal list is updated
            scope.$watch('csList.length', function (newValue, oldValue) {
                scope.listByValue = angular.copy(scope.csList);
            });

            scope.showCustomSelectList = false;
            scope.id = '#' + attrs.id;
            scope.inputId = '#' + attrs.id + "-filter-input";
            $(scope.id + ' > input[type="text"]').attr('id', scope.inputId.replace('#', ''));
            //debugger
            $(scope.inputId).on('focus click', function () {
                $timeout(function () {
                    scope.showCustomSelectList = true;
                    // debugger
                });
            });

            $('html').not('.custom-select, ' + scope.inputId).on('click', function (e) {
                //debugger
                if ((scope.showCustomSelectList == true && !$(e.target).attr('id')) || (scope.showCustomSelectList == true && !! $(e.target).attr('id') && $(e.target).attr('id').indexOf(scope.inputId.replace('#', '')) == -1)) {
                    $timeout(function () {
                        scope.showCustomSelectList = false;
                    });
                }
            });

            if ( !! scope.csSelectMultiples) {
                scope.csSelectedElement = scope.csSelectedElement || []
            } else {
                scope.csSelectedElement = scope.csSelectedElement || ""
            }

            scope.selectElement = function (item, e) {
                e.stopPropagation();
                if ( !! scope.csSelectMultiples) {
                    scope.csSelectedElement.push(item);
                    //cope.filterInput = item[scope.csName];
                    scope.showCustomSelectList = true;
                    var index = scope.listByValue.indexOf(item)
                    if (index > -1) {
                        scope.listByValue.splice(index, 1);
                    }
                } else {
                    scope.csSelectedElement = item;
                    scope.filterInput = item[scope.csName];
                    scope.showCustomSelectList = false;
                }
            }

            scope.clearInput = function (e) {
                e.stopPropagation();
                if ( !! scope.csSelectMultiples) {
                    scope.csSelectedElement = [];
                } else {
                    scope.csSelectedElement = "";
                }
                scope.filterInput = "";
                scope.showCustomSelectList = true;
            }
        },

        template: '<input type="text" ng-model="filterInput" placeholder="" class="filter-input-class"  ng-enabled="csEnabled" ng-disabled="csDisabled"  /><span   ng-show="!!showEx || (csEnabled== true && csDisabled==false)" class="ex-filter-input-class" ng-click="clearInput($event)">x</span>' +
            '<input type="hidden" ng-model="csSelectedElement" >' +
            '<div class="custom-select-wrapper">' +
            '<div class="custom-select-list-class" ng-show="showCustomSelectList"><div class="custom-select">' +
            '<div ng-click="selectElement(item, $event)" ng-repeat="item in listByValue | filter: filterInput"><span>{{item[csName]}}</span> </div> ' +
            '</div></div>' +
            '</div>'
    }
}
