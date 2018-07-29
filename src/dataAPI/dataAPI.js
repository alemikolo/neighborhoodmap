// const headers = {
//   'Accept': 'application/json',
//   'Authorization': token
// }
const api = {
  foursquare: {
    clientId: 'LMHT2TASHWL5RRAUWHBTIOMB2NE51NNQARPY2VLZ2B1L54HD',
    clientSecret: 'VAXTZNJ2MPKISFQZVLLRB0TUZPV21BS0LHXIGJT2SUARPLZC',
    v: '20180323',
    link: 'https://api.foursquare.com/v2/venues',
    auth: '&client_id=LMHT2TASHWL5RRAUWHBTIOMB2NE51NNQARPY2VLZ2B1L54HD&client_secret=VAXTZNJ2MPKISFQZVLLRB0TUZPV21BS0LHXIGJT2SUARPLZC&v=20180323',
  }
}

export const getParkData = (park) => {
  let allData = {};
  return getPark(park)
    .then((result) => {
      allData = {...result};
      return Promise.all([
        //getParkDetails(result.id),
        //getParkHours(result.id),
        //getParkPhotos(result.id)
      ])
    })
    .then((results) => {
      results.forEach((result) => {
        allData = {...allData, ...result};
      });
      return allData;
    })
}

const getPark = (park) => {
  return fetch(`${api.foursquare.link}/search?ll=${park.position.lat},${park.position.lng}&query=${park.title}${api.foursquare.auth}&limit=1`)
    .then((response) => {
      if (response.status === 200 ) {
        return response.json();
      }
    })
    .then(data => data.response.venues[0]);
}

const getParkDetails = (id) => {
  return fetch(`${api.foursquare.link}/${id}?${api.foursquare.auth}`)
    .then((response) => {
      if (response.status === 200 ) {
        return response.json();
      }
    })
    .then((data) => {
      return data.response;
    });
}

const getParkHours = (id) => {
  return fetch(`${api.foursquare.link}/${id}/hours?${api.foursquare.auth}`)
    .then((response) => {
      if (response.status === 200 ) {
        return response.json();
      }
    })
    .then((data) => {
      return data.response.hours;
    });
}

const getParkPhotos = (id) => {
  return fetch(`${api.foursquare.link}/${id}/photos?${api.foursquare.auth}`)
    .then((response) => {
      if (response.status === 200 ) {
        return response.json();
      }
    })
    .then((data) => {
      return data.response;
    });
}

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)