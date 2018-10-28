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
    $("li").remove();
    $("#image").removeAttr("src");
    for(i=(data.length-1);i>-1;i--) {
      for(x=(data[i].shortdef.length-1);x>-1;x--) {
        console.log(data[i].shortdef[x]);
        $("#definitionList").after("<br><li><b>"+data[i].fl+":</b> "+data[i].shortdef[x]+"</li>");
        $("li").hide();
      }
    }
    $("li").show(1000);

    if(data[0].art) {
      $(".picture").removeAttr("hidden");
      $("#image").attr("src", "https://www.merriam-webster.com/assets/mw/static/art/dict/"+data[0].art.artid+".gif").hide().delay(100).show(1200);
      $("#image").attr("title", data[0].hwi.hw);
    }else{
      $(".picture").attr("hidden","hidden");
    }
  },
  error: (xhr,status,error)=>{
    alert("Error: " + errorMessage);
  }
});
};
