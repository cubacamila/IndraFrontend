let API_URL = 'https://indraabm.herokuapp.com/';
let PROPS_URL = API_URL + 'models/props/'
let MENU_URL = API_URL + 'models/menu/'

if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
  PROPS_URL = process.env.REACT_APP_API_URL + 'models/props/';
}

const config = { API_URL, PROPS_URL, MENU_URL };

export default config;