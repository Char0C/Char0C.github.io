function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayProjects(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}


function displayProjects(contents) {

  let temp = document.createElement('fileContent');
  temp.innerHTML = contents;
  jQuery('#fileContent-container').append(temp);

  var projectData = jQuery('[data-react="AutocompleteMultiple"').attr('data-props');
  var projectDataObject = JSON.parse(projectData).defaultValues;
  
  var projectListElem = jQuery('#file-projects');
  for (var i = 0 ; i < projectDataObject.length; i++) {
    console.log(i);
    //building the proper URLs and title :
    var projectURL = "https://openclassrooms.com/fr/projects/" + projectDataObject[i].value + "/assignment";
    var editURL = "https://openclassrooms.com/fr/admin/projects/" + projectDataObject[i].value + "/edit";  
    var projectTitle = projectDataObject[i].label;
    
    //Creating element for the project to add to the list
    var projectElemString = `<li>P${i} : <a href="${projectURL}">${projectTitle}</a> - <a href="${editURL}">edit link</a></li>`;
    var projectElem = jQuery(projectElemString);
    projectListElem.append(projectElem);
  }

}


document.getElementById('file-input').addEventListener('change', readSingleFile, false);
