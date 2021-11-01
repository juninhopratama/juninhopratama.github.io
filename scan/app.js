var nameRes;
var messageRes;

$(document).ready(function(){
    document.getElementById("resultTable").hidden = true;
    document.getElementById("btnSelanjutnya").hidden = true;
    $("#btnSelanjutnya").click(function(){
        html5QrcodeScanner.resume();
        document.getElementById("btnSelanjutnya").hidden = true;
        document.getElementById("resultTable").hidden = true;
        document.getElementById("guide").hidden = true;
    })
})

function onScanSuccess(decodedText, decodedResult) {
    html5QrcodeScanner.pause();
    axios.get(`https://gkjw-ngagel-api.herokuapp.com/api/scan/${decodedText}`).then(function (response){
        console.log(response);
        var result = response.data;
        nameRes = result.name;
        messageRes = result.message;
    }).catch(function (error){
        console.log(error);
    }).then(function(){
        document.getElementById("resultTable").hidden = false;
        document.getElementById("btnSelanjutnya").hidden = false;
        document.getElementById("guide").hidden = true;
        if(messageRes == "Code has been scanned!"){
            $("#tableBody").removeClass('table-success').addClass('table-danger');
            document.getElementById("messageResponse").innerText = "QR Code sudah discan!";
        }else{
            $("#tableBody").removeClass('table-danger').addClass('table-success');
            document.getElementById("messageResponse").innerText = "QR Code berhasil discan!";
        }
        document.getElementById("namaJemaat").innerText = nameRes;
    });
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: {width: 200, height:200}});
html5QrcodeScanner.render(onScanSuccess);