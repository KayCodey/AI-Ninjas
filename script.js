// You can test visuals by manually changing accuracy value
var accuracy = 85;
// Some more code needed to provide calculated accuracy form python script ...
// Condition to change color of the feedback box (green / red)

var outputParagraph  = document.getElementById("output")
var backgroundDiv =  document.getElementById("phishing-prediction")
var button = document.getElementById("checkButton")
var linkInput = document.getElementById("link-to-be-checked")
button.addEventListener("click", HandleLinkCheck);

class Link{
    constructor(link) {
        this.url = link
    }
}

function HandleLinkCheck()
{
    console.log(linkInput.value)
    let link = linkInput.value

    GetAccuracy(link)
}

function GetAccuracy(link)
{
    var linkObj = new Link(link)
    var xmlhttp = new XMLHttpRequest();

    const json = JSON.stringify(linkObj);

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            if (this.responseText !== "")
            {
                let response = this.responseText

                if (response == "True"){
                    SetText(true)
                }
                else{
                    SetText(false)
                }
            }
        }
    }

    xmlhttp.open("POST", "http://130.162.38.93:20421/check", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(json);
}

function SetAccuracy(a){
    accuracy = a

    if (accuracy >=0 &&  accuracy <= 30) {
        outputParagraph.innerHTML = "there is "+accuracy+"% of chance that provided link is a phishing attempt";
        backgroundDiv.style.backgroundColor = "#77C676";
    } else if (accuracy > 30 && accuracy < 60) {
        outputParagraph.innerHTML = "there is "+accuracy+"% of chance that provided link is a phishing attempt";
        backgroundDiv.style.backgroundColor = "#DD8D53";
    } else if (accuracy >= 60 && accuracy <= 100) {
        outputParagraph.innerHTML = "there is "+accuracy+"% of chance that provided link is a phishing attempt";
        backgroundDiv.style.backgroundColor = "#E04E4E";
    }
}

function SetText(isPhisingAttempt){
    if (isPhisingAttempt){
        outputParagraph.innerHTML =  "there is "+accuracy+"% of chance that provided link is a phishing attempt";
        backgroundDiv.style.backgroundColor = "#E04E4E";
    }
    else{
        outputParagraph.innerHTML =  "there is "+accuracy+"% of chance that provided link is not a phishing attempt";
        backgroundDiv.style.backgroundColor = "#77C676";
    }
}
