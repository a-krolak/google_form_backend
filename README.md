# Google Form Backend

## Objectives

1. Create a form using Google Forms
2. Collect responses into a Google Sheet
3. Make the Sheet public and downloadable as a CSV
4. Build a webpage that fetches the CSV
5. Parse it with PapaParse js
6. Display information from the form responses in the website


### Using Google Forms to setup an API to populate the website.

[VIDEO to demo version of project](https://web.microsoftstream.com/video/b41ae592-a027-435e-944b-c37a1d0a4be2)

- Create a Google Form that can have some utility to it.
- Log in to your Google Drive. New > More > Google Form.
- Give it a title, description and populate the questions as you see fit. Customize the form appearance to your heart's content.
- It is recommended to not use grid based questions, they don’t play nice with the next steps of the project. Try to use all the other options for diversity in your responses.
- Send it out and have a few people answer the form.
- Take responses and generate a spreadsheet of that information, go to File > Publish to Web > Comma-Separated-values(.csv). Hold on to the URL provided.

### Building the Site

- In a new project make 3 files - `index.html`, `styles.css` and `data.js`.
- `index.html` - use ! Shorthand to create boilerplate HTML.
- In `data.js`, declare a variable called `responses` to be an empty array. Set it as a `let` since this will change when we get our data.
- Create an async function called `fetchUserResponses`. Have it fetch the url to your spreadsheet and save it to a scoped variable called `response`. 
- CORS - Cross Origin Resource Sharing. This is a security measure in place to prevent the sharing of data directly to another website without using a server as an intermediary.
- To bypass a CORS error we can use the cors-anywhere site. This is ok for a simple project like this but not recommended for real life projects! 
http://cors-anywhere.herokuapp.com/
- Copy the cors-anywhere url and prepend it before the url of your spreadsheet url in the fetch request and we should get the CORS error to go away and get a valid response (this step is documented on the cors-anywhere site).
- In order to format the csv data, `await data = response.text()`. This will give use some actual text to work with.
- https://www.papaparse.com/ documents a third-party library that parses CSVs. Using a CDN (content delivery network) we can download a library's functionality to the project using a `<script>` tag in our HTML.
- https://cdnjs.com/libraries/PapaParse should provide us with a url that we can use as the `src` attribute for our new `<script>` tag (there should 2 separate `<script>` tags now).
- To parse our data we could do: `const result = Papa.parse(data, {header: true})`. This syntax is a new addition to our JS which we have obrtained from importing the Papa parse library.
- Finally update `responses` variable to equal `results.data`
- For displaying your user responses, create a `<section>` element with an id of “user-responses” (we will build on this later).
- To access the unconventional key/value pairs in our new objects, we can utilize bracket notation. Because our keys are strings with spaces, the dot notation will not work. It will look something like this `userResponse[“What is your favorite RBI food?”]`. Remember it needs to match exactly as it appears in your objects! These can be set and saved to their own variables to make them slightly easier to work with.
- Now with the ability to access our data, display all of the responses in your HTML.
- In order to get the uploaded images to appear in your html, you need to find the id component of the url to create a new url to display a thumbnail of it. https://dev.to/imamcu07/embed-or-display-image-to-html-page-from-google-drive-3ign.
- The `.split` string method can separate a string into an array of strings based on what you specific in the argument passed to it. i.e.
`“This is a string”.split(“a”)`. Using this method, we can obtain a the ids of the saved images and save it to a variable. Using the ids we can create a new url in our code similar to `https://drive.google.com/thumbnail?id=${googlePhotoId}`
- Have fun with the styling and structure of your site! 
- Be thoughtful of the data you want to work and questions to ask, choose to do something meaningful, we will be working with this data in the coming week!
- To submit, create a new GitHub repository, set the project to your GitHub pages and post the link to the site as an issue to this repo.
