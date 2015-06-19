# Angular GetBible

## Fetch and display Bible verses with [AngularJS](angularjs.org)

### What?
Use this module to select, fetch and display Bible Verses using the [GetBible.net API](https://getbible.net/api). 
Check out the [example](http://sergejkasper.github.io/AngularGetBible/).

### How?


##### GetBibleService
Fetches Verses, Chapters and Books from a GetBible API. Since GetBible is a [Component](https://getbible.net/downloads) for [Joomla](http://www.joomla.org/), you can run your own Bible-API with many options for customization. Thus this Service will soon be updated to allow API-Root-URL-Configuration in the provider.

##### GetBibleNavigation Directive
Displays a Navigation to choose book, chapter and verse of Scripture to display (while fetching those from an API)

##### GetBibleVerseView Directive
Displays the Verse chosen through the navigation


## Credit
This is a simple project based on the great work of [Llewellynvdm](https://github.com/Llewellynvdm) and [Mountain of Success]( http://www.mountainofsuccess.com/) on the [GetBible-Project]()

## ToDo
1) Loading-indicator 
2) Better error-handling if connection fails. 

## Changelog
0.0.1 Upload VerseView and Navigation and github.io example
0.0.2 Publish to Bower
0.0.3 Static verse example