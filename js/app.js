if("serviceWorker"in navigator){
    Window.addEvenlist("load",function(){
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered",err));
        
    });
}
