angular.module('angularGetBible.directives').directive('getBibleViewVerses', function($templateCache, GetBibleService) {
    return {
        scope: {
            verses: '=?verses',
            verseNr: '&verse_nr',
            chapterNr: '&chapter_nr',
            bookName: '&book_name',
            useApi: '&'
        },
        link: function(scope, element, attrs) {
            var watcher =  function(newVal) {
                if ((typeof attrs.useApi !== 'undefined') && attrs.chapterNr && !isNaN(attrs.chapterNr) && attrs.bookName) {
                    GetBibleService.getVerses(attrs.bookName, attrs.chapterNr, 'kjv').success(function(json) {
                        var versefilter = (attrs.verseNr) ? JSON.parse(attrs.verseNr) : Object.keys(json.chapter);
                        scope.verses = versefilter.map(function(vNr) {
                            return json.chapter[vNr];
                        });
                        scope.bookName = json['book_name'];
                        scope.chapterNr = json['chapter_nr'];
                    }).error(function(err) {
                        console.log(err);
                    });
                }
            };
            scope.$watch(function () {
              return [scope.verses, attrs.versesNr, attrs.chapterNr, attrs.bookName];
            }, watcher, true);
        },
        template:  $templateCache.get('angular-get-bible/templates/ViewVerses.template.html')
    };
});