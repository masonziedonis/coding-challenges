/*!
    * Author: Mason Ziedonis
    * URL: www.masonziedonis.com
    * Program Name: Clover Technical Challenge
    * Date Started: Feb. 10, 2017
    * Date Last Updated: Feb. 10, 2017
    * Amount of time spent coding: 2 hours
    * Github: https://github.com/masonziedonis/coding-challenges/tree/clover
    *
    * Description: This is my file for the initial coding challenge portion of Clover's intership interview process. I had two hours to complete the challenge.
    *
    * Copyright (C) 2017 Mason Ziedonis 
*/

// Generates a circle of random size, position, and color and then adds it to the screen
function generateCircle() {
    document.getElementById("generateCircle").onclick = function () {
        let circleContainer = document.getElementById("circleContainer"); // Gets the circle container element
        let circle = document.createElement("div"); // Creates a <div> element for a circle
        
        circle.className += "circle"; // Adds the circle css class to the circle element
        
        let red = Math.floor(Math.random() * 255); // Generates random number from 0 to 255
        let green = Math.floor(Math.random() * 255); // Generates random number from 0 to 255
        let blue = Math.floor(Math.random() * 255); // Generates random number from 0 to 255
        let newColor = "rgb(" + red + "," + green + "," + blue + ")"; // Creates string for css color representation
        circle.style.background = newColor; // Assigns the circle to be the new color
        
        let circleWidth = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
        circle.style.width = circleWidth // Assigns the circle's width to be a random number between 500px and 10px
        let circleHeight = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
        circle.style.height = circleHeight; // Assigns the circle's height to be a random number between 500px and 10px
        circle.style.lineHeight = circleHeight + "px"; // Assign's the circle's line height to the height value so the text is centered vertically
        
        circle.style.left = (Math.random() * (circleContainer.offsetWidth - circleWidth)); // Puts the circle in a random X-coordinate position on the screen
        circle.style.top = (Math.random() * (circleContainer.offsetHeight - circleHeight)); // Puts the circle in a random Y-coordinate position on the screen
        
        circle.innerHTML += document.getElementById("circleText").value; // Assigns the the circle's text to be the value in the text box on the screen

        circleContainer.appendChild(circle); // Appends generated circle to the circle container
        alertColorAndText(); // Updates the list of circles to be listening to
        moveCircles();
    }
}

// Removes all of the shapes on the screen
function clearAll() {
    document.getElementById("clearAllCircles").onclick = function () {
        let circleContainer = document.getElementById("circleContainer"); // Gets the circle container element
        circleContainer.innerHTML = ""; // Clears all the circles from the screen
        moveCircles();
    }
    alertColorAndText(); // Updates the list of circles to be listening to
}

// Clicking a shape alerts the user of the shape's color and text.
function alertColorAndText() {
    let circles = document.getElementsByClassName("circle"); // Gets the list of circles
    Array.from(circles).forEach(function(circle) {
        circle.addEventListener('click',function() {
            let color = this.style.backgroundColor; // Retrieves the color of the circle
            let text = this.textContent; // Retrieves the text of the circle
            let textMessage = "";
            if (text) {
                textMessage = " and has a text value of '" + text + "'.";
            } else {
                textMessage = " and does not have any text."
            } // Changes the message to display for text depending on if there is any text or not
            let colorMessage = "The shape you clicked on has a RGB color value of " + color;
            alert(colorMessage + textMessage); // Alerts the user the circle's color and text
        }); // Alerts user of the color and text values of the circle that was clicked
    }); // Adds a 'click' event listener to every circle
}

function moveCircles() {
    let circles = document.getElementsByClassName("circle"); // Gets the list of circles
    Array.from(circles).forEach(function(circle) {
        let velLeft = Math.floor(Math.random() * (50 + 50 + 1)) - 50;
        let velTop = Math.floor(Math.random() * (50 + 50 + 1)) - 50;
        moveIndividualCircle(circle, velLeft, velTop);
        
    });
}

function moveIndividualCircle(circle, velLeft, velTop) {
    circle.style.left = circle.offsetLeft + velLeft + "px";
    circle.style.top  = circle.offsetTop + velTop + "px";
    
    setTimeout(function(){
         moveIndividualCircle(circle, velLeft, velTop); 
     }, 10);
}

// Initializes relevant parent functions once page finishes loading
window.onload = function() {
    generateCircle();
    clearAll();
    moveCircles();
};