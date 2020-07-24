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
                    url: '/news/find_by_id',
                    data: {"id":id},
                    success: function(data){
                            console.log(data);
                            to_be_updated = data._id;
                            $("#title").attr("value", data.title);
                            $("#description").attr("value", data.description);
                            $("#publishedat").attr("value", data.publishedat);
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
                        var data = $('#update_news').serialize();
                        //debugger;
                        console.log(JSON.stringify(data));
                        e.preventDefault();
                        $.ajax({
                          url: '/news/updatenews',
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