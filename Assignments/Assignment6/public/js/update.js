var name;
var to_be_updated;
        $(document).ready(function() {
            $('#myTable').DataTable();
            });
        // edit data
        $('.update').click(function() {
            id= this.id;
                $.ajax({
                    type: 'POST',
                    url: '/find_by_title',
                    data: {"title":id},
                    success: function(data){
                            to_be_updated = data[0].title;
                            $("#update_title").attr("value", data[0].title);
                            $("#update_description").attr("value", data[0].description);
                            $("#update_assignee").attr("value", data[0].assignee);
                            $('#Modal').modal({show: true});
                        },
                    error: function(){
                        alert('No data');
                    }
                    });
            });




            
            // update data
                  $(function(){
                      $('#update_table').on('click', function(e){
                        console.log('i am indsd');
                        var data = $('#update_bug').serialize();
                        debugger;
                        console.log(JSON.stringify(data));
                        e.preventDefault();
                        $.ajax({
                          url: '/update_bug',
                          type:'PUT',
                          data : data,
                          success: function(data){
                            console.log('i am googleapis');
                            window.location.reload()
                        },
                        error: function(){
                          alert('No data');
                        }
                      });
                  });
                  });