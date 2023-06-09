console.log('Connectado');
import Notiflix from 'notiflix';
import './css/styles.css';
const imputText = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
let textafterDebounce="a"
const updateDebounceText = debounce(text=>{
  textafterDebounce= text.trim()
  
  if (textafterDebounce.length === 0){
    //limpiamos pantalla
    countryList.innerHTML = null;
    countryInfo.innerHTML = null;
  
  }
  else {
  countrySearch(textafterDebounce)
    .then(countryFetched => {
      //se manda en la posicion cero ya que aca es donde esta la informacion
      fetchCountries(countryFetched);
    })
    .catch(error => console.log(error));
  }
}, DEBOUNCE_DELAY)

function debounce(callBack, DEBOUNCE_DELAY){
  let timeout
  return (...args)=>{
    clearTimeout(timeout)
    timeout= setTimeout(()=>{
      callBack(...args)
    }, DEBOUNCE_DELAY)
  }
}
imputText.addEventListener('input', e => {
  updateDebounceText(e.target.value)//lo que ingresa lo manda a la constante
  const imputt = e.target;
  /* console.log("imputt.value: ",imputt.value);
  console.log("imputt: ",imputt); */
  
});

function countrySearch(imputt) {
  let dinamicParameter = imputt;

    
  return fetch(`https://restcountries.com/v3.1/name/${dinamicParameter}`)
  .then(
    response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);  
           
      }
      return response.json();
    }
  );

  
  
  
}

function fetchCountries(countryFetched) {
//recibimos el retorno de el fetch en json
  if (countryFetched.length === 1) {//card markup???
    /* Notiflix.Notify.success('Sol lucet omnibus'); */
    let foundCountries = countryFetched;
    
    const countryTittle = `<p><img class ="flag-image" src="${foundCountries[0].flags.png}" alt="${foundCountries[0].flags.alt}"width="20"/><h2>${foundCountries[0].name.common}</h2></p>`;
    countryList.innerHTML = countryTittle;
  
    const keyLanguage = Object.values(foundCountries[0].languages);
   
    const lenguaS = keyLanguage.join(', ');
   
    const countryDetails = `<p><b>Capital: </b>${foundCountries[0].capital}</p><p><b>Population: </b>${foundCountries[0].population}</p><p><b>Languages: </b>${lenguaS}</p>`;
    
    countryInfo.innerHTML = countryDetails;
    
  } if (countryFetched.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  
  if (countryFetched.length<10&&countryFetched.length>2){
    countryInfo.innerHTML = null;
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
