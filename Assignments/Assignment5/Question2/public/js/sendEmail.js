$('.update').click(function() {
    var response = confirm("Do you want to send an email?")
    email = this.id;
    status = this.value;
    console.log(email);
    console.log(response);
    if(response === true){
        $.ajax({
            type: 'POST',
            url: '/sendEmail',
            data: {"email":email,"status": status},
            success: function(data){
                console.log('data is '+JSON.stringify(data));
                window.location.reload()
            },
            error: function(){
                alert('No data');
            }
        });
    }
    else{
        console.log("Email not sent")
    }
});