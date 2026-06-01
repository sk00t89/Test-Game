const roadBtn1 = document.getElementById("road-btn-1");
const roadBtn2 = document.getElementById("road-btn-2");
const roadBtn3 = document.getElementById("road-btn-3");
const roadBtn4 = document.getElementById("road-btn-4");
const roadBtn5 = document.getElementById("road-btn-5");
const roadCycleStatus = document.getElementById("road-cycle");
const roadStatus = document.getElementById("road-status");
const roadGoal = document.getElementById("roads-goal");
const navMoney = document.getElementById("nav-p");
const roadCycleBtn = document.getElementById("roadcycle-btn");
const resetBtn = document.getElementById("resetbtn");
const roadsNum = document.getElementById("roadstext");
const roadPoliBtn = document.getElementById("roadpolitic");

let currentMoney = 1;
let roadsAmount = 1;
let roadCost = 1;
let roadValueAdder = 2;

// Nästa steg:
// 1. Fixa politician så pengar dras
// 2. Hindra flera setInterval
// 3. Börja testa objektstruktur för roads
// 4. Sen kopiera/återanvänd till apartments

const updateCurrentMoney = () => {
    navMoney.innerText = `You have $${Math.floor(currentMoney)}.`;
    roadStatus.innerText = `${roadValueAdder}$ each cycle`;
    roadsNum.innerText = `Roads     ${roadsAmount}`;
    roadBtn5.innerText = `Buy ${Math.floor(currentMoney / roadCost)}`
};

updateCurrentMoney();

const buyRoads = (num) => {
    if (currentMoney < roadCost * num) {
        console.log("You dont have enough money.")
    } else {
        currentMoney -= roadCost * num;
        roadsAmount += num;
        roadValueAdder += Math.floor(roadsAmount * 2);
        roadCost += Math.floor(roadCost * 1.8);
        console.log(`btn value ${num}`);
        updateCurrentMoney();
    }
}

roadBtn1.addEventListener("click", () => {
    buyRoads(Number(roadBtn1.value));

});
roadBtn2.addEventListener("click", () => {
    buyRoads(Number(roadBtn2.value));

});
roadBtn3.addEventListener("click", () => {
    buyRoads(Number(roadBtn3.value));

});
roadBtn4.addEventListener("click", () => {
    buyRoads(Number(roadBtn4.value));

});
roadBtn5.addEventListener("click", () => {
    let maxBuys = Math.floor(currentMoney / roadCost);
    console.log(maxBuys);
    if (maxBuys >= 1 ) {
        buyRoads(Number(maxBuys));
    } else {
        console.log("Maxknapp är för lite")
    }


});

const roadCycle = () => {
    console.log("Roadcycel");
    currentMoney += roadValueAdder;
    updateCurrentMoney();
}

roadCycleBtn.addEventListener("click", () => {
    roadCycle();
});

roadPoliBtn.addEventListener("click", () => {
    if (roadPoliBtn.value > currentMoney) {
        console.log("för lite pengar för politiker")

    } else {
        setInterval(roadCycle, 2000);
        roadCycleStatus.innerText = `Cycle: 2 sec`
    }
})

resetBtn.addEventListener("click", () => {
    currentMoney = 1;
    roadsAmount = 1;
    roadCost = 1;
    roadValueAdder = 2;
    updateCurrentMoney();
})