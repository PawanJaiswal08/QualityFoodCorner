const sinon = require('sinon');
const chai = require('chai');
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let foodCtrl = require('../controllers/product');

const server = require('../src/App');
const { response } = require('express');
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1ZjY2ZTk5NmExY2I2NTVhNGQ0ZmMiLCJpYXQiOjE2NTA5OTQ5MzB9.WfbZjBTYn0i47kLwJuv3ZzNxLrEEuvslcrV1YmNMKMw';

describe('Products', function () {
    // checking that get request for getting all food items is working properly
    it('get products', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                done();
            });
    });

    it('get products by id', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .get('/api/product/624e5d4dca329714df4eb850')
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                done();
            });
    });

    it('Update product', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .put('/api/product/624e5d4dca329714df4eb850/6195f66e996a1cb655a4d4fc')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'Panipurissss',
                description: 'Tasty and chatpaati',
                price: '38',
            })
            .then((res) => {
                expect(res).to.have.status(200);
                // console.log(res.body);
            })
            .catch(function (err) {
                console.log(err);
            });
        done();
    });
});

describe('Offers', function () {
    // checking that get request for getting all food items is working properly
    it('get all offers', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .get('/api/offers')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                done();
            });
    });

    it('Delete offer', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .delete('/api/offers/62684f92144eaa351e893787/6195f66e996a1cb655a4d4fc')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                // res.should.have.status(200);
                console.log(res.body);
                done();
            });
    });
});

describe('Categories', function () {
    // checking that get request for getting all food items is working properly
    it('get categories', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .get('/api/categories')
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body.data);
                done();
            });
    });

    it('get category by id', function (done) {
        this.timeout(0);
        chai
            .request(server)
            .get('/api/category/619cb6bddafcf9142ec6f52a')
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                done();
            });
    });
});