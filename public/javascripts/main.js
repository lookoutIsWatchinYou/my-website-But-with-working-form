

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
          name: $('#name').val(),
          email: $('#email').val(),
          message: $('#message').val(),
        },
        
        success: function () {
          successMsg.text("");//clears it
          successMsg.show();

          console.log(successMsg);
          successMsg.text("Your submission was successful!")
          errorsContainer.hide()
          alert('Your submission was successful');

        },
        error: function (data) {

            alert('Your submission was bad');
            var errors = JSON.parse(data.responseText);
            errorsContainer.innerHTML = '';
            var errorsList = '';
            successMsg.hide()
            errorsContainer.show();
            if(errors.length>1){
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

