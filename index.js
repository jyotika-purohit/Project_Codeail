const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const ejsLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocalAuthStrategy=require('./config/passport-local-auth');
const mongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(ejsLayouts);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name:'Projext_Codeail',
    secret:'blahsomething',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000 * 60 * 100 
    },
    store: new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            if(err){
                console.log("Error",err);
                return;
            }

            console.log("Connected to :: MongoStore");
        }
    )
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log("Error occurred while running the server",err);
        return;
    }

    console.log("Server is running on :: port ",port);
    return;
})