

//learning ajax probably use jquery to grab error messages better
//jQuery getJSON() Method
var successMsg = $('#success');
var  errorsContainer = $('#errors');

successMsg.hide();
errorsContainer.hide();

$("#target").click(function(){
    event.preventDefault()
    $.ajax({
        
        
        url: '/index',
        type: 'POST',
        cache: false,
        data: {
          name: $('formName').val(),
          email: $('formEmail').val(),
          message: $('formMessage').val(),
        },
        
        success: function () {
          console.log("HEy success")
          successMsg.text("");//clears it
          successMsg.show();

          successMsg.text("Your submission was successful!");
          errorsContainer.hide();

        },
        error: function (data) {
          console.log("HEy fail")

            var errors = JSON.parse(data.responseText);
            errorsContainer.innerHTML = '';
            var errorsList = '';
            successMsg.hide();
            errorsContainer.show();
            if(errors.length>0){
            for (var i = 0; i < errors.length; i++) {
              errorsList += '<li>' + errors[i].msg + '</li>';
            }
            errorsContainer.html(errorsList);
        }
        else{
         return console.log(errors);
        }
      }
      });
});

    //$("#errors").load("/json/javascript.js");

