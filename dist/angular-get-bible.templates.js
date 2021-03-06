angular.module('angularGetBible.templates').run(['$templateCache', function($templateCache) {
    $templateCache.put('angular-get-bible/templates/Navigation.template.html',
        "<form class=\"form-inline\">\n    <button ng-repeat=\" book in books track by book.book_nr\" class=\"btn btn-xs btn-default\" ng-click=\"selectBook(book)\" ng-class=\"{active: (selectedBook === book)}\">{{book.book_name}}</button>\n    <br><br>\n    <!-- select ng-options=\"book.book_name for book in books track by book.book_nr\"  class=\"form-control\" ng-model=\"selectedBook\"></select -->\n    <button ng-repeat=\"chapter in chapters track by chapter\"  class=\"btn btn-xs btn-default\" ng-click=\"selectChapter(chapter)\" ng-class=\"{active: (selectedChapter === chapter)}\">{{chapter}}</button>\n    <br><br>\n    <button ng-repeat=\"verse in verseNrs track by verse\" class=\"btn btn-xs btn-default\"  ng-click=\"selectVerses(verse)\"  ng-class=\"{active: (selectedVerses.indexOf(verse) != -1)}\">{{verse}}</button>\n</form>");
}]);
angular.module('angularGetBible.templates').run(['$templateCache', function($templateCache) {
    $templateCache.put('angular-get-bible/templates/VerseLinkView.template.html',
        "<div ng-transclude></div>\n<div class='get-bible-verse-link-view' ng-show='showing'>\n\t<button ng-click='showing = false'>Hide</button> \n\t\t<div class=\"get-bible-verse-link-overlay\" use-api get-bible-view-verses verse_nr='{{verse_nr}}' chapter_nr='{{chapter}}' book_name='{{book}}'></div>\n</div>");
}]);
angular.module('angularGetBible.templates').run(['$templateCache', function($templateCache) {
    $templateCache.put('angular-get-bible/templates/ViewVerses.template.html',
        "   <center><b>{{book_name}} {{chapter_nr}}</b></center>\n   <p class='{{scripture.direction.toLowerCase()}}'>\n     <div ng-repeat='verse in verses track by $id(verse)'>\n       <small class='ltr'>{{verse.verse_nr  |  number : 0}}</small>\n       {{verse.verse}}\n     </div>\n     <br>\n   </p>");
}]);