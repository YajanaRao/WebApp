$(document).ready(function(){
    $("button.start").click(function(){
        $("div.animate").animate({
            // top: '10px',
            height: 'auto',
            width: '50%',
            position: 'relative',
            //left: '250px',
            padding: '10px',
            //opacity: '0.5',
            //width: '750px'
        });
        //$("div.text").show();
        $("div.text").fadeIn("slow");
    });
    $("button.stop").click(function(){
        $("div.animate").animate({
            margin:'auto',
            // top: '10px',
            height: 'auto',
            width: 'auto',
            position: 'relative',
            //left: '250px',
            //opacity: '0.5',
            //width: '750px'
        });
        //$("div.text").show();
        $("div.text").fadeOut("slow");
    });
});


$(document).ready(function(){
    $("button.enter").click(function(){
      var str = $('#msg').val();
      console.log(str);
      showHint(str);
      $('#msg').val('');
    })
});
function showHint(str) {
  console.log(str);
    if (str.length == 0) {
        // document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
      $("div.chatbox").append('<div class="row"><div class="col-8 w3-card-4" style="background-color:#5cb85c;color:white;"><p>'+str+'</p></div><div class="col-4"></div></div></div>');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              // response = JSON.parse(this.responseText);
              response = this.responseText;

              if (!!response){
                    if (response == "none"){
                      response = "I don't know what to replay, Can you teach me?"
                      $("div.chatbox").append('  <div class="row"><div class="col-3"></div><div class="col-8 w3-card-4" style="background-color:#e0e0e0;padding:10px"><p>'+response+'</p></div><div class="col-1">  <img src="{{ url_for('static', filename='image/avatar.png') }}" class="img-circle" alt="Cinque Terre" width="40" height="50"></div></div>');
                    }
                    else{
                      $("div.chatbox").append('<div class="row"><div class="col-4"></div><div class="col-8 w3-card-4" style="background-color:#e0e0e0;"><p>'+response+'</p></div></div>');
                    }
                    var objDiv = document.getElementById("chatbody");
                    console.log(objDiv.scrollHeight);
                    objDiv.scrollTop = objDiv.scrollHeight;
                    // objDiv.scrollTop = 198;
                    console.log(objDiv.scrollTop);
                    // window.scrollBy(0, 100);
                    // window.scrollTo(0,document.chatbody.scrollHeight);

              }
              else {
                console.log("Something went wrong");
                // document.getElementById("").innerHTML = "No Suggestions";
              }


            }
        }
        xmlhttp.open("GET", "gethint.php?q="+str, true);
        xmlhttp.send();
    }
}
