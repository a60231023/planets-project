const parser = require('csv-parse'); 
const fs = require('fs');

const results = [];
function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
}
fs.createReadStream('./kepler-data.csv')
    .pipe(parser({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data))
            results.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    });
