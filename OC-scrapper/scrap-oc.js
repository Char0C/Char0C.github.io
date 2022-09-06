function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    //Add content of the fil to DOM
    let temp = document.createElement('fileContent');
    temp.innerHTML = contents;
    jQuery('#fileContent_container').empty().html(temp);
    displayProjects(contents);
  };
  reader.readAsText(file);
}

function createPathTitleElement(pathTitle, pathID) {
  //building the proper URLs :
  var pathURL = `https://openclassrooms.com/fr/paths/${pathID}`;
  var pathEditURL = `https://openclassrooms.com/fr/admin/paths/${pathID}/edit`;

  //Creating element for the path and add to DOM
  var pathElemString = `<a href="${pathURL}">${pathTitle}</a> - <a href="${pathEditURL}">edit link</a>`;
  var pathElem = jQuery(pathElemString);

  jQuery('#path_container').append(pathElem);
}

function createProjectList(projectDataObject) {
  
  var projectListElem = jQuery('#file_projects');
  for (var i = 0 ; i < projectDataObject.length; i++) {
    //building the proper URLs and title :
    var projectID = projectDataObject[i].value;
    var projectURL = "https://openclassrooms.com/fr/projects/" + projectID + "/assignment";
    var editURL = "https://openclassrooms.com/fr/admin/projects/" + projectID + "/edit";  
    var replaceString = ` (${projectID})`;
    var projectTitle = projectDataObject[i].label.replace(replaceString, "");
    
    //Creating element for the project to add to the list in DOM
    var projectElemString = `<li>P${i+1} (${projectID}) : <a href="${projectURL}">${projectTitle}</a> - <a href="${editURL}">edit link</a></li>`;
    var projectElem = jQuery(projectElemString);

    projectListElem.append(projectElem);
  }
}

function displayProjects(contents) {

  //Reset DOM
  jQuery('#path_container').empty();
  jQuery('#file_projects').empty();

  //Create path title
  var pathTitle = jQuery('#edit_learning_path_title').attr('value');
  var pathID = jQuery('#edit_learning_form').attr('action').match(/[0-9]+/)[0];
  createPathTitleElement(pathTitle, pathID);


  //Create project list
  var projectData = jQuery('[data-react="AutocompleteMultiple"').attr('data-props');
  var projectDataObject = JSON.parse(projectData).defaultValues;

  createProjectList(projectDataObject);
}


document.getElementById('file_input').addEventListener('change', readSingleFile, false);
