/*!
    * Author: Mason Ziedonis
    * URL: www.masonziedonis.com
    * Program Name: Clover Technical Challenge
    * Date Started: Feb. 10, 2017
    * Date Last Updated: Feb. 10, 2017
    * Amount of time spent coding: 4 hours
    * Github: https://github.com/masonziedonis/coding-challenges/tree/clover
    *
    * Description: This is my file for the initial coding challenge portion of Clover's intership interview process. 
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
        
        startMovingCircle(circle);
        alertColorAndText(circle);
    }
}

// Removes all of the shapes on the screen
function clearAll() {
    document.getElementById("clearAllCircles").onclick = function () {
        let circleContainer = document.getElementById("circleContainer"); // Gets the circle container element
        circleContainer.innerHTML = ""; // Clears all the circles from the screen
    }
}

// Clicking a shape alerts the user of the shape's color and text.
function alertColorAndText(circle) {
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
}

// Assigns the random velocity for a circle and makes the circle move across the screen
function startMovingCircle(circle) {
    let velLeft = Math.floor(Math.random() * (50 + 50 + 1)) - 50; // Random velocity number for left attribute
    let velTop = Math.floor(Math.random() * (50 + 50 + 1)) - 50; // Random velocity number for top attribute
    moveIndividualCircle(circle, velLeft, velTop); // Starts the movement for one circle
}

// Moves each individual circle across the screen and reverses direction when it hits the edge of the screen
function moveIndividualCircle(circle, velLeft, velTop) {
    let leftPos = circle.offsetLeft + velLeft; // Moves the circle horizontally
    let topPos = circle.offsetTop + velTop; // Moves the circle vertically
    
    if (leftPos + circle.offsetWidth >= window.innerWidth) {
        circle.style.left = window.innerWidth - circle.offsetWidth + "px";
    } else if (leftPos <= 0) {
        circle.style.left = 0 + "px";
    } else {
        circle.style.left = leftPos + "px";
    } // Makes sure the element is not rendered off the left or right part of the screen, but that it touches the edge of the screen
    
    if (topPos + circle.offsetHeight >= window.innerHeight) {
        circle.style.top = window.innerHeight - circle.offsetHeight + "px";
    } else if (topPos <= 0) {
        circle.style.top = 0 + "px";
    } else {
        circle.style.top = topPos + "px";
    } // Makes sure the element is not rendered off the top or bottom part of the screen, but that it touches the edge of the screen
    
    if ((window.innerWidth - (circle.offsetLeft + circle.offsetWidth) <= 0) || (circle.offsetLeft) <= 0) {
        velLeft = -velLeft;
    } // Boundary checks to see if the circle will be hitting the left or right edge of the screen
    if ((window.innerHeight - (circle.offsetTop + circle.offsetHeight) <= 0) || (circle.offsetTop) <= 0) {
        velTop = -velTop;
    } // Bounary checks to see if the circle will be hitting the top or bottom edge of the screen
    
    setTimeout(function(){
         moveIndividualCircle(circle, velLeft, velTop); 
     }, 10); // Moves the circle again every 10 milliseconds by the new - or same - velocities 
}

window.onload = function() {
    generateCircle();
    clearAll();
}; // Initializes relevant parent functions once page finishes loading
