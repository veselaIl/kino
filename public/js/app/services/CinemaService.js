myApp.factory('CinemaService', function($http) {
    var cinemas = [],
        editMovie = {},
        cinema = {};
    return {
        getCinemas: function() {
            return new Promise(function (resolve, reject) {
                $http.get('/admin/api/cinema')
                    .then(function(response) {
                        // necessery actions before the resolve
                        cinemas = response.data;
                        resolve(cinemas);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },
        getCinema: function (projection){
            return new Promise(function (resolve, reject){
                $http.get('/admin/api/cinema/'+ projection.kinoID + '/' + projection.zalaID )
                    .then(function (response){
                        cinema = response.data;
                        resolve(cinema);
                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
        },
        addCinema: function (cinema){
            return new Promise(function (resolve, reject) {
                $http.post('/admin/api/cinema/add', { cinema: cinema })
                    .then(function(response) {
                        // necessery actions before the resolve
                        cinema.kinoID = response.data.id;
                        console.log('response', response.data);
                        console.log('user', cinema);
                        cinemas.push(cinema);
                        resolve();
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        },
        getProjections: function (id){
            console.log(id + 'Id na kino');
            return new Promise(function (resolve, reject){
                $http.get('/admin/api/cinema/projections/'+id)
                    .then(function (response){
                        console.log(response);
                        cinema = response.data.cinema;
                        resolve(cinema);
                    })
                    .catch(function (err){
                        reject(err);
                    })  
            })
        // },
        // addProjections: function (projections, cinema){
        //     console.log(projections, 'PROJECTIONS');
        //     return new Promise(function (resolve, reject){
        //         $http.post('/admin/api/projections/add/'+ cinema.kinoID , { projections : projections})
        //             .then(function (response){
        //                 console.log(response);
        //                 projections = response.data;
        //                 resolve(projections);
        //             })
        //             .catch(function (err){
        //                 reject(err);
        //             })
        //     })
        // }
        },
        removeZala: function(zalaID, kinoID){
            return new Promise(function (resolve, reject){
                $http.post('/admin/api/cinema/delete/' + kinoID + '/' + zalaID )
                    .then(function (response){
                        console.log(response, 'DELETE ZALA RESPONSE')
                        resolve(response);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        },
        removeCinema: function (kinoID){
            return new Promise(function (resolve, reject){
                $http.post('/admin/api/cinema/delete/' + kinoID)
                    .then(function (response){
                        resolve(response);
                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
        },
        addZala : function (zala, kinoID){
            return new Promise(function (resolve, reject){
                $http.post('/admin/api/cinema/zala/add/' + kinoID, { zala : zala })
                .then(function (response){
                    resolve();
                })
                .catch(function (err){
                    reject(err);
                })
            })
        },
        editZala: function (zala, kinoID){
            return new Promise(function (resolve, reject){
                console.log(kinoID, 'kinoID')
                $http.post('/admin/api/cinema/zala/edit/' + kinoID, { zala : zala})
                    .then(function (response){
                       editMovie = response.data;
                       resolve();
                    })
                    .catch(function (err){
                        console.log(err);
                    })
            })
        },
    }
});