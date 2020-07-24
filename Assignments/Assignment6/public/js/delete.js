$('.delete').click(function() {
    var response = confirm("Do you want to delete?")
    title = this.id;
    console.log(response)
    if(response === true){
        $.ajax({
            type: 'DELETE',
            url: '/delete_bug',
            method: 'delete',
            data: {"title":title},
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
        console.log("not deleted")
    }
});