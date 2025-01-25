var visable = true;
window.ResourceName = 'status'

$(document).ready(function(){
	setInterval(() => {
		let mug = document.getElementById('mugshot').getBoundingClientRect();
		$.post('http://xC_StatusHUD2/setMugShotPos', JSON.stringify({
			y: mug.y/window.innerHeight,
			x: mug.x/window.innerWidth,
			w: mug.width/window.innerWidth,
			h: mug.height/window.innerHeight
		}));
	}, 500);
	$.post('http://xC_StatusHUD2/NUIReady', JSON.stringify({}));
});

function setstatushudDisplay(opacity) {
    $('#statushud').css('opacity', opacity);
    $('.info-statushud.radio').css('opacity', opacity);
    $('.info-statushud.source').css('opacity', opacity);
    $('.info-statushud.time-and-place').css('opacity', opacity);
};

function setstatushudName(name) {
    $('#statushud #player-fullname span').text(name);
};

function setstatushudID(source) {
    $('#statushud #source').text(source);
};

function setstatushudJob(job) {
    if (job.job.ext) {
        if (job.job.grade < 0) {
            $('#statushud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#statushud #job-img img').attr('src', './img/logo/jobs/' + job.job.ext + '.png');
            $('#statushud #job-grade span').text('Off-Duty');
        } else {
            $('#statushud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#statushud #job-img img').attr('src', './img/logo/jobs/' + job.job.ext + '.png');
            $('#statushud #job-grade span').text(job.job.grade_label);
        };
    } else {
        if (job.job.grade < 0) {
            $('#statushud #job-name span').text(job.job.label);
            $('#statushud #job-img img').attr('src', './img/logo/jobs/' + job.job.name + '.png');
            $('#statushud #job-grade span').text('Off-Duty');
        } else {
            $('#statushud #job-name span').text(job.job.label);
            $('#statushud #job-img img').attr('src', './img/logo/jobs/' + job.job.name + '.png');
            $('#statushud #job-grade span').text(job.job.grade_label);
        };
    };
};

function setstatushudGang(gang) {
    $('#statushud #gang-name span').text((gang.gang.name).replace('_', ' '));
    $('#statushud #gang-grade span').text(gang.gang.grade_label);
};

function updatePing(data) {
    var s = data.value;
    $("[name='ping']").html(s)
    var x = document.getElementById("ping");


    if (s > 1 && s < 70) {
        $('#player-ping img').attr('src', './img/logo/wifi_g.png');
        x.style.color = "#13e94a";
    } else if (s > 71 && s < 300) {
        $('#player-ping img').attr('src', './img/logo/wifi_y.png');
        x.style.color = "#e8f016";
    } else {
        $('#player-ping img').attr('src', './img/logo/wifi_r.png');
        x.style.color = "#f01616";
    };

}

function setstatushudCash(money) {
    $('#statushud #player-cash-texte').text(money);
};

function bitcoin(level) {
    $('#statushud #player-coin-texte').text(level);
};

function setstatushudData(data) {
    if (data.health <= 10.0) {
        $('#health-img').addClass('ticktok');
    } else {
        $('#health-img').removeClass('ticktok');
    };
    $('#health').css('width', data.health + '%');
    $('#armor').css('width', data.armor + '%');
};

function setGangIcon(value){
    if (value == 'defaultlogo'){
	  $("#statushud #gang-img img").attr("src", 'url(./img/logo/gangs/gang.png)');
    }else if (value == 'nil'){
      $("#statushud #gang-img img").attr("src", 'url(./img/logo/gangs/gang.png)');
    }else{
      $("#statushud #gang-img img").attr("src", value);
    }
};
  
function setstatushudStatus(data) {
    let hunger = data[0].percent;
    let thirst = data[1].percent;
    if (hunger <= 10.0) {
        $('#statushud #hunger-img').addClass('ticktok');
    } else {
        $('#statushud #hunger-img').removeClass('ticktok');
    };

    if (thirst <= 10.0) {
        $('#statushud #thirst-img').addClass('ticktok');
    } else {
        $('#statushud #thirst-img').removeClass('ticktok');
    };

    $('#statushud #hunger').css('width', hunger + '%');
    $('#statushud #thirst').css('width', thirst + '%');
};

window.addEventListener('message', (event) => {
    let data = event.data;
    switch (data.action) {

        case 'toggle':
            if (visable) {
                this.setTimeout(() => {	
                    $('#player-name').fadeOut(1);
                    $('#player-cash').fadeOut(1);
                    $('#server-name').fadeOut(1);
                    $('#statushud #player-gang').fadeOut(1);
					$('#statushud #gang-grade span').fadeOut(1);
                    $('#statushud #gang-img img').fadeOut(1);
                    $('#statushud #gang-name span').fadeOut(1);
					$('#statushud #player-job').fadeOut(1);
                    $('#statushud #job-grade span').fadeOut(1);
                    $('#statushud #job-img img').fadeOut(1);
                    $('#statushud #job-name span').fadeOut(1);
                    $('#statushud #player-ping').fadeOut(1);
                    $('#statushud #ping').fadeOut(1);
                    $('#statushud .player-hour').fadeOut(1);
                    $('#statushud .player-id').fadeOut(1);
					$('#statushud #player-header').fadeOut(1);
					$('.right-status1').css({'transform' : 'rotate(-90deg)'});
					$('.left-statuss1').css({'transform' : 'rotate(-90deg)'});
					$('.right-status1').css({'top' : '6vw'});
					$('.left-statuss1').css({'left' : '2.0vw'});
					$('#statushud #health-bc').css({'transform' : 'rotate(-90deg)'});
					$('#statushud #armor-bc').css({'transform' : 'rotate(-90deg)'});
					$('#statushud #health-bc').css({'top' : '6vw'});
					$('#statushud #armor-bc').css({'left' : '2.0vw'});
                    $('.right-status2').fadeOut(1);
                    $('.left-statuss2').fadeOut(1);
                    $('#statushud #hunger-bc').fadeOut(1);
                    $('#statushud #thirst-bc').fadeOut(1);
                    $('.right-square-info').fadeOut(1);
                    $('.center-info').fadeOut(1);
                    $('.left-square-info').fadeOut(1);
                }, 300)
            } else {
                $('#statushud').fadeIn();
                this.setTimeout(() => {
					$('#player-name').fadeIn(1);
                    $('#player-cash').fadeIn(1);
                    $('#server-name').fadeIn(1);
                    $('#statushud #player-gang').fadeIn(1);
					$('#statushud #gang-grade span').fadeIn(1);
                    $('#statushud #gang-img img').fadeIn(1);
                    $('#statushud #gang-name span').fadeIn(1);
					$('#statushud #player-job').fadeIn(1);
                    $('#statushud #job-grade span').fadeIn(1);
                    $('#statushud #job-img img').fadeIn(1);
                    $('#statushud #job-name span').fadeIn(1);
                    $('#statushud #player-ping').fadeIn(1);
                    $('#statushud #ping').fadeIn(1);
                    $('#statushud .player-hour').fadeIn(1);
                    $('#statushud .player-id').fadeIn(1);
					$('#statushud #player-header').fadeIn(1);
					$('.right-status1').css({'transform' : 'rotate(0deg)'});
					$('.left-statuss1').css({'transform' : 'rotate(0deg)'});
					$('.right-status1').css({'top' : '4.3vw'});
					$('.left-statuss1').css({'left' : '0.19vw'});
					$('#statushud #health-bc').css({'transform' : 'rotate(0deg)'});
					$('#statushud #armor-bc').css({'transform' : 'rotate(0deg)'});
					$('#statushud #health-bc').css({'top' : '4.15vw'});
					$('#statushud #armor-bc').css({'left' : '0vw'});
                    $('.right-status2').fadeIn(1);
                    $('.left-statuss2').fadeIn(1);
                    $('#statushud #hunger-bc').fadeIn(1);
                    $('#statushud #thirst-bc').fadeIn(1);
                    $('.right-square-info').fadeIn(1);
                    $('.center-info').fadeIn(1);
                    $('.left-square-info').fadeIn(1);
                }, 300)
            };
            visable = !visable;
            break;



        case 'setstatushudDisplay':
            {
                setstatushudDisplay(data.opacity);
                break;
            };

				
        case 'setstatushudName':
            {
                setstatushudName(data.name);
                break;
            };

        case 'setstatushudID':
            {
                setstatushudID(data.source);
                break;
            };

        case 'setstatushudJob':
            {
                setstatushudJob(data.job);
                break;
            };

        case 'setstatushudGang':
            {
                setstatushudGang(data.gang);
                break;
            };

        case 'setstatushudPing':
            {
                setstatushudPing(data.ping);
                break;
            };

        case 'setstatushudData':
            {
                setstatushudData(data.data);
                break;
            };

        case 'setstatushudCash':
            {
                setstatushudCash(data.money);
                break;
            };

        case 'setstatushudStatus':
            {
                setstatushudStatus(data.data);
                break;
            };
	};
    if (event.data.action == "ping") {
        updatePing(event.data);
    } else if (event.data.action == "setGangIcon") {
        setGangIcon(event.data.icon);
    }
	
	
  function updateClock() {
    var now = new Date(),
        time = (now.getHours()<10?'0':'') + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();

    document.getElementById('hour').innerHTML = [time];
    setTimeout(updateClock, 1000);
  }
  
  updateClock()
});

var cssId = 'style';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    head.appendChild(link);
}