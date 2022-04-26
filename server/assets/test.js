const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Models
const Banner = require('./../models/banner');
const Category = require('./../models/category');
const Developer = require('./../models/developer');
const Offer = require('./../models/offer');
const Product = require('./../models/product');
const Store = require('./../models/store');
const User = require('./../models/user');

// Routes
const Routes = require('./../src/Routes');

const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};


mongoose.connect('mongodb+srv://Pawan:pawanjaiswal@cluster0.zqlfz.mongodb.net/Fahrenheit?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("Database Connected..."));
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./morgan/morgan"));
app.use('/api-docs', require("./api-docs/Swagger"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors(corsOptions));
app.use('/api', Routes);
app.use("/files", express.static(path.join(__dirname, "./Images")));


// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})


//-----------------------------------------------------------actual test code--------------------------------------------------------


let chai = require('chai');
let chaiHttp = require('chai-http');
const { read } = require('fs');
let should = chai.should();

chai.use(chaiHttp);


let user_token = null;
let editor_token = null;

let editor_id = null;
let article_id = null;


describe('/POST signup and login', () => {

    it('it should POST a new user', (done) => {

        let new_user = {
            "name": "marcel",
            "categories": ["general"],
            "email": "marcel@gmail.com",
            "password": "marcel",
            "image": "string"
        };

        chai.request(app)
            .post('/signup') 
            .send(new_user)
            .end((err, res) => {
                 // res.should.have.status(200);
            done();
            });   

    });


    it('it should login an existing user', (done) => {

        let user_credentials = {
            "email": "marcel@gmail.com",
            "password": "marcel"
        }

        chai.request(app)
            .post('/login') 
            .send(user_credentials)
            .end(
                    (err, res) => {
                    res.should.have.status(200);
                    user_token = res.body.token;
                    done();
                   
                    }
            );   


    });

});


describe('/GET user', () => {

    it('it should GET the logged in user', (done) => {
      chai.request(app)
          .get('/user')
          .set({ Authorization: `Bearer ${user_token}` })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("name").eql("marcel");
                res.body.should.have.property("email").eql("marcel@gmail.com");
            done();
          });
    });

});


describe('/PATCH user', () => {

    
    // it('it should update user', (done) => {

    //     let user_update = {
    //         "name": "Marcel Dominique"
    //     }  

    //     chai.request(app)
    //       .patch('/updateUser')
    //       .set({ Authorization: `Bearer ${user_token}` })
    //       .send(user_update)
    //       .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.have.property("message").eql("User updated Successfully ");
    //         done();
    //       });
    // });


    // it('it should GET the updated user', (done) => {
    //     chai.request(app)
    //         .get('/user')
    //         .set({ Authorization: `Bearer ${user_token}` })
    //         .end((err, res) => {
    //               res.should.have.status(200);
    //               res.body.should.have.property("name").eql("Marcel Dominique");
    //               res.body.should.have.property("email").eql("marcel@gmail.com");
    //           done();
    //         });
    // });

    
});

describe('/GET news', () => {

    it('it should GET the latest news', (done) => {
      chai.request(app)
          .get('/news')
          .set({ Authorization: `Bearer ${user_token}` })
          .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
            done();
          });
    });

});


describe('/POST signup and login', () => {

    it('it should POST a new editor', (done) => {

        let new_editor = {
            "name": "rached",
            "email": "rached@gmail.com",
            "password": "rached"
        };

        chai.request(app)
            .post('/editorSignup') 
            .send(new_editor)
            .end((err, res) => {
                 // res.should.have.status(200);
            done();
            });   

    });


    it('it should login an existing editor', (done) => {

        let editor_credentials = {
            "email": "rached@gmail.com",
            "password": "rached"
        }

        chai.request(app)
            .post('/editorLogin') 
            .send(editor_credentials)
            .end(
                    (err, res) => {
                    res.should.have.status(200);
                    editor_token = res.body.token;
                    done();
                   
                    }
            );   


    });

});



describe('/GET editor', () => {

    it('it should GET the editor', (done) => {
      chai.request(app)
          .get('/editor')
          .set({ Authorization: `Bearer ${editor_token}` })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("id");
                editor_id = res.body.id;
            done();
          });
    });

});


describe('/POST article', () => {

    let article = {
        "title": "Delhi witnesses a surge in Covid cases",
        "content": "Positivity rate 5.5% after 2 months"
      }


    it('it should create an article', (done) => {
      chai.request(app)
          .post('/createArticle')
          .send(article)
          .set({ Authorization: `Bearer ${editor_token}` })
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("article");
                article_id = res.body.article._id;
            done();
          });
    });

});



describe('/GET article by id and article by editor id', () => {

    // it('it should GET the article by article id', (done) => {
    //     chai.request(app)
    //         .get(" /getArticleById/  ` ${article_id} ` ")
    //         .set({ Authorization: `Bearer ${editor_token}` })
    //         .end((err, res) => {
    //               res.should.have.status(200);
    //               res.body.should.have.property("title").eql("Delhi witnesses a surge in Covid cases");
    //               res.body.should.have.property("content").eql("Positivity rate 5.5% after 2 months");
    //               res.body.should.have.property("author").eql( ` ${editor_id} `);
    //           done();
    //         });
    //   });

});


describe('/GET all articles and all editors', () => {

    it('it should GET all the articles', (done) => {
        chai.request(app)
            .get("/getArticles")
            .set({ Authorization: `Bearer ${editor_token}` })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.to.be.json;
                  res.body.should.have.property("articles");
              done();
            });
      });

      it('it should GET all the editors', (done) => {
        chai.request(app)
            .get("/getAllEditors")
            .set({ Authorization: `Bearer ${user_token}` })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.to.be.json;
                  res.body.should.have.property("editors");
              done();
            });
      });

});

// close connection once done, synchronize here before this statememt executes
// mongoose.connection.close();s