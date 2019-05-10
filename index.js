const express = require('express');
const { check, validationResult } = require('express-validator/check');
const app = express();

app.use(express.json());

const  courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"},
]

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with given id was not found");
    }else{
        res.send(course);
    }
});

app.post('/api/courses',[check('name').isLength({min:3})], (req,res)=>{
    //check(req.body.name).isLength({min:3});//using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        //return res.status(400).send(errors);
        //return console.log(errors);
      }
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required and should be at least 3 letters');
    //     return;
    // }

    const course = {
        id:courses.length+1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

// app.get('/api/posts/:year/:month', (req, res)=>{
//     res.send(req.params);
// })

app.get('/api/posts/:year/:month', (req, res)=>{
    res.send(req.query);
})

app.put('/api/courses/:id', [check('name').isLength({min:3})],(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with given id was not found");
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        //return res.status(400).send(errors);
        //return console.log(errors);
    }
    course.name = req.body.name;
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with given id was not found");
    }
    
    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    course.name = req.body.name;
    res.send(course);
    
});

const port = process.env.port || 3000;//manually set port number or 3000 by default
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});