;(function(){
  'use strict';
  var app = angular.module("myApp", []);

  app.controller('ContactsController', function(){
    var vm = this;
    vm.contacts = [
    {
      name: 'Leon Peck',
      phone: 8675309,
      address:  'Valhalla',
      email: 'l335@aol.com'
    }
    ];

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

