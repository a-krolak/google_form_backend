let responses = [];
const userResponseSection = document.querySelector('#user-responses');
const transportationSelect = document.querySelector('#transportation');
const accommodationSelect = document.querySelector('#accommodation');
const seasonSelect = document.querySelector('#season');
const searchInput = document.querySelector('#search');

const fetchUserResponses = async () => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/e/2PACX-1vSGVUZAMA5794EmNofC7CbjJDSb2tZww7Zuf5gDq36bAr6LUsF1yQ90dieQy1UoyFQl7SJk8kosz1Ve/pub?output=csv'
  );
  const data = await response.text();
  const result = Papa.parse(data, { header: true });
  responses = result.data;
};

const renderUserResponse = userResponse => {
  const name = userResponse.Name;
  const age = userResponse.Age;
  const travelMethod = userResponse['What is your preferred method of travel?'];
  const accommodation =
    userResponse[
      'What accommodations do you prefer to stay in when you do travel?'
    ];
  const season = userResponse['In what season do you prefer to travel?'];
  const vacationType = userResponse['What type of vacations do you prefer?'];
  const favouriteDestination =
    userResponse['What is your favourite travel destination?'];
  const favouritePart =
    userResponse['What is your favourite part of travelling?'];
  const travellingPicture = userResponse[
    'Upload a photo of your favourite travel destination.'
  ].split('id=')[1];

  return `
	<div class="cards">
  <h2>${name}, ${age}</h2>
  <ul> 
  <li><em>My preferred travel method is...</em> <br/>
  ${travelMethod}</li> 
  <br/>
  <li><em>My preferred accomodation is...</em> <br/>
  ${accommodation}</li> 
  <br/>
  <li><em>My favourite season to travel is...</em> <br/> 
  ${season}</li> 
  <br/>
  <li><em>Best Vacation Type?</em> <br/>
  ${vacationType}</li> 
  <br/>
  <li><em>Favourite Destination:</em> 
  ${favouriteDestination}!</li> 
  </ul>
  
  <h3>"The best part of travelling is... 
  ${favouritePart}!"</h3> 
  <img src="https://drive.google.com/thumbnail?id=${travellingPicture}" alt="img-name" /> 
  </div>
  `;
};

const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponseSection.innerHTML = allUserResponsesHTML;
};

fetchAndShowResponses();

// Filters

const travelFilter = travel => {
  const selectedTransportation = transportationSelect.value;
  const selectedAccommodation = accommodationSelect.value;
  const selectedSeason = seasonSelect.value;
  const searchTerm = searchInput.value.toLowerCase();
  return (
    (selectedTransportation === 'all' ||
      travel.travelMethod === selectedTransportation) &&
    (selectedAccommodation === 'all' ||
      travel.accomodation === selectedAccommodation) &&
    (selectedSeason === 'all' || travel.season === selectedSeason) &&
    (travel.travelMethod.toLowerCase().includes(searchTerm) ||
      travel.accomodation.toLowerCase().includes(searchTerm) ||
      travel.season.toLowerCase().includes(searchTerm))
  );
};

const handleFilterInput = () => {
  const filteredTravels = travel.filter(travelFilter);
  main.innerHTML = filteredTravels.map(renderTravel).join('');
};

transportationSelect.addEventListener('input', handleFilterInput);
accommodationSelect.addEventListener('input', handleFilterInput);
seasonSelect.addEventListener('input', handleFilterInput);
searchInput.addEventListener('input', handleFilterInput);

// Charts

const typeOfVacations = 'What type of vacations do you prefer?';

const votes = {
  'Adventure / Exploration': 0,
  'Leisure / Relaxation': 0,
  'Cultural / Educational': 0,
};

const FetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponses.innerHTML = allUserResponsesHTML;
  responses.forEach(response => {
    votes[response[typeOfVacations]] += 1;
    console.log(votes);

    new Chart('doughnut', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: Object.values(votes),
            backgroundColor:[white, blue, grey, black,
          }],
        labels: Object.keys(votes),
      },
    });
  });
};
FetchAndShowResponses();
