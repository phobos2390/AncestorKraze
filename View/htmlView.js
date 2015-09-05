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
var setElementVisibility = function(element,value)
{
    document.getElementById(element).style.visibility = value;
};
var setElementDisplay = function(element,value)
{
  document.getElementById(element).style.display = value;
};
var elementVisibilityHasAttribute = function(element,value)
{
    return window.getComputedStyle(document.getElementById(element)).visibility.valueOf() === value.valueOf();
};
var pause = function()
{
    if(elementVisibilityHasAttribute("winPopup","hidden"));
    {
        setElementVisibility("canvas-container","hidden");
        setElementVisibility("messages","hidden");
        setElementVisibility("pause","visible");
    }
};
var resume = function()
{
    setElementVisibility("canvas-container","visible");
    setElementVisibility("messages","visible");
    setElementVisibility("pause","hidden");
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
