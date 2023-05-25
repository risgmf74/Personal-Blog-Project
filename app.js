const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

const homeStartingContent = 'Integer eu euismod urna. Nullam consequat, enim faucibus commodo suscipit, lorem lectus euismod velit, in luctus lorem nibh lobortis augue. Sed varius rhoncus felis at fringilla. Sed malesuada in enim sed tincidunt. Proin vel eros malesuada, facilisis nulla at, blandit ligula. Suspendisse vitae elit pulvinar.';
const aboutStartingContent = 'Usce vitae neque ut est semper fringilla. Cras ac justo sed elit vestibulum rutrum. Nunc efficitur aliquet porta. Pellentesque id eros vitae purus pretium luctus non sed nibh. Integer luctus maximus velit, elementum consectetur quam tincidunt vitae. Nullam lobortis nisl ex, feugiat viverra mi feugiat et.';
const contactStartingContent = 'Maecenas eros elit, ornare et consectetur eget, molestie sit amet risus. Nulla lorem arcu, posuere ut leo in, semper pellentesque risus. Nulla facilisi. Sed at dignissim risus. Fusce ornare enim at porta pretium. Duis eget diam eu nisi dignissim finibus. Cras pharetra justo ipsum, sit amet congue enim tincidunt ut.';

const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        homeContent: homeStartingContent,
        posts: posts
    });
});

app.get('/about', (req, res) => {
    res.render('about', {aboutContent: aboutStartingContent});
});

app.get('/contact', (req, res) => {
    res.render('contact', {contactContent: contactStartingContent});
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);
        if(storedTitle === requestedTitle) {
            res.render('post', {
                title : post.title,
                content: post.content
            });
        } 
    })
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});