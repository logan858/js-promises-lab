 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');


// Movie.deleteMany({})
// .then(function(results) {
//     console.log("deleted movies:", results)
//     return Performer.deleteMany({})
// })
// .then(function(results) {
//     console.log('delete performers:', results)
// })
// .then(function() {
//     process.exit()
// })

const p1 = Movie.deleteMany({})
const p2 = Performer.deleteMany({})
Promise.all([p1, p2])
.then(function(results) {
    console.log(results)
    return Movie.create(data.movies)
})
.then(function(results) {
    console.log(results)
    return Performer.create(data.performers)
})
.then(function(movies) {
    return Promise.all([
        Performer.findOne({name: 'Mark Hamill'}),
        Movie.findOne({title: 'Star Wars - A New Hope'})
    ]);
})
.then(function(results) {
    const mark = results[0]
    const starWars = results[1]
    starWars.cast.push(mark)
    return starWars.save()
})
.then(function() {
    process.exit()
})






// const p = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         reject('Something went wrong!');
//     }, 2000)
// });

// p.then(function(result) {
//     console.log(result);
//     return 42 
// })
// .then(function(result) {
//     console.log(result);
//     return 'Done!'
// })
// .then(function(result) {
//     console.log(result)
// })
// console.log(p)


// function asyncAdd(a, b, delay) {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve(a + b);
//         }, delay);
//     })
// }

// asyncAdd(10, 5, 2000)
// .then(function(sum) {
//     console.log(sum)
//     return asyncAdd(sum, 100, 1000)
// })
// .then(function(sum) {
//     console.log(sum)
//     return asyncAdd(sum, 1000, 2000)
// })
// .then(function() {
//     console.log(sum)
// })