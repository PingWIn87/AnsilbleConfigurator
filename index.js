const {ipcRenderer} = require('electron');

function openFile() {
    var data = ipcRenderer.sendSync('main-data', 'show open file dialog');
    document.body.innerHTML = document.body.innerHTML +'<br><pre>'+ JSON.stringify(data, null, 2)+'</pre>';
    console.log(JSON.stringify(data, undefined, 2));
}



