# Wevents
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) - https://opensource.org/licenses/MIT

## Table of Contents
[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Tests](#tests)

[License](#license)

[Contributors](#contributors)

[Questions](#questions)

[Demonstration](#demonstration)

[Render Deployed Version](#render-deployed-version)

## Description
Wevents is an application that leverages the Ticketmaster Discovery API and the OpenWeatherMap API to show you the events in a specified area, as well as the weather forecast for the time of each event.

There is a login feature. In the future we hope to implement account creation so users can save events that look interesting to them.

## Installation
**Note: The app does not need to be installed unless you wish to run the app locally on your machine. To just use the app go to https://wevents.onrender.com**

To install the project, follow these steps:

1. Clone the [repository](https://github.com/Lauren245/Wevents)

2. visit the [Ticketmaster Discovery API Page](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) to create an account and request an API key.

3. visit the [OpenWeather sign up page](https://home.openweathermap.org/users/sign_up) to create an account and request an API key.

4. Navigate to the root level of the project directory

5. Once at the root level, make a copy of the .env.EXAMPLE file and rename it to ```env```
  - *Note that JWT_SECRET_KEY is a random string.*

6. Open a new terminal window at the root level and install the dependencies for both the client and server using ```npm install```

7. open another terminal window at the root level and start PostgreSQL by typing ```psql -U postgres```. Then follow the sign in prompts to sign in 
  - once signed in., run the command ```\i server/db/schema.sql```.
  - Once finished, type ```\q``` to quit.

8. On any terminal at the root level of the project, run the following commands:
    - ```npm run build``` to build the project
    - ```npm run seed``` to seed the database
    - ```npm run start:dev``` to start the application


## Usage
1. **Access the Application**:
   - Open your web browser and navigate to the (deployed version of the Wevents application)[https://wevents.onrender.com]. If running locally, navigate to `http://localhost:3000`.

2. **Search for Events**:
   - On the homepage, you will see a search form.
   - Enter the name of the city in the "Enter city" input field.
   - Select the state from the dropdown menu.
   - Click the "Search" button to fetch events and weather data for the specified location.

3. **View Event Details**:
   - After performing a search, a list of events will be displayed with information such as the event title, image, date, and time along with the weather forecast for each event.
   - Click on an event's image or its view details button to see more information about the event and purchase tickets.

4. **Login**:
   - Click on the "Login" link in the navigation bar to access the login page.
   - Enter your username and password, then click the "Login" button to log in to your account.

5. **Contact Us**:
   - If you have any questions or need assistance, navigate to the "Contact" page.
   - You will find contact information for the team members, including their GitHub profiles.

## Tests
Currently, there are no unit tests. The application must be tested manually.

## License
Copyright 2025 Lauren Moore, Christian Walters, Elhadj Bah, Dillon Duran

This software uses an [MIT license](https://opensource.org/license/MIT).

## Contributors
  **Lauren Moore** ([GitHub](https://github.com/Lauren245)): Third-party API calls and client-side event propogation.

 **Christian Walters** ([GitHub](https://github.com/EnderJunk)): Frontend and Database structure

 **Elhadj Bah** ([GitHub](https://github.com/Elhadj-Bah)): Backend and API structure


 **Dillon Duran** ([GitHub](https://github.com/Dillonduran)): Frontend and Database structure

## Questions
If you have additional questions, you can contact us at: 

GitHub: [Lauren245](https://github.com/Lauren245), [Christian Walters](https://github.com/EnderJunk), [Elhadj Bah](https://github.com/Elhadj-Bah),
[Dillon Duran](https://github.com/Dillonduran)


## Demonstration

![GIF showing a user typing "Portland" into a search bar and selecting "OR" from a dropdown menu that says "Search State". This takes the user to a page with a list of events. The first event in the list is Cowboy Karaoke. It includes the event date and time, and a weather forecast with a sun icon.](./Wevents%20Assets/WeventsExample.gif)

## Render Deployed Version
[Click here](https://wevents.onrender.com) to view the app as deployed on Render.

*Note: since the application is being hosted on a free tier, it will take a while for the app to load when opening it for the first time.*

--- 
**[Back to Top](#wevents)**