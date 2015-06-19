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