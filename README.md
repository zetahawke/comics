Prerequisites:

	- git
	- node.js
		- ionic
		- cordova
		- express
		- bower
			- angular-md5

Instalation
	
	- run: git clone https://github.com/zetahawke/comics
	- once inside the project folder
		- run: npm install
		- run: bower install

	that should install all the dependencies.

Run
	You are free to choose from where to run the project:
		- Ionic run: ionic serve
		- Express run: npm start

Notes:
	inside of static.js (alocated in: www/js/config) there are some variables that you can modify for use data from your own marvel's developer account like:
		- API_PUBLIC_KEY
		- API_PRIVATE_KEY

	there are also some files within the project that are specify for heroku's deployment (server.js and app.json).
