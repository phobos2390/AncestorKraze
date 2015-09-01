/**
 * Created by phobos2390 on 8/10/15.
 */

var restartWithSameParameters = function()
{
  started = false;
  document.getElementById("winPopup").style.visibility = "hidden";
  var logElement = document.getElementById("log");
  logElement.value = "";
  logElement.scrollTop = logElement.scrollHeight;
  startGame();
  resume();
};
var pause = function()
{

    if(window.getComputedStyle(document.getElementById("winPopup")).visibility.valueOf() === "hidden".valueOf())
    {
        document.getElementById("canvas-container").style.visibility = "hidden";
        document.getElementById("messages").style.visibility = "hidden";
        document.getElementById("pause").style.visibility = "visible";
    }
};
var resume = function()
{
    document.getElementById("canvas-container").style.visibility = "visible";
    document.getElementById("messages").style.visibility = "visible";
    document.getElementById("pause").style.visibility = "hidden";
};
var setSizeValues = function(heightVal,widthVal)
{
    heightRange(heightVal);
    widthRange(widthVal);
    document.getElementById("heightSlider").value = heightVal;
    document.getElementById("widthSlider").value = widthVal;
};
var heightRange = function(newValue)
{
    document.getElementById("height").innerHTML = newValue;
};
var widthRange = function(newValue)
{
    document.getElementById("width").innerHTML = newValue;
};
var getHeight = function()
{
    return parseInt(document.getElementById("heightSlider").value);
};
var getWidth = function()
{
    return parseInt(document.getElementById("widthSlider").value);
};
