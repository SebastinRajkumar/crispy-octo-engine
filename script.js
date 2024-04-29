// Array of motivational quotes
var motivationalQuotes = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "It does not matter how slowly you go as long as you do not stop. - Confucius"
];

// Function to display a random motivational quote
function displayMotivationalQuote() {
    console.log('chuhcuhu')
    var randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    var quote = motivationalQuotes[randomIndex];
    var quoteTextElement = document.getElementById('quote-text');
    quoteTextElement.textContent = quote;
}

// Function to change the quote every 2 minutes
function changeQuoteEveryTwoMinutes() {
    displayMotivationalQuote(); // Display initial quote
    setInterval(displayMotivationalQuote, 10 * 1000); // Change quote every 2 minutes
}


// Function to open a tab content
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
    
    // If Motivational Quotes tab is clicked, display a quote
    if (tabName === 'quotes') {
        changeQuoteEveryTwoMinutes()
        console.log('pepe')
        setInterval(displayMotivationalQuote, 10 * 1000)
    }
    else {
        // Always keep the Motivational Quotes tab open
        var quotesTab = document.getElementById('quotes');
        quotesTab.style.display = 'block';
    }
}


// GPA Calculation function
function calculateGPA() {
    const gradesInput = document.getElementById('grades').value;
    const grades = gradesInput.split(',').map(grade => parseFloat(grade.trim()));

    const sum = grades.reduce((acc, val) => acc + val, 0);
    const gpa = sum / grades.length;

    const resultElement = document.getElementById('result');
    resultElement.innerText = `Your GPA is: ${gpa.toFixed(2)}`;

    // Keep the "Motivational Quotes" tab open
    var quotesTab = document.getElementById('quotes');
    if (quotesTab.style.display !== 'block') {
        quotesTab.style.display = 'block';
        var calculatorTab = document.getElementById('calculator');
        calculatorTab.style.display = 'none';
    }
}

// Function to set a reminder notification
// Function to set a reminder notification
function setReminder() {
    var reminderInput = document.getElementById('reminderInput').value.trim();
    var reminderTime = document.getElementById('reminderTime').valueAsNumber;
    console.log(reminderTime)
    if (reminderInput !== '' && reminderTime) {
        var now = Date.now();
        var timeDiff = reminderTime - now;

        if (timeDiff <= 0) {
            alert('Please select a future time for the reminder.');
            return;
        }

        if (Notification.permission === "granted") {
            scheduleNotification(reminderInput, timeDiff, reminderTime);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    scheduleNotification(reminderInput, timeDiff, reminderTime);
                }
            });
        }
    } else {
        alert('Please enter both reminder and reminder time.');
    }
}

// Function to schedule a notification
function scheduleNotification(reminderInput, timeDiff, reminderTime) {
    setTimeout(function() {
        // Display browser notification
        var notification = new Notification('Reminder', {
            body: reminderInput,
            icon: 'path/to/icon.png'
        });
    }, timeDiff);

    // Add reminder to the list
    var reminderList = document.getElementById('reminderList');
    var listItem = document.createElement('li');
    listItem.textContent = reminderInput + ' - ' + new Date(reminderTime).toUTCString();
    reminderList.appendChild(listItem);

    // Clear input fields
    document.getElementById('reminderInput').value = '';
    document.getElementById('reminderTime').value = '';
}

