$(document).ready(function(){
    getRemaining();
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    // // today = mm + '-' + dd + '-' + yyyy;
    // today = yyyy+ '-' + mm + '-' + dd;
    // $("#tgltamu").val(today);
    // $("#tgljemaat").val(today);
    $("#btn-jemaat").click(function(){
        document.getElementById("conhome").hidden = true;
        document.getElementById("con-jem").hidden = false;
    })
    $("#btn-tamu").click(function(){
        document.getElementById("conhome").hidden = true;
        document.getElementById("con-tam").hidden = false;
    })
    $("#btnbackjem").click(function(){
        document.getElementById("conhome").hidden = false;
        document.getElementById("con-jem").hidden = true;
    })
    $("#btnbacktam").click(function(){
        document.getElementById("conhome").hidden = false;
        document.getElementById("con-tam").hidden = true;
    })
    $("#btnnextjem").click(function(){
        var lanjut=true;
        var namajemaat = $("#namajemaat").val();
        // var day=$("#tgljemaat").val();
        // var month=$("#select-bulan-jem").val();
        // var year=$("#thnjemaat").val();
        // var tgljemaat = ([year,month,day].join('-'));
        var tgljemaat = $("#dobjemaat").val();
        var wilayah = $("#select-wilayah").val();
        var kelompok = $("#select-kelompok").val();

        if(namajemaat=="" || tgljemaat=="" || wilayah == "" || kelompok == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal jemaat
            $("#mnamajemaat").text(namajemaat);
            $("#mtgljemaat").text(tgljemaat);
            $("#mwilayah").text(wilayah);
            $("#mkelompok").text(kelompok);
            $('#modalJemaat').modal('show');
            return false;
        }
        else{
            alert("Mohon cek kembali inputan Anda!");
            return false;
        }
    })
    $("#btnnexttam").click(function(){
        var lanjut=true;
        // var namatamu = $("#namatamu").val();
        // var day=$("#tgltamu").val();
        // var month=$("#select-bulan-tam").val();
        // var year=$("#thntamu").val();
        var tgltamu = $("#dobtamu").val();
        // var tgltamu = ([year,month,day].join('-'));
        var gerejaasal = $("#gerejaasal").val();

        if(namatamu=="" || tgltamu == "" || gerejaasal == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal tamu
            $("#mnamatamu").text(namatamu);
            $("#mtgltamu").text(tgltamu);
            $("#masaltamu").text(gerejaasal);
            $('#modalTamu').modal('show');
            return false;
        }
        else{
            alert("Mohon cek kembali inputan Anda!");
            return false;
        }
    })
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

var sisaquota = 0;

var TOKEN = "1|RcUIPpe8iY3bmNaYleZh23yevOVe0FtXxaWK1MQd"
const config = {
    headers: { Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json" }
};

var idibadah;
var next;
function getRemaining(){
    // console.log(data);
    axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest',config).then(function(response){
        var result = response.data;
        sisaquota = result.remaining;
        idibadah = result.id_ibadah;
        next = result.next;
    }).catch(function (error) {
        // handle error
        document.getElementById("tdremaining").innerText = error;
    }).then(function(){
        if(parseInt(sisaquota)<=0){
            document.getElementById("tdremaining").innerText = "Kuota Habis";
            $("#tdremaining").css('color','red');
            $("#btn-jemaat").hide();
            $("#btn-tamu").hide();
        }
        else{
            document.getElementById("tdremaining").innerText = sisaquota;
            $("#tdremaining").css('color','black');
        }
        
    })
}

const header = {
    headers: { 'Authorization': `Bearer ${TOKEN}`,
    'Accept': "application/json",
    'Content-Type': "application/x-www-form-urlencoded" }
};


function postJemaat(){
    $("#modalJemaat").modal('hide');
    document.getElementById("con-jem").hidden = true;
    document.getElementById("con-jem-success").hidden = false;
    $("#next-jem").text(next);
    $("#nama-jem").text($("#namajemaat").val());
    // var day=$("#tgljemaat").val();
    // var month=$("#select-bulan-jem").val();
    // var year=$("#thnjemaat").val();
    // var tgljemaat = ([day,month,year].join('-'));
    var datajemaat = {
        id_ibadah: idibadah,
        // dob: tgljemaat,
        dob: $("#dobjemaat").val(),
        nama_jemaat: $("#namajemaat").val(),
        wilayah: $("#select-wilayah").val(),
        kelompok: $('#select-kelompok').val(),
    }
    axios.post('https://gkjw-ngagel-api.herokuapp.com/api/registration', datajemaat, config).then(function(response){
        //magic
        var he = JSON.stringify(response.data);
        const hehe = he.split('{"uuid":"').pop();
        var uuid = hehe.substring(0,36);
        var qrcode = new QRCode(document.getElementById("qrcodejem"), {
            text: uuid,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            crossOrigin: "Anonymous"
        });
        $('#qrcodejem img').css('border-color','#C8DDF2');
        $('#qrcodejem img').css('border-width','0.5em');
        $('#qrcodejem img').css('border-style','solid');
        $('#qrcodejem img').css('border-radius','10px');
        $('#qrcodejem img').css('padding','1em');
    }).catch(function (error) {
       $("#qrcodejem").text('Pendaftaran Gagal! NIK sudah terdaftar');
    })
}

function postTamu(){
    $("#modalTamu").modal('hide');
    document.getElementById("con-tam").hidden = true;
    document.getElementById("con-tam-success").hidden = false;
    $("#next-tam").text(next);
    $("#nama-tam").text($("#namatamu").val());
    // var day=$("#tgltamu").val();
    // var month=$("#select-bulan-tam").val();
    // var year=$("#thntamu").val();
    // var tgltamu = ([day,month,year].join('-'));
    var datatamu = {
        id_ibadah: idibadah,
        // dob: tgltamu,
        dob: $("#dobtamu").val(),
        nama_jemaat: $("#namatamu").val(),
        gereja_asal: $("#gerejaasal").val(),
    }
    axios.post('https://gkjw-ngagel-api.herokuapp.com/api/registration', datatamu, config).then(function(response){
        //magic
        var he = JSON.stringify(response.data);
        const hehe = he.split('{"uuid":"').pop();
        var uuid = hehe.substring(0,36);
        var qrcode = new QRCode(document.getElementById("qrcodetam"), {
            text: uuid,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            crossOrigin: "Anonymous"
        });
        $('#qrcodetam img').css('border-color','#C8DDF2');
        $('#qrcodetam img').css('border-width','0.5em');
        $('#qrcodetam img').css('border-style','solid');
        $('#qrcodetam img').css('border-radius','10px');
        $('#qrcodetam img').css('padding','1em');
    }).catch(function (error) {
       $("#qrcodetam").text('Pendaftaran Gagal! NIK sudah terdaftar');
    })
}