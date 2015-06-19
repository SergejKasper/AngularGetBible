angular.module('angularGetBible.directives').directive('getBibleNavigation', function(GetBibleService) {
    return {
        scope: {
            showOptions: '=?shownOptions',
            selectedVersion: '=?selectedVersion',
            selectedChapter: '=?selectedChapter',
            selectedBook: '=?selectedBook',
            selectedVerses: '=?selectedVerses',
            selection: '=?selection'
        },
        link: function(scope, element, attrs) {
            scope.selection = {};
            var optArr = ['version', 'book', 'chapter', 'verse'];
            scope.selectedVersion = scope.selectedVersion || 'kjv';
            scope.selectedBook = scope.selectedBook || '';
            scope.selectedChapter = scope.selectedChapter || '';
            scope.selectedVerses = scope.selectedVerses || [];
            scope.shownOptions = scope.shownOptions || optArr;

            scope.$watch('shownOptions', function(opts) {
                scope.options = optArr.filter(function(o) {
                    return opts.indexOf(o) !== -1;
                });
            });
            GetBibleService.getBooks(scope.selectedVersion).success(function(json) {
                scope.books = json;
            }).error(function(err) {
                console.log(err);
            });
            scope.selectBook = function(book) {
                scope.selectedBook = book;
                if (book) {
                    GetBibleService.getChapters(book['book_nr'], scope.selectedVersion).success(function(json) {
                        scope.chapters = json;
                    }).error(function(err) {
                        console.log(err);
                    });
                }
            };
            scope.selectChapter = function(chapterNr) {
                scope.selectedChapter = chapterNr;
                if (chapterNr) {
                    GetBibleService.getVerses(scope.selectedBook['book_name'], chapterNr, scope.selectedVersion)
                        .success(function(json) {
                            scope.verseNrs = Object.keys(json.chapter);
                            scope.verses = json;
                        }).error(function(err) {
                            console.log(err);
                        });
                }
            };
            scope.selectVerses = function(verseNr) {
                if (scope.selectedVerses.indexOf(verseNr) === -1) {
                    scope.selectedVerses.push(verseNr);
                } else {
                    scope.selectedVerses = scope.selectedVerses.filter(function(v) {
                        return (v !== verseNr);
                    });
                }
                scope.selection.verses = scope.selectedVerses.map(function(vNr) {
                    return scope.verses.chapter[vNr];
                });
                scope.selection['verse_nr'] = scope.selectedVerses;
                scope.selection['book_name'] = scope.verses['book_name'];
                scope.selection['chapter_nr'] = scope.verses['chapter_nr'];
            };
        },
        templateUrl: 'navigation.getbible.template.html'
    };
});