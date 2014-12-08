;(function(){
  'use strict';

  angular.module('addressBook', [])
    .controller('addressBookController', function($http){
      var vm = this;

      $http.get('https://leonaddress-book.firebaseio.com/contacts.json')
        .success(function(data){
          vm.contacts = data;
        });

      vm.addNewContact = function(){
        $http.post('https://leonaddress-book.firebaseio.com/contacts.json', vm.newContact)
          .success(function(data){
            vm.contacts[data.name] = vm.newContact;
            vm.newContact = _defaultContact();
            console.log("Running addNewContact. The info is:" + vm.newContact.name);
          })
          .error(function(err){
            console.log('add contact error:' + err);
          });
        // --Prev Code--
        // vm.contacts.push(vm.newContact);
      };

      vm.removeContact = function(contactId){
        var url = 'https://leonaddress-book.firebaseio.com/contacts/' + contactId + '.json';
        $http.delete(url)
          .success(function(){
            delete vm.contacts[contactId];
          })
          .error(function(err){
            console.log('remove contact error:' + err);
          });
        // --Prev Code--
        // var index = vm.contacts.indexOf(contact);
        // vm.contacts.splice(index, 1);
      };

      vm.newContact = _defaultContact();

      function _defaultContact(){
        return {

        }
      }
      // vm.newContact = {};
  });
})();
