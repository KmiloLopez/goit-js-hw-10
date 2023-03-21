

//lo intente mandar aca pero me sale error.












export let countryTittle
export function fetchCountries(countryFetched) {
    /* const countryName = countryFetched.name
      const countryFlag = countryFetched.flags */
    console.log('lo que encontramos con el nombre fue:', countryFetched);
    console.log('cantidad de elementos encontrados:', countryFetched.length);
    if (countryFetched.length === 1) {
      let foundCountries = countryFetched;
      console.log('ccfoundCountries contiene:', foundCountries[0].name.common);
      const countryTittle = `<p><img class ="flag-image" src="${foundCountries[0].flags.png}" alt="${foundCountries[0].flags.alt}"width="20"/><h2>${foundCountries[0].name.common}</h2></p>`;
      countryList.innerHTML = countryTittle;
    
      const keyLanguage = Object.values(foundCountries[0].languages);
      ////quiero sacar el key de este objeto
      console.log('los values dentro de keyLanguage', keyLanguage);
      console.log(`aca la posicion numbero 1${keyLanguage[0]}, siguente `);
      const lenguaS = keyLanguage.join(', ');
      console.log(lenguaS);
      const countryDetails = `<p><b>Capital: </b>${foundCountries[0].capital}</p><p><b>Population: </b>${foundCountries[0].population}</p><p><b>Languages: </b>${lenguaS}</p>`;
      
      countryInfo.innerHTML = countryDetails;
      
    } else {
      let foundCountries = countryFetched
        .map(countryt => {
          return `<li>
          <p><img class ="flag-image" src="${countryt.flags.png}" alt="${countryt.flags.alt}" width="20"/> ${countryt.name.common}</p>
          
        
        </li>`;
        })
        .join('');
      /* console.log('foundCountries contiene:', foundCountries); */
      countryList.innerHTML = foundCountries;
  
   
    }
  }