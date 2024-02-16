let app = angular.module("todoApp", [])
app.run(function($rootScope){
    $rootScope.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
})
app.controller("ctrl", function($scope, $rootScope){
   
    $scope.addTaskList = function(){ 
        $rootScope.taskList.push({taskDesc: $scope.newTask, status: false});
        $scope.newTask = [];
        $scope.check();
    }
    $scope.clearAll = function(){
        $rootScope.taskList = [];
        $scope.check();
    }
    $scope.clearCompleted = function () {
        $rootScope.taskList = $scope.taskList.filter(function(task){
            return !task.status;
        })
        $scope.check();
    }
    $scope.remove = function(index) {
        $rootScope.taskList.splice(index, 1);
        $scope.check();
    }
    $scope.remaining = function(){
        var count = 0;
        count = $scope.taskList.filter(task => !task.status).length;
        return count;
    }   
    $scope.check = function(){
        localStorage.setItem("taskList", JSON.stringify($rootScope.taskList));
    }
})