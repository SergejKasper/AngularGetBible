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
