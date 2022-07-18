const fs = require("fs");
const inquirer = require("inquirer");

// Global variables.
let template = ``;

// Prompt the user
inquirer
	.prompt([
		{
			type: "input",
			message: "Who are you?",
			name: "userName"
		},
		{
			type: "input",
			message: "Where are you?",
			name: "userLocation"
		},
		{
			type: "input",
			message: "What are you?",
			name: "userBio"
		},
		{
			type: "input",
			message: "What is your GitHub username?",
			name: "gitHubUsername"
		},
		{
			type: "input",
			message: "What is your LinkedIn username?",
			name: "linkedInUsername"
		}
	])
	.then((answers) => {
		generateFile(answers);
	});

function generateFile(input) {
	fs.readFile("template.html", (err, data) => {
		template = `${data}`;

		// This is stupid but it DOES replaces the variables...
		template = template.replace("${input.userName}", input.userName);
		template = template.replace("${input.userLocation}", input.userLocation);
		template = template.replace("${input.userBio}", input.userBio);
		template = template.replace("${input.gitHubUsername}", "https://www.github.com/" + input.gitHubUsername);
		template = template.replace("${input.linkedInUsername}", "https://www.linkedin.com/in/" + input.linkedInUsername);

		fs.writeFile("index.html", template, (err) => {
			if (err)
				console.error("Aaaahhhhhh");
			console.log("Saved!");
		})
	});
}