let back = document.getElementById("back");
let pomidorroDoneCount = 0;
let bTime, bPlusTimePomidorro, bMinusTimePomidorro, bTimePomidorro,
    bPlusTimeRelax, bMinusTimeRelax, bTimeRelax, bPause;
    bTime = document.getElementById("time");
    bPlusTimePomidorro = document.getElementById("plusPomidorro");
    bMinusTimePomidorro = document.getElementById("minusPomidorro");
    bPlusTimeRelax = document.getElementById("plusRelax");
    bMinusTimeRelax = document.getElementById("minusRelax");
    bTimePomidorro = document.getElementById("timePomidorro");
    bTimeRelax = document.getElementById("timeRelax");
    bPause = document.getElementById("pause");

    let whatNow = "Work";
    let bigRelaxCounter = 0;
    let timeNeedGo = false;
    let timeInt = 30*60;
    let timePomidorro = 30, timeRelax = 5, bigTimeRelax = 30;
    let bMinutes = 30, bSeconds = 0;

    let audio = new Audio(); // Создаём новый элемент Audio
    let workPath = "audio/РАБОТЫ.mp3";
    let relaxPath = "audio/Файл релакс.mp3";
    let bigRelaxPath = "audio/Большой флекс.mp3";

    let bFavicon = document.getElementById("icon");
    let workIcon = "img/work.ico";
    let relaxIcon = "img/relax.ico";

    bMinutes = document.getElementById("minutes");
    bSeconds = document.getElementById("seconds");
    convertTime();
    bTimeRelax.innerHTML = timeRelax;
    bTimePomidorro.innerHTML = timePomidorro;
    bPause.onclick = function () {
        timeNeedGo=!timeNeedGo;
        if(!timeNeedGo){
            bPause.style = "transform: rotate(0)";
            bPause.innerHTML = "go?"
        }
        else
        {
            bPause.style = "transform: rotate(90deg)";
            bPause.innerHTML = "="
        }
    };
    bPlusTimeRelax.onclick = function (){
        timeRelax++;
        bTimeRelax.innerHTML = timeRelax;
    };
    bMinusTimeRelax.onclick = function (){
        timeRelax--;
        bTimeRelax.innerHTML = timeRelax;
    };
    bPlusTimePomidorro.onclick = function (){
        timePomidorro++;
        bTimePomidorro.innerHTML = timePomidorro;
    };
    bMinusTimePomidorro.onclick = function (){
        timePomidorro--;
        bTimePomidorro.innerHTML = timePomidorro;
    };

    let go = setInterval(function (){
        if(timeNeedGo){
            timeInt--;
            if(timeInt === 0) {
                changeAction();
            }
            convertTime();
        }
    }, 1000);

    function convertTime(){
        let minute = Math.floor(timeInt/60);
        let secondsText, minuteText;
        if(timeInt - minute*60 < 10)
            secondsText = "0" + String(timeInt - minute*60) ;
        else  secondsText = timeInt - minute*60;
        if(minute<10)
            minuteText= "0" + minute;
        else  minuteText = minute;
        bMinutes.innerHTML = minuteText;
        bSeconds.innerHTML = secondsText;
        document.title = minuteText + ":" + secondsText + " " + whatNow;
    }
    function changeAction(){
        if (whatNow === "Work") {
            back.classList.add("relax");
            whatNow = "Relax";
            bigRelaxCounter++;
            if(bigRelaxCounter === 4){
                timeInt = bigTimeRelax*60;
                bigRelaxCounter = 0;
                audio.src = bigRelaxPath;
            }
            else {
                timeInt = timeRelax * 60;
                audio.src = relaxPath;
            }
            pomidorroDoneCount++;
            document.getElementById("pomidorroDoneCount").innerHTML = "Количество помидорок: "+pomidorroDoneCount+"/12";
            bFavicon.href = relaxIcon;
        }
        else {
            whatNow = "Work";
            back.classList.remove("relax");
            timeInt = timePomidorro*60;
            audio.src = workPath;
            bFavicon.href = workIcon;
        }
        audio.play();
    }

