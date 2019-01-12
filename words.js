let word = $("#word");
let axButton = $("#axButton");

axButton.click(function() {
  sendReq();
});

function sendReq () { 
$.ajax({
  url: "https://dictionaryapi.com/api/v3/references/collegiate/json/"+word.val()+"?key=6e24356d-2fb6-4be3-b313-7b5d84c23b93",
  type: "GET",
  dataType: "json",
  success: (data)=>{
    console.log(data);

    if(isDataEmpty(data)) {
      return;
    }

    clearDefinitions();

    for(i=(data.length-1);i>-1;i--) {
      if((data[i].shortdef) === undefined) {
        displaySuggestions(data[i]);
      }else{
        displayDefinitions(data[i]);
      }
    }

    $("li").show(1000);
    displayPicture(data);
  },
  error: (xhr,status,error)=>{
    alert("Error: " + errorMessage);
  }
});
};

function isDataEmpty (data) {
  if ($.isEmptyObject(data)) {
    clearDefinitions();
    $("#definitionList").after("<h1 id='noSuggestions'>Sorry, we couldn't find your definition(s).<br>Please search again.</h1>");
    console.log("Arrived on --> isDataEmpty() = true");

    return true;
  }

  console.log("Arrived on --> isDataEmpty() = false");
};

function clearDefinitions() {
  console.log("Arrived on --> clearDefinitions()");

  $("li").remove();
  $("br").remove();
  $("#noSuggestions").remove();
  $(".picture").attr("hidden","hidden");
  $("#image").removeAttr("src");
}

function displaySuggestions(data) {
  console.log("Arrived on --> displaySuggestions()");

  $("#definitionList").after("<br><li><b>Suggestion:</b> "+data+"</li>");
  $("li").hide();
}

function displayDefinitions(data) {
  console.log("Arrived on --> displayDefinitions()");

  for(x=(data.shortdef.length-1);x>-1;x--) {
    console.log(data.shortdef[x]);
    $("#definitionList").after("<br><li><b>"+data.fl+":</b> "+data.shortdef[x]+"</li>");
    $("li").hide();
  }
}

function displayPicture(data) {
  console.log("Arrived on --> displayPicture()");

  if(data[0].art) {
      $(".picture").removeAttr("hidden");
      $("#image").attr("src", "https://www.merriam-webster.com/assets/mw/static/art/dict/"+data[0].art.artid+".gif").hide().delay(100).show(1200);
      $("#image").attr("title", data[0].hwi.hw);
  }else{
    $(".picture").attr("hidden","hidden");
  }
}
