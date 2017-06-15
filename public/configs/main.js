var app = angular.module('rms',['ngRoute','angularMoment','swxSessionStorage','ngFileUpload', 'ngImgCrop']);

app.filter('initcap',function(){
   return function(name){
       var arr = name.split(' ');
       var dup = [];
       for(var i=0;i<arr.length;i++){
           var tempstr = arr[i];
           var str = tempstr[0].toUpperCase()+tempstr.substring(1,tempstr.length).toLowerCase();
           dup.push(str);
       }
       return dup.join(' ');
   } ;
});

app.filter('dob',function(){
    return function(num){
        var date = new Date(num);
        return date.toLocaleDateString();
    }
});

app.filter('getDur',function(){
    return function(num){
        var date = new Date(num*1);
        /*console.log(date);console.log(moment());*/
        return moment(date).fromNow();
    }
});