const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5f7848744f8ab40be53567de')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://serge:Pa8633004329@cluster0.s0kyp.mongodb.net/test?authSource=admin&replicaSet=atlas-k4r12x-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
.then(res => {
    app.listen(3000);
    console.log('Connected')
})
.catch(err => console.log(err));