/**
 * Default API_URL of Indra would be production URL.
 * If the user has set the environment variable - REACT_APP_API_URL -
 * then that value will be set a the API_URL.
 * One of the ways to set REACT_APP_API_URL is by running the frontend using
 * the below command -
 *        REACT_APP_API_URL=http://127.0.0.1:8000/ npm start
 * (Make sure the backend is running at http://127.0.0.1:8000/)
 *
 *
 * Note: All environment variables in create-react-app setup needs to have
 * the prefix REACT_APP_
 * For more infromation - https://create-react-app.dev/docs/adding-custom-environment-variables/
 */
 let API_URL = 'https://indraabm.herokuapp.com/';
 let PROPS_URL = API_URL + 'models/props/';
 let MENU_URL = API_URL + 'models/menu/';
 let RUN_URL = API_URL + 'models/run/';
 
 if (process.env.REACT_APP_API_URL) {
   API_URL = process.env.REACT_APP_API_URL;
   PROPS_URL = process.env.REACT_APP_API_URL + 'models/props/';
 }
 
 const config = { API_URL, PROPS_URL, MENU_URL, RUN_URL };
 
 export default config;
