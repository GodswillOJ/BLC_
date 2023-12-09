const express = require('express');
require('./public/js/emailService');
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


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
