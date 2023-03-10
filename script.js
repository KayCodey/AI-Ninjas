// You can test visuals by manually changing accuracy value
var accuracy = 85;
// Some more code needed to provide calculated accuracy form python script ...
// Condition to change color of the feedback box (green / red)

var outputParagraph  = document.getElementById("output")
var backgroundDiv =  document.getElementById("phishing-prediction")
var button = document.getElementById("checkButton")
var linkInput = document.getElementById("link-to-be-checked")

var form = document.getElementById("form")
form.addEventListener("submit", HandleLinkCheck)


class Link{
    constructor(link) {
        this.url = link
    }
}

class Response{
    constructor(result, percentage){
        this.result = result
        this.percentage = percentage
    }
}

function HandleLinkCheck(e)
{
    if (e.preventDefault) {
        e.preventDefault();
    }


    ResetText()
    console.log(linkInput.value)
    let link = linkInput.value
    GetAccuracy(link)
    return false;
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
                let response = JSON.parse(this.responseText);

                SetAccuracy(response.percentage)
                if (response.result == "True"){
                    SetText(true)
                }
                else{
                    SetText(false)
                }
            }
        }
    }

    xmlhttp.open("POST", "http://130.162.38.93:20421/check1", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(json);
}

function SetAccuracy(a){
    accuracy = a
}

function SetText(isPhisingAttempt){
    if (isPhisingAttempt){
        outputParagraph.innerHTML =  "there is "+accuracy+"% of chance that provided link is a phishing attempt";
        backgroundDiv.style.backgroundColor = "#E04E4E";
    }
    else{
        outputParagraph.innerHTML =  "there is "+(100 - accuracy)+"% of chance that provided link is not a phishing attempt";
        backgroundDiv.style.backgroundColor = "#77C676";
    }
}

function ResetText(){
    outputParagraph.innerHTML = ""
    backgroundDiv.style.backgroundColor = "#375A79"
}
