const express  = require('express');
const fs = require('fs');
var app = express();


app.get('/employee/:id', function(req,res){
    var employeeId = req.params.id;
      fs.readFile('employees.json', function(err,data){
        if (err)
        {
            res.send(err);
        }
        else
        {
            var employee;
            var parsedData = JSON.parse(data);
            for (var i = 0, l = parsedData.length; i < l; i++){
                if (parsedData[i].id === parseInt(employeeId)) {
                   employee = parsedData[i];
                   break; 
                }
              }
              res.send(employee);
        }
    });
});

app.get('/project/:id', function(req,res){
    var projectId = req.params.id;
      fs.readFile('projects.json', function(err,data){
        if (err)
        {
            res.send(err);
        }
        else
        {
            var project;
            var parsedData = JSON.parse(data);
            for (var i = 0, l = parsedData.length; i < l; i++){
                if (parsedData[i].projectId === parseInt(projectId)) {
                    project = parsedData[i];
                   break; 
                }
              }
              res.send(project);
        }
    });
});

app.get('/getEmployeeDetails/:id', function(req,res){
    var employeeId = req.params.id;
      fs.readFile('employees.json', function(err,data){
        if (err)
        {
            res.send(err);
        }
        else
        {
            new Promise(function(resolve,reject){
            var employee;
            var parsedData = JSON.parse(data);
            for (var i = 0, l = parsedData.length; i < l; i++){
                if (parsedData[i].id === parseInt(employeeId)) {
                    employee = parsedData[i];
                    resolve(employee);
                   break; 
                }
              }
            }).then(function(employee){
                fs.readFile('projects.json', function(err,data){
                    if (err)
                    {
                        res.send(err);
                    }
                    else
                    {
                        var project;
                        var parsedData = JSON.parse(data);
                        for (var i = 0, l = parsedData.length; i < l; i++){
                            if (parsedData[i].projectId === parseInt(employee.projectId)) {
                                project = parsedData[i];
                               break; 
                            }
                          }
                          var employeeDetails = employee;
                          employeeDetails["projectName"] = project.projectName;
                          res.send(employeeDetails);
                    }
                });
            });
        }
    });
});

app.listen(3000);
console.log("3000 is working now");
