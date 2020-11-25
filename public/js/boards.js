var ViewModel = function () {
    var self = this;
    self.entity = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.boardUsers = ko.observableArray();
    self.allUsers = ko.observableArray();
    self.selectedUser = ko.observable()
    self.boardLists = ko.observableArray();
    self.listCards = ko.observableArray();
    self.listDetails = ko.observable();
    self.cardDetails = ko.observable();
    self.detailLoading = ko.observable(false);
    self.loading = ko.observable(false);
    self.newEntity = {
        name: ko.observable(),
    }
    self.newListName = ko.observable();
    self.newCard = {
        name: ko.observable(),
        description: ko.observable(),
    }
    
    var selectedBoardID = 0;
    var selectedListID = 0;
    var Uri = '/api/boards/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // self.error(JSON.stringify(jqXHR));
            // alert(JSON.stringify(jqXHR));
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }


    function getAllBoards() {
        self.loading(true)
        self.entity(undefined)
        // self.listDetails(undefined);
        ajaxHelper(Uri, 'GET').done(function (data) {
            console.log(data)
            self.entity(data);
            self.loading(false)
        });
    }

    function getAllUsers() {
        ajaxHelper('/api/users/', 'GET').done(function (data) {
            self.allUsers(data);
            console.log(self.allUsers())
        });
    }

    self.getBoardDetail = function (item) {
        self.detail(undefined)
        // self.boardUsers(undefined)
        // self.listDetails(undefined);
        ajaxHelper(Uri + item.id, 'GET').done(function (data) {
            self.detail(data[0]);
            console.log('self.detail '+ JSON.stringify(self.detail().id));
            selectedBoardID = data[0].id;

            //get board users
            ajaxHelper('/api/users/' + 'getBoardUsers/' + item.id, 'GET').done(function (data) {
                self.boardUsers(data);
                console.log('self.boardUsers '+ JSON.stringify(data));
            });
            //get board lists
            ajaxHelper('/api/lists/' + 'getBoardLists/' + item.id, 'GET').done(function (data) {
                self.boardLists(data);
                console.log('self.boardLists '+ JSON.stringify(data));
            });
            self.listDetails(undefined);
            self.listCards(undefined);
            self.cardDetails(undefined)
        });
    }
    self.getListDetail = function (item) {
        self.listDetails(undefined)
        ajaxHelper('/api/lists/' + item.id, 'GET').done(function (data) {
            self.listDetails(data[0]);
            console.log('list.detail '+ JSON.stringify(self.listDetails()));
            // get List Cards
            ajaxHelper('/api/cards/' + 'getListCards/' + item.id, 'GET').done(function (data) {
                self.listCards(data);
                console.log('self.listCards '+ JSON.stringify(data));
            });
            self.cardDetails(undefined)
        });
    }

    self.getCardDetail = function (item) {
        self.cardDetails(undefined)
        ajaxHelper('/api/cards/' + item.id, 'GET').done(function (data) {
            self.cardDetails(data[0]);
            console.log('card.detail '+ JSON.stringify(self.cardDetails()));
            // get List Cards
            // ajaxHelper('/api/cards/' + 'getListCards/' + item.id, 'GET').done(function (data) {
            //     self.listCards(data);
            //     console.log('self.listCards '+ JSON.stringify(data));
            // });
        });
    }

    self.deleteBoard = function (param) {
        if (confirm('Are you sure you want to delete ' + param.name + ' this will delete users, lists in the board as well.')) {
            ajaxHelper(Uri + param.id, 'DELETE').done(function (data) {
                for (var i = self.entity().length - 1; i >= 0; --i) {
                    if (self.entity()[i].id == param.id) {
                        self.entity.splice(i,1);
                        self.detail(undefined);
                        self.boardUsers(undefined);
                    }
                }          
            });
        }         
    }

    self.addBoard = function (formElement) {
        var board = {
            name: self.newEntity.name(),
        };
        ajaxHelper(Uri, 'POST', board).done(function (item) {
            console.log(item);
            self.entity.unshift(item);
            self.newEntity.name('');
        });
    }

    self.addUserToBoard = function (formElement) {
        console.log('in add user to board')
        console.log(self.selectedUser())
        var boardUser = {
            user_id: self.selectedUser(),
            board_id: self.detail().id
        };
        ajaxHelper('/api/users/' + 'addUser', 'POST', boardUser).done(function (item) {
            console.log('user added as follows ')
            console.log(item);
            //get board users
            ajaxHelper('/api/users/' + 'getBoardUsers/' + item.board_id, 'GET').done(function (data) {
                self.boardUsers(data);
                console.log('self.boardUsers '+ JSON.stringify(data));
            });
        });
    }

    self.addUserToCard = function (formElement) {
        console.log('in add user to card')
        console.log(self.selectedUser())
        var cardUser = {
            user_id: self.selectedUser(),
            id: self.cardDetails().id
        };
        console.log(cardUser)
        ajaxHelper('/api/users/' + 'addUserToCard', 'POST', cardUser).done(function (item) {
            console.log('user added to card as follows ')
            console.log(item);
            //get card user
            ajaxHelper('/api/cards/' + item.id, 'GET').done(function (data) {
                console.log('card users just updated ' + JSON.stringify(data[0]) )
                self.cardDetails(data[0]);
            })
        });
    }

    self.addListToBoard = function (formElement) {
        console.log('in add list to board')
        var boardList = {
            name: self.newListName(),
            board_id: self.detail().id
        };
        ajaxHelper('/api/lists/' + 'addListToBoard', 'POST', boardList).done(function (item) {
            console.log('list added as follows ')
            console.log(item);
            self.newListName(undefined);
            //get board lists
            ajaxHelper('/api/lists/' + 'getBoardLists/' + item.board_id, 'GET').done(function (data) {
                self.boardLists(data);
                console.log('self.boardList '+ JSON.stringify(data));
            });
        });
    }

    self.addCardToList = function (formElement) {
        console.log('in add card to list')
        var listCard = {
            name: self.newCard.name(),
            description: self.newCard.description(),
            board_id: self.detail().id,
            list_id: self.listDetails().id

        };
        ajaxHelper('/api/cards/' + 'addCardToList', 'POST', listCard).done(function (item) {
            console.log('card added as follows ')
            console.log(item);
            self.newCard.name(undefined)
            self.newCard.description(undefined)
            //get lists cards
            ajaxHelper('/api/cards/' + 'getListCards/' + item.list_id, 'GET').done(function (data) {
                self.listCards(data);
                console.log('self.listCards '+ JSON.stringify(data));
            });
        });
    }

    self.deleteBoardUser = function (param) {
        if (confirm('Are you sure you want to delete ' + param.name)) {
            ajaxHelper('/api/users/' + 'deleteBoardUser/' + param.id, 'DELETE').done(function (data) {
                for (var i = self.boardUsers().length - 1; i >= 0; --i) {
                    if (self.boardUsers()[i].id == param.id) {
                        self.boardUsers.splice(i,1);
                    }
                }          
            });
        }         
    }

    self.deleteBoardList = function (param) {
        if (confirm('Are you sure you want to delete ' + param.name)) {
            ajaxHelper('/api/lists/' + 'deleteBoardList/' + param.id, 'DELETE').done(function (data) {
                for (var i = self.boardLists().length - 1; i >= 0; --i) {
                    if (self.boardLists()[i].id == param.id) {
                        self.boardLists.splice(i,1);
                    }
                }          
            });
        }         
    }

    self.deleteListCard = function (param) {
        if (confirm('Are you sure you want to delete ' + param.name)) {
            ajaxHelper('/api/cards/' + 'deleteListCard/' + param.id, 'DELETE').done(function (data) {
                for (var i = self.listCards().length - 1; i >= 0; --i) {
                    if (self.listCards()[i].id == param.id) {
                        self.listCards.splice(i,1);
                    }
                }          
            });
        }         
    }

    // Fetch the initial data.
    getAllBoards();
    getAllUsers();
};

$(document).ready(function() {
    // apply bindings here
    ko.applyBindings(new ViewModel());
});
