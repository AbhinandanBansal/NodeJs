function weatherhelper() {
    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        $.ajax({
            type: 'POST',
            url: '/getweatherinfo',
            data: { lat: position.coords.latitude, lon: position.coords.longitude },
            success: function (data) {
                /*console.log(data);
                console.log(data.city);
                console.log(data.data.city);
                console.log(data.data.weatherinfo.clouds);*/
                //to_be_updated = data._id;
                document.getElementById("weatherinfo").innerHTML = "Clouds: " + data.data.weatherinfo.clouds + "<br/>" + "Humidity:" + data.data.weatherinfo.humidity;
                document.getElementById("temprature").innerHTML = data.data.weatherinfo.temp + " F";
                document.getElementById("city").innerHTML = data.data.city;
                //$("#weatherinfo").attr("innerHTML", "weatherinfo");
                //$("#temprature").attr("innerHTML", "12 C");
                //$("#city").attr("innerHTML", "pune");
                //$('#Modal').modal({ show: true });
            },
            error: function () {
                alert('No data');
            }
        });
    })
    //console.log("I am in weather helper")
}