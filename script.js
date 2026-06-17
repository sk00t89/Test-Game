const resetBtn = document.getElementById('resetbtn');
const navMoney = document.getElementById('nav-p');

const roadBtn1 = document.getElementById("road-btn-1");
const roadBtn2 = document.getElementById("road-btn-2");
const roadBtn3 = document.getElementById("road-btn-3");
const roadBtn4 = document.getElementById("road-btn-4");
const roadBtn5 = document.getElementById("road-btn-5");
const roadCycleStatus = document.getElementById("road-cycle");
const roadStatus = document.getElementById("road-status");
const roadGoal = document.getElementById("roads-goal");
const roadCycleBtn = document.getElementById("roadcycle-btn");
const roadsNum = document.getElementById("roadstext");
const roadPoliBtn = document.getElementById("roadpolitic");

const appBtn1 = document.getElementById("app-btn1");
const appBtn2 = document.getElementById("app-btn2");
const appBtn3 = document.getElementById("app-btn3");
const appBtn4 = document.getElementById("app-btn4");
const appBtn5 = document.getElementById("app-btn5");
const appCycleStatus = document.getElementById("app-cycle");
const appStatus = document.getElementById("app-status");
const appGoal = document.getElementById("app-goal");
const appCycleBtn = document.getElementById("app-cycle-btn");
const appsNum = document.getElementById("app-text");
const appPoliBtn = document.getElementById("app-politic");



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

const businessesObj = {
  roads: {
    name: 'Roads',
    amount: 1,
    earning: 2,
    timecycle: 1000,
    bot: false,
    cost: 1,
    adder: 2,
    intervalId: null,
    producing: false,
    timeoutId: null,
    startAmount: 1,
    startEarning: 2,
    startAdder: 2,
    startTimecycle: 1000,
    startCost: 1,
    multiplier: 1,
    goals: [5, 25, 100, 200],
    currentGoalIndex: 0,
    earningsMultiplier: 1.1,
    costMultiplier: 1.06,

    elements: {
      status: roadStatus,
      title: roadsNum,
      maxBtn: roadBtn5,
      cycleStatus: roadCycleStatus,
      cycleBtn: roadCycleBtn,
      botBtn: roadPoliBtn,
      goal: roadGoal,
      buyBtns: [
        { btn: roadBtn1, value: Number(roadBtn1.value) },
        { btn: roadBtn2, value: Number(roadBtn2.value) },
        { btn: roadBtn3, value: Number(roadBtn3.value) },
        { btn: roadBtn4, value: Number(roadBtn4.value) },
      ],
    },
  },
  apartments: {
    name: 'Apartments',
    amount: 0,
    earning: 20,
    timecycle: 3000,
    bot: false,
    cost: 500,
    adder: 9,
    intervalId: null,
    producing: false,
    timeoutId: null,
    startAmount: 0,
    startEarning: 250,
    startAdder: 9,
    startTimecycle: 3000,
    startCost: 500,
    multiplier: 1,
    goals: [5, 25, 100, 200],
    currentGoalIndex: 0,
    earningsMultiplier: 5,
    costMultiplier: 1.06,

    elements: {
      status: appStatus,
      title: appsNum,
      maxBtn: appBtn5,
      cycleStatus: appCycleStatus,
      cycleBtn: appCycleBtn,
      botBtn: appPoliBtn,
      goal: appGoal,
      buyBtns: [
        { btn: appBtn1, value: Number(appBtn1.value) },
        { btn: appBtn2, value: Number(appBtn2.value) },
        { btn: appBtn3, value: Number(appBtn3.value) },
        { btn: appBtn4, value: Number(appBtn4.value) },
      ],
    },
  },
};



const updateState = (business) => {
    const bot = business.elements.botBtn;

    business.bot || Number(bot.value) >= state.money ? bot.disabled = true : bot.disabled = false;
    business.amount < 1 ? business.elements.cycleBtn.disabled = true : business.elements.cycleBtn.disabled = false;

    business.elements.buyBtns.forEach((item) => {
      item.btn.disabled = checkMaxBuys(business) < item.value;
    });


    checkMaxBuys(business) < 1 ? business.elements.maxBtn.disabled = true : business.elements.maxBtn.disabled = false;

    navMoney.innerText = `You have $${Math.floor(state.money)}.`;
    business.elements.status.innerText = `${business.adder}$ each cycle`;
    business.elements.title.innerText = `${business.name}     ${business.amount}`;
    business.elements.maxBtn.innerText = `Buy ${checkMaxBuys(business)}`;
    business.elements.cycleStatus.innerText = `${business.timecycle / 1000} sec`;
    business.elements.goal.innerText = `${business.goals[business.currentGoalIndex]}`;
    
};



const checkGoal = (business) => {
  const currentGoal = business.goals[business.currentGoalIndex];

  if (!currentGoal) {
    console.log("all goals completed");
    return;
  }
  if (business.amount >= currentGoal) {
    business.timecycle = Math.floor(business.timecycle / 2);
    business.currentGoalIndex += 1;
    business.goal = currentGoal;
    business.multiplier += 1;

    console.log(`${business.name} reached goal ${currentGoal}`);
  }

};

const checkMaxBuys = (business) => {
  let fakeMoney = state.money;
  let maxBuys = 0;
  let cost = business.cost;

  if (cost > fakeMoney) {
    return 0;
  }
  while (fakeMoney >= cost) {
    fakeMoney -= cost;
    maxBuys += 1;
    cost = Math.ceil(cost * business.costMultiplier);


  }
  return Number(maxBuys);
};

const buyBusiness = (business, num) => {

  for (let i = 0; i < num; i++) {

    if (state.money < business.cost) {
      console.log('You dont have enough money.');
      break;
    }
    state.money -= business.cost;

    business.amount += 1;
    business.adder = Math.ceil(business.amount * business.earningsMultiplier);
    business.cost = Math.ceil(business.cost * business.costMultiplier);

    checkGoal(business);
  }


    updateState(business);

};

// Buttons roads

roadBtn1.addEventListener("click", () => {
    const value = Number(roadBtn1.value);
    buyBusiness(businessesObj.roads, value);

});
roadBtn2.addEventListener("click", () => {
    const value = Number(roadBtn2.value);
    buyBusiness(businessesObj.roads, value);

});
roadBtn3.addEventListener("click", () => {
    const value = Number(roadBtn3.value);
    buyBusiness(businessesObj.roads, value);

});
roadBtn4.addEventListener("click", () => {
    const value = Number(roadBtn4.value);
    buyBusiness(businessesObj.roads, value);

});
roadBtn5.addEventListener("click", () => {
    let maxBuys = checkMaxBuys(businessesObj.roads);

    if (maxBuys < 1 ) {
        console.log("Maxknapp är för lite");
        return;
    }
    buyBusiness(businessesObj.roads, maxBuys);
    console.log(`${maxBuys} roads bought.`)
});

roadCycleBtn.addEventListener('click', () => {
  runCycle(businessesObj.roads);
});

// Buttons Apartments

appBtn1.addEventListener('click', () => {
  const value = Number(appBtn1.value);
  buyBusiness(businessesObj.apartments, value);
});
appBtn2.addEventListener('click', () => {
  const value = Number(appBtn2.value);
  buyBusiness(businessesObj.apartments, value);
});
appBtn3.addEventListener('click', () => {
  const value = Number(appBtn3.value);
  buyBusiness(businessesObj.apartments, value);
});
appBtn4.addEventListener('click', () => {
  const value = Number(appBtn4.value);
  buyBusiness(businessesObj.apartments, value);
});
appBtn5.addEventListener('click', () => {
  let maxBuys = checkMaxBuys(businessesObj.apartments);

  if (maxBuys < 1) {
    console.log('Maxknapp är för lite');
    return;
  }
  buyBusiness(businessesObj.apartments, maxBuys);
  console.log(`${maxBuys} apartments bought.`);
});

appCycleBtn.addEventListener('click', () => {
  runCycle(businessesObj.apartments);
});


// Payout funktion
const payout = (business) => {

  const payoutAmount = business.adder * business.multiplier;

  state.money += payoutAmount;

  updateState(business);
};

// Generell cykelfunktion

const runCycle = (business) => {

  if(business.producing) {
    console.log(`Your ${business.name} is already running`);
    return;
  }

  business.elements.cycleBtn.disabled = true;
  business.producing = true;

  business.timeoutId = setTimeout(() => {
    payout(business);

    business.producing = false;
    business.elements.cycleBtn.disabled = false;

    console.log(`${business.name} finshed`);
  }, business.timecycle)

};




// Bot-funktion
const hireBot = (business, cost) => {

  if (business.bot) {
    console.log(`You already have a bot.`);
    return;
  }
  if (cost > state.money) {
    console.log(`You dont have enough money for a bot.`);
    return;
  }

  business.intervalId = setInterval(() =>
    payout(business), business.timecycle,
  );

  business.bot = true;
  state.money -= cost;


  console.log(`${business} bot started.`);
  updateState(business);


};

// Politician btn
roadPoliBtn.addEventListener("click", () => {
    const cost = Number(roadPoliBtn.value);

    hireBot(businessesObj.roads, cost);
});

// Apartment politician btn

appPoliBtn.addEventListener("click", () => {
  const cost = Number(appPoliBtn.value);

  hireBot(businessesObj.apartments, cost);
});




// Reset Btn
resetBtn.addEventListener("click", () => {

  state.money = 100000;

  Object.values(businessesObj).forEach((b) => {
    clearInterval(b.intervalId);
    clearTimeout(b.timeoutId);

    b.amount = b.startAmount;
    b.cost = b.startCost;
    b.adder = b.startAdder;
    b.timecycle = b.startTimecycle;

    b.multiplier = 1;
    b.bot = false;
    b.producing = false;
    b.intervalId = null;
    b.timeoutId = null;
    b.currentGoalIndex = 0;

    b.elements.status.innerText = "Cycle: manual";
    b.elements.cycleBtn.disabled = false;
    b.elements.botBtn.disabled = false;

    updateState(b);
  });

});
