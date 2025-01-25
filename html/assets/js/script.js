var Babat = false;

function setDisplay(opacity) {
    $('#main').css('opacity', opacity);
};

function setPlayerName(name) {
    $('#player_name').text(name);
};


function setJob(job) {
    if (job.job.name == 'nojob') {
        $('#job').fadeOut(2000);
    } else {
        $('#job').fadeIn(2000);
    };

    if (job.job.ext) {
        if (job.job.grade < 0) {
            $('#jobname').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#job img').attr('src', './assets/imgs/jobs/' + job.job.ext + '.png');
            $('#jobgrade').text('Off-Duty');
        } else {
            $('#jobname').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#job img').attr('src', './assets/imgs/jobs/' + job.job.ext + '.png');
            $('#jobgrade').text(job.job.grade_label);
        };
    } else {
        if (job.job.grade < 0) {
            $('#jobname').text(job.job.label);
            $('#job img').attr('src', './assets/imgs/jobs/' + job.job.name + '.png');
            $('#jobgrade').text('Off-Duty');
        } else {
            $('#jobname').text(job.job.label);
            $('#job img').attr('src', './assets/imgs/jobs/' + job.job.name + '.png');
            $('#jobgrade').text(job.job.grade_label);
        };
    };
};

function setPlayerGang(gang) {
    if (gang.gang.name == 'nogang') {
        $('#gang').fadeOut(2000);
    } else {
        $('#gang').fadeIn(2000);
    };
    $('#gangname').text((gang.gang.name).replace('_', ' '));

    if (gang.gang.name == 'Mafia') {
        $('#gang img').attr('src', './assets/imgs/gangs/' + gang.gang.name + '.png');
    } else {
        $('#gang img').attr('src', './assets/imgs/gangs/gang.png');
    };

    $('#ganggrade').text(gang.gang.grade_label);
};

function updatePing(data) {
    var s = data.value;
    $("#ping").html(s)

}


function setMDCash(money) {
    $('#cash').text('$' + money);
};

function setHUDData(data) {
    $('#health .progressbar__prog').css('width', data.health + '%');
    $('#armor .progressbar__prog').css('width', data.armor + '%');

    $('#health .progressbar__info').text(Math.floor(data.health) + '/100');
    $('#armor .progressbar__info').text(Math.floor(data.armor) + '/100');

};

function setHUDStatus(data) {
    let hunger = data[0].percent;
    let thirst = data[1].percent;
    console.log(data)
    $('#hunger .progressbar__prog').css('width', hunger + '%');
    $('#thirst .progressbar__prog').css('width', thirst + '%');

    $('#hunger .progressbar__info').text(Math.floor(hunger) + '/100');
    $('#thirst .progressbar__info').text(Math.floor(thirst) + '/100');
};
window.addEventListener('message', (event) => {

    let data = event.data;

    switch (data.action) {

        case 'avatar':
            {
                var xhr = new XMLHttpRequest();
                xhr.responseType = "text";
                xhr.open('GET', data.steamid, true);
                xhr.send();
                xhr.onreadystatechange = processRequest;

                function processRequest(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var string = xhr.responseText.toString();
                        var array = string.split("avatarfull");
                        var array2 = array[1].toString().split('"');
                        $('#profile_img').attr('src', array2[2].toString());
                    }
                }
                break;
            };


        case 'setDisplay':
            {
                setDisplay(data.opacity);
                break;
            };

        case 'setPlayerName':
            {
                setPlayerName(data.name);
                break;
            };


        case 'setJob':
            {
                setJob(data.data);
                break;
            };

        case 'setPlayerGang':
            {
                setPlayerGang(data.data);
                break;
            };

        case 'HetaPing':
            {
                HetaPing(data.ping);
                break;
            };

        case 'setHUDData':
            {
                setHUDData(data.data);
                break;
            };

        case 'setMDCash':
            {
                setMDCash(data.money);
                break;
            };

        case 'setHUDStatus':
            {
                setHUDStatus(data.data);
                break;
            };
        case 'setID':
            {
                $("#header__id").text(data.source)
                break;
            };
  
    };

    if (event.data.action == "ping") {
        updatePing(event.data);
    }

    function updateClock() {
        var now = new Date(), time = (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        $("#header__clock").text(time)
        setTimeout(updateClock, 1000);
    }
    updateClock();

});