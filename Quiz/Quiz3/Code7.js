(function(){

    function setUserInfo()
    {
        return setUserName;
    }

    function setUserName(name)
    {
        userName = name;
        return setUserAge;
    }

    function setUserAge(age)
    {
        userAge = age;
        return setUserDesignation;
    }

    function setUserDesignation(designation)
    {
        userDesignation = designation;
        showAllDetails();
    }

    function showAllDetails()
    {
        console.log(userName + " " + userAge + " " + userDesignation);
    }

    setUserInfo()("Test Name")(10)("Test Designation");

})();