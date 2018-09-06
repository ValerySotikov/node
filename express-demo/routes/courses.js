const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: 'course_1' },
    { id: 2, name: 'course_2' },
    { id: 3, name: 'course_3' },
    { id: 4, name: 'course_4' },
    { id: 5, name: 'course_5' }
];

const ERR_404_MSG = 'The course with the given ID was not found';


router.get('/', (req, res) => {
    res.send(courses);
});


router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    //  Lookup the course
    //  If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(ERR_404_MSG);

    //  Validate
    //  If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body); //  result.error

    if (error) return res.status(400).send(error.details[0].message);

    //  Update course
    course.name = req.body.name;
    res.send(course);
    //  Return updated course to the client
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(ERR_404_MSG);
    res.send(course);
});

router.delete('/:id', (req, res) => {
    //  Lookup the course
    //  Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(ERR_404_MSG);

    //  Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;