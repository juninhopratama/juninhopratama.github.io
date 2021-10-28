$(document).ready(function(){
    getRemaining();
    const interval = setInterval(function(){
        getRemaining();
    },5000)
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
        var nikjemaat = $("#nikjemaat").val();
        var umurjemaat = $("#umurjemaat").val();
        var wilayah = $("#select-wilayah").val();
        var kelompok = $("#select-kelompok").val();

        console.log(namajemaat);
        console.log(nikjemaat);
        console.log(umurjemaat);
        console.log(wilayah);
        console.log(kelompok);


        if(namajemaat=="" || nikjemaat=="" || umurjemaat == "" || wilayah == "" || kelompok == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal jemaat
            $("#mnamajemaat").text(namajemaat);
            $("#mnikjemaat").text(nikjemaat);
            $("#musiajemaat").text(umurjemaat);
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
        var namatamu = $("#namatamu").val();
        var niktamu = $("#niktamu").val();
        var umurtamu = $("#umurtamu").val();
        var gerejaasal = $("#gerejaasal").val();

        if(namatamu=="" || niktamu=="" || umurtamu == "" || gerejaasal == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal tamu
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
// async function loadData(){
//     const data = await axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest');
//     var sisa = data.remaining;
//     console.log(sisa);
// }


const client = new ApiClient(process.env.TOKEN);

const config = {
    headers: { Authorization: `Bearer ${client}`,
    Accept: "application/json" }
};

function getRemaining(){
    // console.log(data);
    axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest',config).then(function(response){
        var result = response.data;
        sisaquota = result.remaining;
    }).catch(function (error) {
        // handle error
        document.getElementById("tdremaining").innerText = error;
    }).then(function(){
        if(parseInt(sisaquota)<=0){
            document.getElementById("tdremaining").innerText = "Kuota Habis";
            $("#tdremaining").css('color','red');
        }
        else{
            document.getElementById("tdremaining").innerText = sisaquota;
            $("#tdremaining").css('color','black');
        }
        
    })

}

function getQR(){
    axios.get('https://gkjw-ngagel-api.herokuapp.com/api/uuid').then(function(response){
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: response.data.uuid,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        $('#qrcode img').css('border-color','#C8DDF2');
        $('#qrcode img').css('border-width','1em');
        $('#qrcode img').css('border-style','solid');
    })

    
}
// function hehe(){
//     document.getElementById("anjay").innerText = sisaquota;
// }

// function getDataRequest(){
//     axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest').then(function(response){
//         return response.data.remaining;
//     })
// }