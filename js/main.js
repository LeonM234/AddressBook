;(function(){
  'use strict';

  angular.module('addressBook', []);
    .controller('addressBookController', function($http){
      var vm = this;

      vm.addNewContact = function(){
        vm.contacts.push(vm.newContact);
      };

      vm.removeContact = function(contact){
        var index = vm.contacts.indexOf(contact);
        vm.contacts.splice(index, 1);
      };

      vm.newContact = null;
  });
})();
