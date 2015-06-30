angular.module('angularGetBible.directives').directive('getBibleVerseLinkView', function ($templateCache){
  return {
    restrict: 'AE',
    transclude: true,
    scope: true,
    replace: false,
    controller: function($scope) {
      $scope.showing = false;
      $scope.book = 'John';
      $scope.chapter = '3';
      $scope['verse_nr'] = [16];
      this.showScripture = function(book, chapter, verses){
        $scope.$apply(function(){
          $scope.showing = true;
          $scope.book = book;
          $scope.chapter = chapter;
          $scope['verse_nr'] = verses;
        });
      };
      this.setShow = function(show){
        $scope.$apply(function(){
          $scope.showing = show;
        });
      };
    },
    template: $templateCache.get('angular-get-bible/templates/VerseLinkView.template.html')
  };
}).directive('getBibleVerseLink', function (){
  return {
    require: '^getBibleVerseLinkView',
    restrict: 'AC',
    link: function (scope, element, attrs, getBibleVerseContentCtrl) {
      element.on('click', function(event) {
          event.preventDefault();
          var res = {}, 
          d = decodeURIComponent;
          event.target.search.substring(1).split('&').forEach(function(s){ 
            var search = s.split('='); res[d(search[0])] = d(search[1]);
          });
          getBibleVerseContentCtrl.showScripture(res.b, res.chNr, JSON.parse(res.vNrs));
          getBibleVerseContentCtrl.setShow(true);
      });
      
    }
  };
});