 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');


Promise.resolve().then(function() {
    console.log('HERE')
    // 1) Find all movie docs
    return Movie.find({})
}).then(function(result) {
    console.log('1): ', result) 
    // 2) Find all performer docs
    return Performer.find({})
}).then(function(result) {
    console.log('2): ', result)
     // 3) Find all movies with an MPAA Rating of 'PG'
    return Movie.find({mpaaRating: 'PG'})
}).then(function(result) {
    console.log('3): ', result)
    // 4) Find all movies that are still showing
    return Movie.find({nowShowing: true})
}).then(function(result) {
    console.log('4): ', result)
    // 5) Find all movies with an MPAA Rating of 'PG' or 'PG-13'
    return Movie.find().or([
        {mpaaRating: 'PG'},
        {mpaaRating: 'PG-13'},
    ])
}).then(function(result) {
    console.log('5): ', result)
    // 6) Find the first movie found with a releaseYear of 2018
    return Movie.findOne({releaseYear: 2018})
}).then(function(result) {
    console.log('6): ', result)
    // 7) Find all movies released after 1980
    return Movie.find({releaseYear: {$gt: 1980} })
}).then(function(result) {
    console.log('7): ', result)
    // 8) Find all movies whose titles start with a 'C'
    return Movie.find(
        {title: {$regex: /^c/, $options: 'i'}
     })
}).then(function(result) {
    console.log('8): ', result)
    // 9) Find the performer named 'Rami Malek'
    return Performer.find({name: 'Rami Malek'})
}).then(function(result) {
    console.log('9): ', result)
    // 10) Find all performers born before 1980
    return Performer.find(
        {born: {$lt: 1980} })
}).then(function(result) {
    console.log('10): ',result)
    // 11) Find all performers whose name starts with a 'J'
    return Performer.find(
        {name: {$regex: /^j/, $options: 'i'}}
    )
}).then(function(result) {
    console.log('11): ', result)
    // 12) Add a reference to performer 'Bill Murray' to
    // the movie Caddyshack's cast property and save.
    // console.log the updated movie.
    return Promise.all([
        Performer.findOne({name: 'Bill Murray'}),
        Movie.findOne({title: 'Caddyshack'})
    ])
}).then(function(result) {
    const bill = result[0]
    const caddyShack = result[1]
    caddyShack.cast.push(bill)
    return caddyShack.save()
}).then(function(result) {
    console.log('12): ', result)
}).then(function() {
    process.exit()
})