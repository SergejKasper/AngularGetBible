(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularGetBible.config', [])
      .value('angularGetBible.config', {
          debug: true
      });

  // Modules TODO:,'ngCookies' save books for version
  angular.module('angularGetBible.directives', []);
  angular.module('angularGetBible.services', []);
  angular.module('angularGetBible.templates', []);
  angular.module('angularGetBible',
      [
          'angularGetBible.config',
          'angularGetBible.directives',
          'angularGetBible.services',
          'angularGetBible.templates'
      ]);

})(angular);

angular.module('angularGetBible.services').provider('GetBibleService', function() {
    function GetBibleService($http) {
        this.getVerse = function getVerse(book, chapter, verse, version) {
            book = book || '';
            chapter = chapter || '';
            verse = (verse) ? ':' + verse.toString() : '';
            version = version || 'kjv';
            return $http.jsonp('http://getbible.net/json?getbible=JSON_CALLBACK', {
                params: {
                    'p': book + chapter + verse,
                    'v': version
                }
            });
        };
        this.getVerses = function getVerses(book, chapters, version) {
            return this.getVerse(book, chapters, false, version);
        };
        this.getBooks = function getBooks(version) {
            return $http.jsonp('http://getbible.net/json?getbible=', {
                params: {
                    'callback': 'JSON_CALLBACK',
                    'option': 'com_getbible',
                    'task': 'bible.books',
                    'format': 'json',
                    'v': version
                }
            });
        };
        this.getChapters = function getBooks(bookNr, version) {
            return $http.jsonp('http://getbible.net/json?getbible=', {
                params: {
                    'callback': 'JSON_CALLBACK',
                    'option': 'com_getbible',
                    'task': 'bible.chapter',
                    'format': 'json',
                    'v': version,
                    'nr': bookNr
                }
            });
        };
    }

    this.$get = ['$http',
        function($http) {
            return new GetBibleService($http);
        }
    ];

});
angular.module('angularGetBible.directives').directive('getBibleNavigation', function($templateCache, GetBibleService) {
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
        template: $templateCache.get('angular-get-bible/templates/Navigation.template.html')
    };
});
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