# Angular GetBible

## Fetch and display Bible verses with [AngularJS](http://angularjs.org)

### What?
Use this module to select, fetch and display Bible Verses using the [GetBible.net API](https://getbible.net/api). 
Check out the [example](http://sergejkasper.github.io/AngularGetBible/).

### How?
Checkout the repo or install via [Bower](http://bower.io) 
```
bower install angular-get-bible --save
```
Then include the script and the templates in that order:
```
<script src="angular-get-bible.js"></script>
<script src="bower-components/angular-get-bible.templates.js"></script>
```
Then include the module:
```
var app = angular.module('testApp', ['angularGetBible']);
```

##### GetBibleService
Fetches Verses, Chapters and Books from a GetBible API. Since GetBible is a [Component](https://getbible.net/downloads) for [Joomla](http://www.joomla.org/), you can run your own Bible-API with many options for customization. Thus this Service will soon be updated to allow API-Root-URL-Configuration in the provider.


##### GetBibleNavigation Directive
Displays a Navigation to choose book, chapter and verse(s) of Scripture to display (while fetching those from an API)


##### GetBibleVerseView Directive
Display Verse(s) chosen and loaded through the navigation within the text. Or use the "use-api"-Attribute and pass a book, chapter and verse directly into the directive to load and display a verse without needing to recieve a model from the navigation.

##### GetBibleVerseLink & GetBibleVerseLinkView Directives
Insert verses as links, which are loaded and shown in an overlay, when clicking on the verse.

## Credit
This is a simple project based on the great work of [Llewellynvdm](https://github.com/Llewellynvdm) and [Mountain of Success]( http://www.mountainofsuccess.com/) on the [GetBible-Project]()

## ToDo
1) GetBibleService Customization

2) Loading-indicator 

3) Better error-handling if connection fails. 

4) Add other templates to select and display verses 

## Changelog

0.1 Upload VerseView and Navigation and github.io example

0.2 Publish to Bower

0.3 Self-Contained verses (select via navigation needed)

0.4 Insert verses as links and show them in an overlay
