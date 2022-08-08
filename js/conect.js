var app = angular.module("app", ["firebase"]);
app.config(function () {
  var config = {
    apiKey: "AIzaSyDgay8ubKzVrNrrWGoWin6es8I3E85qoOA",               // Your Firebase API key
    authDomain: "asm-web207-e483c.firebaseapp.com",       // Your Firebase Auth domain ("*.firebaseapp.com")
    databaseURL: "https://asm-web207-e483c-default-rtdb.firebaseio.com",     // Your Firebase Database URL ("https://*.firebaseio.com")
    storageBucket: "asm-web207-e483c.appspot.com"  // Your Cloud Storage for Firebase bucket ("*.appspot.com")
  };
  firebase.initializeApp(config);
});

// JavaScript
app.controller("MyCtrl", ["$scope", "$firebaseArray",
  function ($scope, $firebaseArray) {
    var ref = firebase.database().ref('/product');
    var list = $firebaseArray(ref);
   // var id =new URL(document.URL).searchParams.get('id');
    list.$loaded()
      .then(function (x) {
        $scope.items=x
        // x.forEach((v) => {
        //   if(id){
        //     $scope.item = x.filter((x)=> x.$id === id)
        //   }
        // })
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
      $scope.cart = JSON.parse(localStorage.getItem("Cart") || '[]');
      $scope.total = localStorage.getItem("total");
  
  
      $scope.addcart = (sp) => {
          var index = $scope.cart.findIndex((item) => {
              return (item.sanpham.$id == sp.$id);
          });
          if (index < 0) {
              var newSP = {
                  sanpham: sp,
                  slBan: 1
              };
              $scope.cart.push(newSP);
          } else {
              $scope.cart[index].slBan++
          }
          $scope.total++;
          localStorage.setItem("total", JSON.stringify($scope.total));
          $scope.total = localStorage.getItem("total");
          localStorage.setItem("Cart", JSON.stringify($scope.cart));
          $scope.cart = JSON.parse(localStorage.getItem("Cart") || '[]');
      }
      $scope.removeCart = (sp) => {
        $scope.cart = $scope.cart.filter(x => x.sanpham.$id !== sp.sanpham.$id)
        $scope.total -= sp.slBan
        localStorage.setItem("total", JSON.stringify($scope.total));
        localStorage.setItem("Cart", JSON.stringify($scope.cart));
    }
  }
  
]);


