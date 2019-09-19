const purpleAlert = document.getElementById("alert");

const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");

const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const messageForm = document.querySelector(".widget-container");

//array members
const memberList = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];

//Purple Notification Alert

purpleAlert.innerHTML = `
<div class="alert-banner">
<p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
<p class="alert-banner-close">x</p>
</div>
`
;

purpleAlert.addEventListener('click', (e) => {
const element = e.target;
if (element.classList.contains("alert-banner-close")) {
purpleAlert.style.transform = "scale(1, 0)"; // Scale from 100% to 0
}
});

// Bell Notification Drop Down

const bellIcon = document.querySelector('.bell-solo');
const notificationBox = document.getElementById('notifications');
let greenDot = 'green';

const notificationPhrases = ['Meeting at noon',
                            'Your day to pick lunch!',
                            'Send files over to Jane'];

bellIcon.addEventListener('click', () => { // When the user clicks on the notification box...
    if (notificationBox.innerHTML == "" && greenDot == 'green') { // if the text is blank and the green dot is green...
        const div = document.createElement('DIV'); // a new <div> is created and stored in the value "div".
        div.classList.add('notification-div'); // That new <div> is given the class value "notification-div"
        notificationBox.appendChild(div); //The div element is appeded to the notificationBox

        for (i = 0; i < notificationPhrases.length; i += 1){ // Cycles through each phrase in the string for all of the following commands...
            const divPhrase = document.createElement('DIV'); // creates a new div for each of them
            divPhrase.classList.add('phrase-div'); // Gives the new divs a class name of "phrase-div"

            const p = document.createElement('P'); // Creates a paragraph element, stores it in "p"
            const buttonClose = document.createElement('BUTTON'); //creates another button element, stores it in buttonClose

            p.innerHTML = notificationPhrases[i]; //adds the text of each phrase as the paragraphs inner HTML
            div.appendChild(divPhrase); //adds the smaller div phrase to the larger div box
            divPhrase.appendChild(p); // adds the text to each phrase
            buttonClose.innerHTML = 'X'; // Gives the close button an X
            divPhrase.appendChild(buttonClose); // actually appends the X to the phrase div
        }

    }  else if (notificationBox.innerHTML != "") { // Or if notification box isn't blank and contains text (meaning the div is open already)...
        notificationBox.firstChild.remove(); // delete/close the first (main) div.
    }

    notificationBox.addEventListener('click', (e) => { // When the user clicks on the notification box
        if (e.target.tagName == 'BUTTON' && e.target.classList == "") { // If what they clicked is a button element and there are no classes attached...
            e.target.parentNode.remove(); //remove the parent/div itself
        }

        if (document.querySelector('.notification-div').innerHTML == '') { // Select the text of the .notification-div
            notificationBox.firstChild.remove(); // remove the first child
            document.querySelector('.bell-dot').style.display = 'none'; //remove the green dot, make it not true
            greenDot = "";
        }
    });
});


// Chart Data

let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
  data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
  backgroundColor: 'rgba(116, 119, 191, .3)',
  borderWidth: 1,
  }]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
   duration: 0
  },
  scales: {
   yAxes: [{
    ticks: {
     beginAtZero:true
     }
   }]
  },
  legend : {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
});

// Traffic Tab Active

const trafficList = document.querySelector('.traffic-nav');

trafficList.addEventListener('click', (e) => {

  if (e.target.tagName == 'LI') { //If the user clicks an li item
    e.target.classList.add('traffic-active'); //give it the class "traffic active"


  const li = document.querySelectorAll('.traffic-nav-link'); // Find all the traffic nav links
    for (let i = 0; i < li.length; i ++) { // Loop through each li
      if (li[i] === e.target) { // If the li is the one that is clicked, skip it
        continue
      };
      li[i].classList.remove('traffic-active');//Remove the traffic active class
    }
  }
});


// data for daily traffic bar chart
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
  }]
};

const dailyOptions = {
  scales: {
   yAxes: [{
    ticks: {
     beginAtZero:true
   }
 }]
},

legend : {
  display: false
 }
}

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

// data for daily traffic doughnut chart

const mobileData = {
labels: ["Desktop", "Tablet", "Phones"],
datasets: [{
  label: '# of Users',
  data: [2000, 550, 500],
  borderWidth: 0,
  backgroundColor: [
    '#7477BF',
    '#78CF82',
    '#51B6C8'
  ]
 }]
};

const mobileOptions = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 20,
      fontStyle: 'bold'
     }
  }
}

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

// Messaging section

messageForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent it from submitting the form, validate first
  if (user.value === "" && message.value === "") {
    alert("Please fill out user message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out a user field before sending");
  } else if (message.value === "") {
    alert("Please fill out a message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});

//TOggle Switches

const toggleButtonEmail = document.querySelector('.toggle-button-email');
const toggleButtonProfile = document.querySelector('.toggle-button-profile');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

toggleButtonEmail.addEventListener('click', () => {
    toggleButtonEmail.classList.toggle('off');

    if (document.getElementById('email-toggle').innerHTML == "ON") {
        document.getElementById('email-toggle').innerHTML = "OFF";

        saveButton.addEventListener('click', () => {
            //local storage
            localStorage.setItem('emailStorage', 'off');
        });

    }  else if (document.getElementById('email-toggle').innerHTML == "OFF"){
        document.getElementById('email-toggle').innerHTML = "ON";

        saveButton.addEventListener('click', () => {
            //local storage
            localStorage.setItem('emailStorage', 'on');
        });
    }

});

toggleButtonProfile.addEventListener('click', () => {
    toggleButtonProfile.classList.toggle('off');

    if (document.getElementById('profile-toggle').innerHTML == "ON") {
        document.getElementById('profile-toggle').innerHTML = "OFF";

        saveButton.addEventListener('click', () => {
            //local storage
            localStorage.setItem('profileStorage', 'off');
        });

    }  else if (document.getElementById('profile-toggle').innerHTML == "OFF"){
        document.getElementById('profile-toggle').innerHTML = "ON";

        saveButton.addEventListener('click', () => {
            //local storage
            localStorage.setItem('profileStorage', 'on');
        });

    }
});

// Autcomplete search

const input = document.getElementById("userField");
new Awesomplete(input, {
	list: memberList
});
