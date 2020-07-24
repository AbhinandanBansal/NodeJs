let chai = require('chai');
let chaihttp = require('chai-http');
let expect = chai.expect;
chai.use(chaihttp);


describe('Testing Rest Api', () => {
    it('should  return status 200 for /',function(done){
        chai
            .request('http://localhost:3000')
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    });

    it('should return status 200 for /getMovies',function(done){
        chai
            .request('http://localhost:3000')
            .get('/getMovies')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

    it('should return status 404 for /getMovie',function(done){
        chai
            .request('http://localhost:3000')
            .get('/getMovie')
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

    it('should return status 201 for /addMovie',function(done){
        let movie = {
            "name":"MI-5",
            "genre":"Action",
            "rating":8,
            "language":"English",
            "achievements" : "Super Hit"
        }
        chai
            .request('http://localhost:3000')
            .post('/addMovie')
            .send(movie)
            .then(function(res){
                expect(res).to.have.status(201);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

    it('should return status 404 for /deleteMovie',function(done){
        let movie = {
            "name":"MI-7"
        } 
        chai
            .request('http://localhost:3000')
            .delete('/deleteMovie')
            .send(movie)
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

    it('should return status 200 for /deleteMovie',function(done){
        let movie = {
            "name":"MI-5"
        } 
        chai
            .request('http://localhost:3000')
            .delete('/deleteMovie')
            .send(movie)
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });


    it('should return status 200 for /updateMovie',function(done){
        let movie = {
            "name":"Sully",
            "genre":"Action",
            "rating":8,
            "language":"English",
            "achievements" : "Super Hit"
        } 
        chai
            .request('http://localhost:3000')
            .delete('/updateMovie')
            .send(movie)
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

    it('should return status 404 for /updateMovie',function(done){
        let movie = {
            "name":"MI-6",
            "genre":"Action",
            "rating":8,
            "language":"English",
            "achievements" : "Super Hit"
        } 
        chai
            .request('http://localhost:3000')
            .delete('/updateMovie')
            .send(movie)
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                throw(err);
            })
    });

});

