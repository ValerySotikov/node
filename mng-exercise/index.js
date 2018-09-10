const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function updateCourse(id) {
    //  Approach: Query first
    //  findById()
    //  Modify its properties
    //  save()
    const course = await Course.findById(id);
    if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another author';
    course.set({
        isPublished: true,
        author: 'Another author'
    });

    const result = await course.save();
    console.log(result);

    //  Approach: Update first
    //  Update directly
    //  Optionally: get the updated document
}

updateCourse('5a68fde3f09ad7646ddec17e');






            


