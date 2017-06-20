/**
 * Created by olyjosh on 21/01/2017.
 */

(function () {
    'use strict';
    
    var div;
    var searchKey ="that";


    var app = angular.module('ngSearchResult', []);
    app.service('service', service);
    app.directive('ngSearchResult', function (service) {  // directive for animating sprite on mouse movement
        return {
            restrict: 'AE',
            scope: {'onChange':'=' },
            link: function(scope, elm, attrs) {
                div =elm;
                // console.log(div.childNodes)
                
                scope.$watch('onChange', function(nVal) {
                    elm.val(nVal);
                    console.log(elm.childNodes)
                    service.doo(elm);

                });
                elm.bind('blur', function() {
                    var currentValue = elm.val();
                    if( scope.onChange !== currentValue ) {
                        scope.$apply(function() {
                            scope.onChange = currentValue;
                            console.log('askjasjnajs')
                        });
                    }
                });
            }
            // scope : {
            //     key : '='
            // },
            // link: function ($scope, element, attrs) {
            //
            //     // div = element[0];
            //     // searchKey=$scope.key;
            //     // $scope.$watch(searchKey, function() {
            //     //     alert('hey, my var has changed!');
            //     // });
            //     // service.doo();
            //     // // element.bind("DOMSubtreeModified",function(){
            //     // //     alert('changed');
            //     // // });
            //
            //
            //     $scope.$watch(
            //         function () { return element[0].childNodes.length; },
            //         function (newValue, oldValue) {
            //             if (newValue !== oldValue) {
            //                 // code goes here
            //                 alert('NJSnhdkn');
            //             }
            //         }
            //     );
            //
            // }
        };
    });


    function service() {
        // var self = this;
        // var div = document.getElementById('s');
        // var div = document.getElementById('a');

        function changeNode(n, r, f) {
            f=n.childNodes;

            console.log('\n\nFROM bm :'+n);
            // for(c in f) changeNode(f[c], r);
            for(var i =0; i<f.length; i++)
                changeNode(f[i], r);

            if (n.data) {
                f = document.createElement('span');
                f.innerHTML = n.data.replace(r, '<span class=found>$1</span>');
                n.parentNode.insertBefore(f, n);
                n.parentNode.removeChild(n);
            }
        }

        this.doo = function (n) {
            var spans = document.getElementsByClassName('found');
            while (spans.length) {
                var p = spans[0].parentNode;
                p.innerHTML = p.textContent || p.innerText;
            }

            if (searchKey)
                changeNode(n, new RegExp('('+searchKey+')','gi'));
        }

    }

})();