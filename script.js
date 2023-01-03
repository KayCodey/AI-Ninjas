// You can test visuals by manually changing accuracy value
var accuracy = -1;
// Some more code needed to provide calculated accuracy form python script ...
// Condition to change color of the feedback box (green / red)
if (accuracy >=0 &&  accuracy <= 50) {
    document.getElementById("output").innerHTML = "there is "+accuracy+"% of chance that provided link is a phishing attempt";
    document.getElementById("phishing-prediction").style.backgroundColor = "#77C676";
} else if (accuracy > 50 && accuracy <= 100) {
    document.getElementById("output").innerHTML = "there is "+accuracy+"% of chance that provided link is a phishing attempt";
    document.getElementById("phishing-prediction").style.backgroundColor = "#E04E4E";
}
