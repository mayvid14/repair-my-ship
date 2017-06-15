app.controller('postmodalctrl', function ($scope,$modalInstance, obj) {
    $scope.post = obj;
    console.log($scope.post);
    console.log($scope.post.co);
});