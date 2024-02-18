'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = ` 
<article class="country ${className}">
     <img class="country__img" src="${data.flag}" />
     <div class="country__data">
         <h3 class="country__name">${data.name}</h3>
         <h4 class="country__region">${data.region}</h4>
         <p class="country__row"><span>👫</span>${(
           +data.population / 1000000
         ).toFixed(2)} M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.map(
          lang => lang.name
        )}</p>
         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
     </div>
 </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*
const getCountryData = function (country) {
  // old school AJAX calls
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); // Async code - fetches data in background

  // once data fetched callback funuction called
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = ` 
   <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)} M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// These calls are async so whichever loads first it gets listened and callback function gets fired and it is displayed first in webpage
getCountryData('bharat');
getCountryData('portugal');
getCountryData('USA');
*/

///////////////////////////////////////

/*
const getCountryAndNeighbour = function (country) {
  // old school AJAX calls
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); // Async code - fetches data in background

  // once data fetched, callback funuction called
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    // Neighbour country
    const neighbour = data.borders?.slice(0);
    if (!neighbour) return;
    console.log(neighbour);

    // CALLBACK HELL
    neighbour.map(neigh => {
      console.log(neigh);
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${neigh}`);
      request2.send();
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};

getCountryAndNeighbour('bharat');
getCountryAndNeighbour('germany');
*/

///////////////////////////////////////
// CALLBACK HELL

/*
setTimeout(function () {
  console.log('1 second');
  setTimeout(function () {
    console.log('2 second');
    setTimeout(function () {
      console.log('3 second');
      setTimeout(function () {
        console.log('4 second');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

///////////////////////////////////////////////////
// PROMISES

/*
const request = fetch(`https://restcountries.com/v2/name/bharat`);
console.log(request);
// setTimeout(function () {
//   console.log(request);
// }, 5000);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data[0]);
      renderCountry(data[0]);
    });
};
getCountryData('bharat');

// simplifyig the fetch and promise

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('bharat');
*/

////////////////////////////////////////////////////////////
// Displaying neighbouring country : CHAINING PROMISES

// GETTING ONLY ONE NEIGHBOUR
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // ❌ DON"T DO THIS - CALLBACK HELL AGAIN - SO AVOID -FUNCTION WITHIN FUNCTION
      // fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
      //   .then(promise => promise.json())
      //   .then(data => renderCountry(data, 'neighbour'));

      // ✅FETCH neighbouring countries - AVOIDING CALLBACK HELL
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(promise => promise.json())
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('bharat');

// Displaying neighbouring countries

const getCountryAndNeighbour = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbours = data[0].borders;
      return neighbours;
    })
    .then(neigh => {
      for (let n of neigh) {
        fetch(`https://restcountries.com/v2/alpha/${n}`)
          .then(response => response.json())
          .then(data => renderCountry(data, 'neighbour'));
      }
    });
};
getCountryAndNeighbour('bharat');
*/

//////////////////////////////////////////////////////////
// HANDLING REJECTED PROMISES
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg}(${response.status})`);
    }
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders?.[0];
      // const neighbour = 'serfg';
      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`something went wrong❗${err.message} Try Again !`);
    })
    .finally(() => {
      return;
    }); //The callback to execute when the Promise is settled (fulfilled or rejected).;
};

btn.addEventListener('click', function () {
  getCountryData('bharat');
  // getCountryData('australia');
});
// getCountryData('dsf');

///////////////////////////////////////////////////////////
// EVENT LOOP IN PRACTICE

/*
console.log('test start');
// SetTimeout does not provide a guarentee that the code will run after specified sec
setTimeout(() => console.log('0 sec timer'), 0);
// Build a promise that is to immediately resolve/ success
Promise.resolve('Resolved promise 1').then(response => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(response);
});
console.log('test stop');
*/

/////////////////////////////////////
// BUILDING A SIMPLE PROMISE

/*
const lotteryPrice = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) resolve('You won 💵');
    else reject(new Error('You lost 👅'));
  }, 2000);
});

lotteryPrice.then(res => console.log(res)).catch(err => console.error(err));

// PROMISIFYING setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
};

wait(1)
  .then(() => {
    console.log('1 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds');
  });

setTimeout(function () {
  console.log('1 second');
  setTimeout(function () {
    console.log('2 second');
    setTimeout(function () {
      console.log('3 second');
      setTimeout(function () {
        console.log('4 second');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);


// Static method on promise constructor
Promise.resolve('success').then(res => console.log(res));
Promise.reject('fail').catch(err => console.error(err));
*/

/////////////////////////////////////////
// PROMISIFYING THE GEOLOCATION API

/*
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);
console.log('getting location');

// promisifying callback based api to promise based api

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
      return fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiamFtMDkzNDU2MzI0IiwiYSI6ImNsbWdpdWsxMjBiczAzbXFkYXFvNDcydnEifQ.yunlQm0Eqdyclst1k4FOcQ`
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding API ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`You live in ${data.features.slice(-1)[0].text}`);
      getCountryData(data.features.slice(-1)[0].text);
    })
    .catch(err => console.error(err.message));
};
whereAmI();
*/

/////////////////////////////////////////
// CONSUMING PROMISES WITH ASYNC/AWAIT
// Challenge 1 converted to saync and wait

/*
const curpos = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await curpos;
    const { latitude, longitude } = pos.coords;

    // Reverse Geolocation
    const resGeo = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiamFtMDkzNDU2MzI0IiwiYSI6ImNsbWdpdWsxMjBiczAzbXFkYXFvNDcydnEifQ.yunlQm0Eqdyclst1k4FOcQ`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    const country1 = dataGeo.features.slice(-1)[0].text;

    const res = await fetch(`https://restcountries.com/v2/name/${country1}`);
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    // RETURNING VALUES FROM ASYNC FUNCTION
    return `You are in ${country1}`;
  } catch (err) {
    console.error(`${err}💥`);

    // REJECT PROMISE RETURNED FROM ASYNC FUNCTION
    throw err;
  }
};
// whereAmI();
*/

////////////////////////////////////////////////////////////////////////
// RETURNING VALUES FROM ASYNC FUNCTION
// CATCHING REJECTED PROMISE RETURNED FROM ASYNC FUNCTION

/*
console.log(`1. Wait....Getting location`);
whereAmI()
  .then(msg => console.log(msg))
  .catch(err => console.error(err.message))
  .finally(() => console.log(`3. Finished getting location`));
// console.log(`3. Finished getting location`);
*/

// OR

/*
console.log(`1. Wait....Getting location`);
(async () => {
  try {
    const msg = await whereAmI();
    console.log(msg);
  } catch (err) {
    console.error(err.message);
  }
  console.log(`3. Finished getting location`);
})();
*/

///////////////////////////////////////////
// Try and Catch

/*
try {
  let y = 1;
  const x = 2;
  x = 3;
  // y = 3;
} catch (err) {
  console.error(err.message); 
}
*/

//////////////////////////////////////////////
// RUNNING PROMISES IN PARALLEL

/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err.message);
  }
};

get3Countries('portugal', 'japan', 'singapore');
*/

/////////////////////////////////////////////////
// OTHER PROMISE COMBINATORS

/*
// 1.Promise.race
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took tooo long'));
    }, 1000 * sec);
  });
};

// Whichever promise gets settled first that is taken
Promise.race([
  getJSON(`https://restcountries.com/v2/name/portugal`),
  // timeout(0.1),
  timeout(0.3),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 2.Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('Another Success'),
  Promise.reject('Error'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.resolve('Another Success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 3.Promise.any
Promise.any([
  Promise.resolve('Another Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

/////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////
// Coding Challenge #1//
///////////////////////

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 3: -33.933, 18.474

GOOD LUCK 😀
*/

/*
const whereAmI = function (longitude, latitude) {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiamFtMDkzNDU2MzI0IiwiYSI6ImNsbWdpdWsxMjBiczAzbXFkYXFvNDcydnEifQ.yunlQm0Eqdyclst1k4FOcQ`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding API ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`You live in ${data.features.slice(-1)[0].text}`);
      getCountryData(data.features.slice(-1)[0].text);
    })
    .catch(err => console.error(err.message));
};
// whereAmI(80.22283658182516, 12.970891498821771);
// whereAmI(90.5484740915847, 24.190599433494285);
whereAmI(13.381, 52.508); ////TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
whereAmI(18.474, -33.933); //TEST COORDINATES 3: -33.933, 18.474(Latitude, Longitude)
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////
// Coding Challenge #2//
///////////////////////

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) and
sets the .src attribute to the provided image path. When the image is done loading, 
append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
let imageClassEl = document.querySelector('.images');
let imgEl;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imageClassEl.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

createImg('img/img-1.jpg')
  .then(img => {
    imgEl = img;
    return wait(2);
  })
  .then(() => {
    console.log('after 2 sec', imgEl);
    imgEl.style.display = 'None';
    return createImg('img/img-2.jpg');
  })
  .then(img => {
    imgEl = img;
    return wait(2);
  })
  .then(() => console.log('after 2 sec', imgEl))
  .then(() => (imgEl.style.display = 'None'))
  .catch(err => console.error(err));
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////
// Coding Challenge #3//
///////////////////////
// TASK-1
/*
let imageClassEl = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imageClassEl.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
const loadAll = async function (imgPath) {
  try {
    const imgs = imgPath.map(img => createImg(img));
    // console.log(imgs);
    // const imgs = array of promises
    const data = await Promise.all(imgs);
    // console.log(data);
    data.map(d => {
      if (d.status !== 'rejected') d.classList.add('parallel');
    });
  } catch (err) {
    console.error(err.message);
  }
};

const imgPath = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
loadAll(imgPath);
*/

// TASK-2
/*
const loadNPause = async function () {
  try {
    let imgEl = await createImg('img/img-1.jpg');
    await wait(2);
    imgEl.style.display = 'None';
    imgEl = await createImg('img/img-2.jpg');
    await wait(2);
    imgEl.style.display = 'None';
  } catch (err) {
    console.log(err.message);
  }
};
// loadNPause();
*/

//////////////////////////////////////////////////
// SUMMARY
////////////////////////////////////////////////

// Asynchronous demonstration
// Cannot control the sequence of asynchronous operation

/*
const APISimulationTime = () => Math.random() * 10;
// console.log(APISimulationTime);
const time1 = function (msg) {
  setTimeout(() => {
    console.log(msg);
  }, APISimulationTime() * 2000);
};
const time2 = function (msg) {
  setTimeout(() => {
    console.log(msg);
  }, APISimulationTime() * 2000);
};
const time3 = function (msg) {
  setTimeout(() => {
    console.log(msg);
  }, APISimulationTime() * 2000);
};
time1(1);
time2(2);
time3(3);
*/

// To control the sequence of Asynchronous operation

// 1) CALLBACK HELL
// We make sure 1 always comes first then followed by 2 and 3

/*
const APISimulationTime = () => Math.random();
const time1 = function (msg, callback1) {
  setTimeout(() => {
    console.log(msg);
    callback1(); //will call time2(2)
  }, APISimulationTime() * 2000);
};
const time2 = function (msg, callback2) {
  setTimeout(() => {
    console.log(msg);
    callback2(); // will call time3(3)
  }, APISimulationTime() * 2000);
};
const time3 = function (msg) {
  setTimeout(() => {
    console.log(msg);
  }, APISimulationTime() * 2000);
};

time1(1, () => time2(2, () => time3(3)));
*/

// 2.PROMISES
/*
const APISimulationTime = () => Math.random();
const time1 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};

const time2 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};
const time3 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};

time1(1)
  .then(() => time2(2))
  .then(() => time3(3));
*/

// 3.AWAIT AND ASYNC
/*
const APISimulationTime = () => Math.random();
const time1 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};

const time2 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};
const time3 = function (msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, APISimulationTime() * 2000);
  });
};

const run = async () => {
  try {
    await time1(1);
    await time2(2);
    await time3(3);
  } catch (error) {
    console.error(error);
  }
};
run();
*/
