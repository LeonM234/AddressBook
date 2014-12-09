;(function(){
  'use strict';

  angular.module('addressBook', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/table.html',
          controller: 'addressBookController',
          controllerAs: 'abctrl'
        })
        .when('/new', {
          templateUrl: 'views/forms.html',
          controller: 'addressBookController',
          controllerAs: 'abctrl'
        })
        .when('/:id', {
          templateUrl: 'views/show.html',
          controller: 'ShowController',
          controllerAs: 'show'
        })
        .otherwise({redirectTo: '/'});
    })

    .controller('showController', function($http, $routeParams){
      var vm = this;
      var id = $routeParams.id;
      $http.get('https://leonaddress-book.firebaseio.com/contacts/' + id + '.json')
        .success(function(data){
          console.log(data);
          vm.contact = data;
        })
        .error(function(err){
          console.log(err);
        });
    })

    .controller('addressBookController', function($http){
      var vm = this;

      var httpget = function(){
        $http.get('https://leonaddress-book.firebaseio.com/contacts.json')
        .success(function(data){
          vm.contacts = data;
        });
      }

      httpget();

      vm.addNewContact = function(){
        $http.post('https://leonaddress-book.firebaseio.com/contacts.json', vm.newContact)
          .success(function(data){
            console.log(vm.contacts);
            console.log(vm.newContact);
            vm.contacts[data.name] = vm.newContact;
            vm.newContact = _defaultContact();
          })
          .error(function(err){
            console.log('add contact error:' + err);
          });
      };

      vm.removeContact = function(contactId){
        var url = 'https://leonaddress-book.firebaseio.com/contacts/' + contactId + '.json';
        $http.delete(url)
          .success(function(data){
            delete vm.contacts[contactId];
          })
          .error(function(err){
            console.log('remove contact error:' + err);
          });
      };

      vm.newContact = _defaultContact();

      function _defaultContact(){
        return {
          name: ''
        }
      }
      // vm.newContact = {};
  });
})();
