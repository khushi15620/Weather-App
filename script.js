const userLocation = localStorage.getItem('userLocation') || 'London';
console.log("User location:", userLocation);

fetch(`https://api.weatherapi.com/v1/current.json?key=c2c5e3bc596049a0b5c154259250505&q=${userLocation}&aqi=yes`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("API response:", data);

    const weatherDiv = document.getElementById('weatherResult');
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;

    weatherDiv.innerHTML = `
      <h2>${userLocation}</h2>
      <p><strong>Temperature:</strong> ${tempC}°C</p>
      <p><strong>Condition:</strong> ${condition}</p>
    `;
  })
  .catch(error => {
    const weatherDiv = document.getElementById('weatherResult');
    weatherDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    console.error('Fetch error:', error);
  });
