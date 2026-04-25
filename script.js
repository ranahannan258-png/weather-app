getlocation();
let transition = document.querySelector(".transition");
transition.classList.remove("transition");

function getlocation() {
    let button = document.querySelector(".btn");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        let search = document.querySelector(".text");
        let currentlocation = search.value;
        getapi(currentlocation);
        search.value = '';
    });
}

// let city = 'lahore';
const getapi = async (city) => {
    let url = `https:api.weatherapi.com/v1/current.json?key=a36f9661e6d148c3a87113026261801&q=${city}&aqi=no`

    const res = await fetch(url);
    if (!res.ok) {
        throw new error(`city not found: ${res.status}`);
    }
    else {
        const data = await res.json();
        console.log(data);

        let temprature = data.current.temp_c;
        let location = data.location.name;
        let time = data.location.localtime;
        let condition = data.current.condition.text;

        transition.classList.add("transition");
        document.querySelector(".transition").style.animationDirection = "normal";
        document.querySelector(".transition").style.transition = "deg(360)";


        setTimeout(() => {
            transition.classList.remove("transition")
        }, 2000);

        update(temprature, location, time, condition);
    }
}

function update(temprature, location, time, condition) {
    let splitdate = time.split(' ')[0];
    let splittime = time.split(' ')[1];
    let currentday = getday(new Date(splitdate).getDay());

    let temp = document.querySelector(".temp");
    temp.innerHTML = temprature + `*C`;
    let loc = document.querySelector(".location");
    loc.innerHTML = location;
    let loctime = document.querySelector(".localtime");
    loctime.innerHTML = `${splitdate} ${currentday} ${splittime}`;
    let cond = document.querySelector(".condition");
    cond.innerHTML = condition;
}

function getday(number) {
    switch (number) {
        case 0:
            return 'mon'
        case 1:
            return 'tue'
        case 2:
            return 'wed'
        case 3:
            return 'thu'
        case 4:
            return 'fri'
        case 5:
            return 'sat'
        case 6:
            return 'sun'
    }
}

