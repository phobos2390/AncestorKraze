/**
 * Created by phobos2390 on 8/10/15.
 */

var generationsRange = function(newValue)
{
  document.getElementById("generations").innerHTML = newValue;
};
var setDefiningValues = function(genVal,heightVal,widthVal)
{
  generationsRange(genVal);
  document.getElementById("generationSlider").value = genVal;
  setSizeValues(heightVal,widthVal);
};
var getGenerations = function()
{
  return parseInt(document.getElementById("generationSlider").value);
};
