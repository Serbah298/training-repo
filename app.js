const express = require('express');  // express is a function which upon calling will add a bunch of methods
const fs = require('fs');

const app = express() // app now contains express methods, it is the Express application instance

// middleware is a function that can modify the incoming request data, it stands in the middle between the request 
// and the response, it is just a step that the request go through while being processed
app.use(express.json()) 

// respond to http get request of a certain route which is url
/*
app.get('/', (req, res) => {
    res
    .status(200) // specify the status code before send the response
    //.send('hello from the server side');  
    .json({message: 'hello from the server', app: 'Natours'}) /
}) 

app.post('/', (req, res) => {
    res.send("you can post to this endpoint");
});
*/
const a = 5
const b = 10
const z = a - b
const port = 3000
// start up a server
app.listen(port, ()=> {
    console.log(`server listening at port ${port}...`);
}) 


// it is a good practise to add api version specification to the url to, so that in case of doing 
// changes to the api without breaking anyone who is still using the previous version of api

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    //console.log(req.params);
    const id = req.params.id * 1; // convert it from string to a numv=ber
    const tour = tours.find(el => el.id === id);
    if (!tour) return res.status(404).json({
        status: "failure",
        message: "invalid id"
    })

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        if (err) {
            res.status(500).send("Tour cannot be added");
            return console.error("Tour cannot be added!");
        }

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    });
});

app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) return res.status(404).json({
        status: "failure",
        message: "invalid id"
    })
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here ...>'
        }
    });
});

app.delete('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) return res.status(404).json({
        status: "failure",
        message: "invalid id"
    })
    res.status(204).json({
        status: 'success',
        data: {
            tour: null // to ensure that this resource has successfully deleted
        }
    });
});

// we need to define a route that accept variables in order to have the possibility to get any particular tour
// req.params is where all url variables are stored, params is an object that assign user's values to the url's variables
// :variable must be written :variable? is an optional variable
// find will loop through the array and will have access to the element for each iteration, and append the elemnt to the new array
// only if the function returns true for that particular element
