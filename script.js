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

// Nästa steg:
// 1. Fixa payout/updateState
// 2. Lägg till timeoutId + clearTimeout i reset
// 3. Göra Roads mer generell
// 4. Lägga till Apartments som testkategori

const state = {
    money: 1,
    goal: 25,
    sec: false,
    producing: false,
    coins: 0,
    citizens: 0,
    bonus: 0.02,
};

const roads = {
    name: "Roads",
    amount: 1,
    earning: 2,
    timecycle: 500,
    bot: false,
    cost: 1,
    adder: 2,
    intervalId: null,
    producing: false,
    timeoutId: null,
}


const updateState = () => {
    navMoney.innerText = `You have $${Math.floor(state.money)}.`;
    roadStatus.innerText = `${roads.adder}$ each cycle`;
    roadsNum.innerText = `Roads     ${roads.amount}`;
    roadBtn5.innerText = `Buy ${Math.floor(state.money / roads.cost)}`
};

updateState();

const buyBusiness = (business, num) => {
    if (state.money < business.cost * num) {
        console.log("You dont have enough money.");
        return;
    }
    state.money -= business.cost * num;
    business.amount += num;
    business.adder += Math.floor(business.amount * 2);
    business.cost += Math.floor(business.cost * 1.8);
    console.log(`Cost for roads ${business.cost * num}`);
    updateState();
};

roadBtn1.addEventListener("click", () => {
    const value = Number(roadBtn1.value);
    buyBusiness(roads, value);

});
roadBtn2.addEventListener("click", () => {
    const value = Number(roadBtn2.value);
    buyBusiness(roads, value);

});
roadBtn3.addEventListener("click", () => {
    const value = Number(roadBtn3.value);
    buyBusiness(roads, value);

});
roadBtn4.addEventListener("click", () => {
    const value = Number(roadBtn4.value);
    buyBusiness(roads, value);

});
roadBtn5.addEventListener("click", () => {
    let maxBuys = Math.floor(state.money / roads.cost);
    console.log(maxBuys);
    if (maxBuys < 1 ) {
        console.log("Maxknapp är för lite");
        return;
    }
    buyBusiness(roads, maxBuys);
    console.log(`${maxBuys} roads bought.`)
});

const payout = (business) => {
    const money = state.money += business.adder;
    money;
    console.log(`${business.adder} added funds`)
    console.log(business.adder)
    updateState();
};

const roadCycle = () => {
    if (roads.producing) {
        console.log("You already have a roadcycle")
        return;
    }

    roadCycleBtn.disabled = true;
    roads.producing = true;

    console.log("Roadcycle started");

    roads.timeoutId = setTimeout(() => {
        payout(roads);

        roads.producing = false;
        roadCycleBtn.disabled = false;

        console.log("Roadcycle finshed");

    } , roads.timecycle);

};

roadCycleBtn.addEventListener("click", () => {
    roadCycle();
});

roadPoliBtn.addEventListener("click", () => {
    const cost = Number(roadPoliBtn.value);

    if (roads.bot === true) {
        console.log("Du har redan bot");
        return;
    } if (cost > state.money) {
        console.log("för lite pengar för politiker")
        return;
    }
        roads.intervalId = setInterval(() => payout(roads), roads.timecycle);

        roads.bot = true;
        state.money -= cost;
        roadCycleStatus.innerText = `Cycle: ${roads.timecycle / 1000} sec`
        roadPoliBtn.disabled = true;

        updateState();

});

resetBtn.addEventListener("click", () => {
    state.money = 1;
    roads.producing = false;
    clearTimeout(roads.timeoutId);
    roads.timeoutId = null;

    roads.amount = 1;
    roads.cost = 1;
    roads.adder = 2;
    roads.bot = false;

    clearInterval(roads.intervalId);
    roads.intervalId = null;

    roadCycleBtn.disabled = false;
    roadPoliBtn.disabled = false;
    roadCycleStatus.innerText = "Cycle: manual";

    updateState();
})
