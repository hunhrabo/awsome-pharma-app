AwsomePharma test app

This application is built for test purposes.

Database:

- Relational databases in an Excel file with three different sheets (salespersons, orders, products)

Backend:

- Basic NodeJS-Express app to serve the database and the client. `xlsx-to-json-lc` is used to serve the data in `JSON`-format. Each dataset is reachable through their own API route.

Frontend:

- React frontend with hooks. `Axios` is used for communication with the backend. Data visualization is managed by using the `Apexcharts` library.

How to use the app:

1. Clone this repo to a folder on your computer.

2. Open your terminal/command line and navigate to the projects folder (`awsome-pharma-app`)

3. In the `awsome-pharma-app` folder run

### 'npm install'

to install all the dependencies

4. To run the app in development mode, type

### 'npm start'

or

### 'npm run watch'

5. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
