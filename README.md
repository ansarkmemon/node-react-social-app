# node-react-social-app

You will need docker installed on your machine to make this app up and running.


## Steps to view the app locally
- Start a `mysql` db container by running this command in your terminal - `docker run -p 3307:3306 --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7`

- Enter the repository folder, then type the command - `docker-compose up` in the terminal. This will build mysql container and start the container with the DB initialized.
- Then enter `/server` and run `npm i` to install node dependencies. Once this is done, type `npm run dev`. Your server will now start up and listen on the port `3001`.

- Enter `/client` folder and run `yarn` to install dependencies. Then start the app with command `yarn start`


