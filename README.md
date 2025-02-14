# Storied: e-reader SPA

## Overview

Storied is a single-page web application built with React that allows users to read short stories, make notes, and save their thoughts on specific passages. The application supports a dark/light theme toggle, note-taking functionality, and a collapsible navigation menu for better accessibility.

## Features

**Story Display:** Users can read short stories stored in a local JSON server.

**Pagination:** Text is broken into pages, allowing smooth navigation through stories.

**Notes System:** Users can highlight passages, add comments, edit, and delete notes.

**Theme Toggle:** Light and dark mode support with persistent theme storage.

**Collapsible Navigation:** The NavBar can be collapsed to improve reading focus.

*Custom Uploads: Users can upload their own text files to read within the app.*

## Technologies Used

**React** (State management, component structure)

**Material UI** (UI components for better user experience)

**JSON Server** (For storing book data and notes)



## Where to Use

Clone the repository:
```
git clone https://github.com/yourusername/ereader-spa.git
cd ereader-spa
```
Install dependencies:
```
npm install
```
Start the JSON Server:
```
json-server --watch db.json --port 3001
```
Start the React application:
```
npm run dev
```

## How to Use

Click on a story to open it in reader mode.

Navigate between pages with either the L/R arrow keys, or using the page navigation controls.

Highlight text and add comments using the note-taking feature.

Use the NavBar toggle to switch themes or collapse the menu.

*Upload your own .txt or .html files to read custom stories.*



## Future Enhancements

Incoming update to fix pagination bugs,

Implement user authentication to allow interpersonal commenting.

Genres and Filter function to browse stories and notes efficiently.

Introduce cloud storage for saving user notes persistently.


## Contributing

If you'd like to contribute, please fork the repository and submit a pull request with your changes.


##Contact

This project was made by [Liam Brophy](https://github.com/liam-brophy) For questions or feature requests, please reach out via GitHub Issues or email [liambrophy.design@gmail.com].

