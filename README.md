# Bookmark Management System

A simple, self-hosted web application for managing bookmarks. This tool allows you to upload bookmarks from multiple browsers, check if they are live, detect duplicates, and organize them into folders. Perfect for hosting on a Synology NAS or any other server.

Features

	•	Upload bookmarks from different browsers.
	•	Organize bookmarks by folders.
	•	Search bookmarks by title.
	•	Check if bookmarks are live and display their status (e.g., Live, Broken).
	•	Detect and display duplicate bookmarks.

Tech Stack

	•	Frontend: React
	•	Backend: Express.js
	•	Database: SQLite
	•	Deployment: Docker, Docker Compose

Installation

Prerequisites

	•	Node.js (LTS version recommended)
	•	Docker and Docker Compose
	•	A server or NAS (e.g., Synology) for hosting

Clone the Repository

git clone https://github.com/your-username/bookmark-manager.git
cd bookmark-manager

Backend Setup

	1.	Navigate to the backend folder:

cd backend


	2.	Install dependencies:

npm install


	3.	Run the backend locally:

node app.js

The backend should now be running at http://localhost:3000.

Frontend Setup

	1.	Navigate to the frontend folder:

cd frontend


	2.	Install dependencies:

npm install


	3.	Run the frontend locally:

npm start

The frontend should now be running at http://localhost:3000.

Docker Setup

	1.	Ensure Docker is installed on your system.
	2.	Go to the root of the project directory and start the app using Docker Compose:

docker-compose up --build


	3.	Access the app in your browser:
	•	Frontend: http://<your-server-ip>:8080
	•	Backend: http://<your-server-ip>:3000

Project Structure

bookmark-manager/
├── backend/
│   ├── app.js            # Main backend server
│   ├── db.sqlite         # SQLite database file
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main React app
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
├── docker-compose.yml    # Docker Compose configuration
├── README.md             # Project documentation

Features in Detail

1. Upload Bookmarks

Upload bookmarks manually using the Add Bookmark form. Provide the title, URL, and an optional folder name.

2. Live Status Check

Click the Check Live Status button to validate all bookmarks. Dead links are marked as “Broken.”

3. Duplicate Detection

View duplicate bookmarks under the Duplicate Viewer section. Duplicates are identified by matching URLs.

4. Search Bookmarks

Use the search bar to filter bookmarks by title in real-time.

Deployment on Synology NAS

	1.	Enable Docker in Synology DSM.
	2.	Upload the project to your NAS.
	3.	SSH into your NAS and navigate to the project folder:

cd /path/to/bookmark-manager


	4.	Start the containers using Docker Compose:

docker-compose up -d


	5.	Access the app at http://<your-nas-ip>:8080.

Future Improvements

	•	Support for importing/exporting bookmarks in JSON/HTML format.
	•	User authentication for multi-user access.
	•	Bookmark tagging for better organization.

Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with your improvements.

License

This project is licensed under the MIT License. See the LICENSE file for details.
