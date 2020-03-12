

//learning ajax probably use jquery to grab error messages better
//jQuery getJSON() Method

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
          var successMsg = $('#success');
          successMsg.text("");//clears it
          console.log(successMsg);
          successMsg.text("Your submission was successful!")
          alert('Your submission was successful');
        },
        error: function (data) {
          var errorsContainer = $('#errors');

            alert('Your submission was bad');
            var errors = JSON.parse(data.responseText);
             errorsContainer = $('#errors');
            errorsContainer.innerHTML = '';
            var errorsList = '';
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

