var i=0;
var window = self;

function timedCount()
{
    i=i+1;
    var data = 'null';
    console.log(window);
    /*if(i%2 === 0) {
        data = window.webapis.appcommon.getForegroundAppId();
    } else {
        data = window.webapis.productinfo.getLocalSet();
    }*/
    data = window.webapis.appcommon.getForegroundAppId();
    postMessage(data);
    setTimeout("timedCount()",500);
}

timedCount();