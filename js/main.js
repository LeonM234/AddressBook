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
        $http.post('https://leonaddress-book.firebaseio.com/contacts.json')
          .success(function(data){
            vm.contacts[data.name] = vm.newContact;
            vm.newContact = null;
            console.log("add new contact is firing. new info is:" + vm.newContact.name);
          });
          .error(function(err){
            console.log(err);
          });
        // --Prev Code--
        // vm.contacts.push(vm.newContact);
      };

      vm.removeContact = function(contact){
        var url = 'https://leonaddress-book.firebaseio.com/' + addId + '.json';
        $http.delete(url)
          .success(function(){
            delete vm.contacts[add];
          });
        // --Prev Code--
        // var index = vm.contacts.indexOf(contact);
        // vm.contacts.splice(index, 1);
      };

      vm.newContact = {};
  });
})();
