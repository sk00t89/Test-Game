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
    goal: 3,
    startAmount: 1,
    startEarning: 2,
    startAdder: 2,
    startTimecycle: 1000,
    startCost: 1,
    multiplier: 1,
    goalsTest: [5, 10, 20, 30],



    elements: {
      status: roadStatus,
      title: roadsNum,
      maxBtn: roadBtn5,
      cycleStatus: roadCycleStatus,
      cycleBtn: roadCycleBtn,
      botBtn: roadPoliBtn,
      goal: roadGoal,
    },
  },

};



const updateState = (business) => {


    navMoney.innerText = `You have $${Math.floor(state.money)}.`;
    business.elements.status.innerText = `${business.adder}$ each cycle`;
    business.elements.title.innerText = `${business.name}     ${business.amount}`;
    business.elements.maxBtn.innerText = `Buy ${Math.floor(state.money / business.cost)}`;
    business.elements.cycleStatus.innerText = `${business.timecycle / 1000} sec`;
    business.elements.goal.innerText = `${business.goal}`;
    
};

const goalTest = (business, num) => {
  for (let i = 0; i < num; i++) {
    if ( num === business.goalsTest[i+1]) {
      business.goalsTest.splice(i + 1, 1);
      business.goal = business.goalsTest[0];
    }
  }
}

const checkGoal = (business) => {


    if (business.goal >= 5 && business.amount >= 5) {
        business.timecycle = Math.floor(business.timecycle / 2)
        business.goal = 10;
        console.log("Next goal " + business.goal);
        updateState(business);
        return;
    }
    if (business.goal >= 3 && business.amount >= 3) {
        business.timecycle = business.timecycle / 2;
        business.goal = 5;
        console.log("goal met!" + business.goal);
        updateState(business);
        return;
    }
};


const buyBusiness = (business, num) => {

  for (let i = 0; i < num; i++) {

    if (state.money < business.cost) {
      console.log('You dont have enough money.');
      break;
    }
    state.money -= business.cost;
    business.amount += 1;
    business.adder += Math.floor(business.amount * 1.5);
    business.cost += Math.floor(business.cost * 1.8);

    checkGoal(business);
  }


    updateState(business);

};

// Buttons

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
    let maxBuys = Math.floor(state.money / businessesObj.roads.cost);
    console.log(maxBuys);
    if (maxBuys < 1 ) {
        console.log("Maxknapp är för lite");
        return;
    }
    buyBusiness(businessesObj.roads, maxBuys);
    console.log(`${maxBuys} roads bought.`)
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


roadCycleBtn.addEventListener("click", () => {
    runCycle(businessesObj.roads);
});

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
  business.elements.botBtn.disabled = true;

  console.log(`${business} bot started.`);
  updateState(business);


};

// Politician btn
roadPoliBtn.addEventListener("click", () => {
    const cost = Number(roadPoliBtn.value);

    hireBot(businessesObj.roads, cost);
});


// Reset Btn
resetBtn.addEventListener("click", () => {

  state.money = 1;

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
    b.goal = 3;

    b.elements.status.innerText = "Cycle: manual";
    b.elements.cycleBtn.disabled = false;
    b.elements.botBtn.disabled = false;

    updateState(b);
  });

});
