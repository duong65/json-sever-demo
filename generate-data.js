var casual = require("casual");
const fs = require("fs");

// Generate random sentence
// You don't need function call operator here

// Define custom generator
casual.define("point", function () {
  return {
    x: Math.random(),
    y: Math.random(),
  };
});

// Generate random point
// And so on..

const randomCityList = (n) => {
  if (n <= 0) return [];

  const cityList = [];

  // loop and push city
  Array.from(new Array(n)).forEach(() => {
    const city = {
      id: casual.uuid,
      code: casual.state_abbr,
      name: casual.state,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    cityList.push(city);
  });

  return cityList;
};

const randomUserList = (cityList, numberOfUsers) => {
  if (numberOfUsers <= 0) return [];

  const userList = [];

  for (const city of cityList) {
    // loop and push user
    Array.from(new Array(numberOfUsers)).forEach(() => {
      const user = {
        id: casual.uuid,
        name: casual.name,
        gender: casual.random_element(["male", "female"]),
        age: casual.integer((from = 18), (to = 26)),
        salary: casual.integer((from = 800), (to = 8000)),
        description: casual.short_description,
        cityCode: city.code,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      userList.push(user);
    });
  }

  return userList;
};

// IFFE

(() => {
  // random data
  const cityList = randomCityList(6);
  const userList = randomUserList(cityList, 8);

  // prepare DB Object
  const db = {
    cities: cityList,
    users: userList,
    profile: {
      name: "Po",
    },
  };

  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate successfully");
  });
})();
