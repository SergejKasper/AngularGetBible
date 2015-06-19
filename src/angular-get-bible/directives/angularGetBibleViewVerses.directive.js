angular.module('angularGetBible.directives').directive('getBibleViewVerses', function($templateCache, GetBibleService) {
    return {
        scope: {
            verses: '=?verses',
            verseNr: '&verse_nr',
            chapterNr: '&chapter_nr',
            bookName: '&book_name'
        },
        link: function(scope, element, attrs) {
            scope.$watchCollection('[verses, verseNr, chapterNr, bookName]', function(newVal) {
                if (!scope.verses && attrs.chapterNr && !isNaN(attrs.chapterNr) && attrs.bookName) {
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
            });
        },
        template:  $templateCache.get('angular-get-bible/templates/ViewVerses.template.html')
    };
});