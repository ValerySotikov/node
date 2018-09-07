
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function notifyCustomers() {
  try {
    const customer = await getCustomer(123);
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log('Top movies: ', movies);

      sendEmail(customer.email, movies);
    }
  } catch(err) {
    console.log(err.message);
  }
}

getCustomers();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting user...');
      resolve({ 
        id: id, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);
  });  
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Getting movies list...');
        resolve(['movie1', 'movie2']);
      }, 4000);
  });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Sending movies to emails...');
        resolve();
      }, 4000);
  });
}