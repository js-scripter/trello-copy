var ViewModel = function () {
    var self = this;
    self.users = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.detailLoading = ko.observable(false);
    self.usersLoading = ko.observable(false);
    self.newUser = {
        name: ko.observable(),
        email: ko.observable(),
    }

    var usersUri = '/api/users/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(JSON.stringify(jqXHR));
        });
    }

    function getAllUsers() {
        self.usersLoading(true)
        self.users(undefined)
        ajaxHelper(usersUri, 'GET').done(function (data) {
            console.log(data)
            self.users(data);
            self.usersLoading(false)
        });
    }

    self.getUserDetail = function (item) {
        self.detailLoading(true)
        self.detail(undefined)
        ajaxHelper(usersUri + item.id, 'GET').done(function (data) {
            self.detail(data[0]);
            self.detailLoading(false)
            console.log('self.detail '+ JSON.stringify(self.detail()));
        });
    }

    self.deleteUser = function (userParam) {
        if (confirm('Are you sure you want to delete ' + userParam.name)) {
            ajaxHelper(usersUri + userParam.id, 'DELETE').done(function (data) {
                for (var i = self.users().length - 1; i >= 0; --i) {
                    if (self.users()[i].id == userParam.id) {
                        self.users.splice(i,1);
                        self.detail(undefined);
                    }
                }          
            });
        }         
    }

    self.addUser = function (formElement) {
        var user = {
            name: self.newUser.name(),
            email: self.newUser.email()
        };
        ajaxHelper(usersUri, 'POST', user).done(function (item) {
            console.log(item);
            self.users.unshift(item);
            self.newUser.name('');
            self.newUser.email('');
        });
    }


    // Fetch the initial data.
    getAllUsers();
};

$(document).ready(function() {
    // apply bindings here
    ko.applyBindings(new ViewModel());
});
