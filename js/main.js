;(function(){
  'use strict';

  // ----- MODULE -----
  angular.module('addressBook', ['ngRoute', 'mgcrea.ngStrap'])
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
        .when('/:id/edit', {
          templateUrl: 'views/forms.html',
          controller: 'EditController',
          controllerAs: 'abctrl'
        })
        .otherwise({redirectTo: '/'});
    })

    // ----- FACTORY -----
    .factory('contactsFactory', function($http, $location){

      function getContact(id, cb){
        var url = 'https://leonaddress-book.firebaseio.com/contacts/' + id + '.json'
        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function editContact(id, contact){
        var url = 'https://leonaddress-book.firebaseio.com/contacts/' + id + '.json'
        $http.put(url, contact)
        .success(function(data){
          $location.path('/')
        })
        .error(function(err){
          console.log(err);
        });
      }

      function getAllContacts(cb){
        $http.get('https://leonaddress-book.firebaseio.com/contacts.json')
        .success(function(data){
          cb(data)
        })
        .error(function(err){
          console.log(err);
        });
      }

      function createContact(contact, cb){
        $http.post('https://leonaddress-book.firebaseio.com/contacts.json', contact)
        .success(function(data){
          cb(data)
        })
        .error(function(err){
          console.log('add contact error:' + err);
        });
      }

      function deleteContact(contactId, cb){
        var url = 'https://leonaddress-book.firebaseio.com/contacts/' + contactId + '.json';
        $http.delete(url)
        .success(function(data){
          cb()
        })
        .error(function(err){
          console.log('remove contact error:' + err);
        });
      }

      return{
        getContact: getContact,
        editContact: editContact,
        getAllContacts: getAllContacts,
        createContact: createContact,
        deleteContact: deleteContact
      };
    })

    // ----- SHOW CONTROLLER -----
    .controller('ShowController', function($routeParams, contactsFactory){
      var vm = this;
      var id = $routeParams.id;
      contactsFactory.getContact(id, function(data){
        vm.contact = data;
      });
    })

    // ----- EDIT CONTROLLER -----
    .controller('EditController', function($routeParams, contactsFactory){
      var vm = this;
      var id = $routeParams.id;

      contactsFactory.getContact(id, function(data){
        vm.newContact = data;
      });

      vm.addNewContact = function(){
        contactsFactory.editContact(id, vm.newContact)
      };
    })

    // ----- ADD. BOOK CONTROLLER -----
    .controller('addressBookController', function(contactsFactory){
      var vm = this;

      contactsFactory.getAllContacts(function(data){
        vm.contacts = data;
      })

      // httpget();

      vm.addNewContact = function(){
        contactsFactory.createContact(vm.newContact, function(data){
          vm.contacts[data.name] = vm.newContact;
          vm.newContact = _defaultContact();
        });
      };

      vm.removeContact = function(contactId){
        contactsFactory.deleteContact(contactId, function(){
          delete vm.contacts[contactId];
        })
      };

      vm.newContact = _defaultContact();

      function _defaultContact(){
        return {
          name: ''
        }
      }
  });
})();
