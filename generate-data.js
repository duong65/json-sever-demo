var casual = require('casual');
const fs = require('fs');

// Generate random sentence
// You don't need function call operator here

// Define custom generator
casual.define('point', function() {
	return {
		x: Math.random(),
		y: Math.random()
	};
});


// Generate random point
// And so on..

const randomCityList = (n) => {

    if ( n <= 0 ) return [];

    const cityList = [];

    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const city = {
            id: casual.state_abbr,
            name: casual.state,
        }

        cityList.push(city);
    })

    return cityList;
}

const randomStudentList = (cityList, numberOfStudents) => {

    if ( numberOfStudents <= 0 ) return [];

    const studentList = [];

    for (const city of cityList) {
        // loop and push student
        Array.from(new Array(numberOfStudents)).forEach(() => {
            const student = {
                id: casual.uuid,
                name: casual.name,
                gender: casual.random_element(['male', 'female']),
                age: casual.integer(from = 18, to = 26),
                mark: Math.round(casual.double(from = 1, to = 10) * 100) / 100,
                description: casual.short_description,
                cityCode: city.code,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            studentList.push(student);
        })
    }

    return studentList;
}

// IFFE

(() => {
    // random data
    // const cityList = randomCityList(4);
    const cityList = [
        {
          "code": "TX",
          "name": "Texas"
        },
        {
          "code": "KY",
          "name": "Kentucky"
        },
        {
          "code": "AL",
          "name": "Alabama"
        },
        {
          "code": "NJ",
          "name": "New Jersey"
        }
      ]
    const studentList = randomStudentList(cityList,5);

    // prepare DB Object
    const db = {
        cities: cityList,
        students: studentList,
        profile: {
            name: "Po",
        },
    };

    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Generate successfully");
    });
})()