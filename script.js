let xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0;
let currentEnemy, monHp;

const controls = document.querySelector("#controls");
const buttons = [-1, document.querySelector("#button1"), document.querySelector("#button2"), document.querySelector("#button3")];

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const coinText = document.querySelector("#coinText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHP = document.querySelector("#monsterHP");
const monsterName = document.querySelector("#monsterName");

const locations = [
    {
        name : "Town Square",
        bTexts : [-1, "Go to Merchant's District", "Go to Cave", "Fight Demon Lord"],
        bFunctions : [-1, goToMDistrict, goToCave, fightDemon],
        text : "You're currently at the middle of the Town Square. Choose what you want to do next by using the buttons above."
    },

    {
        name : "Merchant's District",
        bTexts : [-1, "Go to Store", "Go to Blacksmith", "Return to Town Square"],
        bFunctions : [-1, goToStore, goToBlacksmith, goToTown],
        text : "You've entered the Merchant's District and you see 2 buildings with the signs \"Store\" and \"Blacksmith\"."
    },

    {
        name : "Store",
        bTexts : [-1, "Buy Blessings (+10 Max HP)(-10 Coin)", "Buy 50HP Potion (-20 Coin)", "Return to Town Square"],
        bFunctions : [-1, buyBlessings, buyPotion, goToMDistrict],
        text : "You've entered the store and you saw some cool items on sale. Choose what to buy or just return to the Town Square when you're done by using the buttons above."
    },

    {
        name : "Blacksmith",
        bTexts : [-1, "Upgrade Weapon (-30 Coin)", "Downgrade Weapon (+15 Coin)", "Return to Town Square"],
        bFunctions : [-1, upgradeWeapon, downgradeWeapon, goToMDistrict],
        text : "You've entered the store and you saw some cool items on sale. Choose what to buy or just return to the Town Square when you're done by using the buttons above."
    },

    {
        name : "Cave",
        bTexts : [-1, "Fight Slime", "Fight Orc", "Return to Town Square"],
        bFunctions : [-1, fightSlime, fightOrc, goToTown],
        text : "You've entered the cave and immediately sense the presence of monsters nearby. Choose what to fight or just return to the Town Square when you're done by using the buttons above."
    },

    {
        name : "Battle",
        bTexts : [-1, "Attack", "Use Potion", "Run to Town Square"],
        bFunctions : [-1, attack, usePotion, goToTown],
        text : "You've entered a battle and are being attacked by your enemy. What do you want to do?"
    }
]

const weapons = [
    {
        name : "Stick",
        damage : 5,
        accuracy : 50
    },

    {
        name : "Dagger",
        damage : 10,
        accuracy : 60
    },

    {
        name : "Short Sword",
        damage : 15,
        accuracy : 70
    },

    {
        name : "Long Sword",
        damage : 20,
        accuracy : 80
    },

    {
        name : "Great Sword",
        damage : 25,
        accuracy : 90
    },

    {
        name : "Sacred Sword",
        damage : 30,
        accuracy : 95
    }
]

const monsters = [
    {
        name : "Slime",
        hp : 15,
        damage : 5,
        accuracy : 50,
        coin : 10,
        xp : 1
    },

    {
        name : "Orc",
        hp : 60,
        damage : 10,
        accuracy : 75,
        coin : 40,
        xp : 3
    },

    {
        name : "Demon Lord",
        hp : 400,
        damage : 40,
        accuracy : 90
    }
]

//Initialize buttons
buttons[1].onclick = goToMDistrict;
buttons[2].onclick = goToCave;
buttons[3].onclick = fightDemon;

//Util Functions
function changeLoc(loc) {
    resetButton();
    buttons[1].innerText = loc.bTexts[1];
    buttons[2].innerText = loc.bTexts[2];
    buttons[3].innerText = loc.bTexts[3];

    buttons[1].onclick = loc.bFunctions[1];
    buttons[2].onclick = loc.bFunctions[2];
    buttons[3].onclick = loc.bFunctions[3];

    text.innerText = loc.text;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetButton() {
    for (let i = 1 ; i < buttons.length; i++) {
        buttons[i].style.display = "inline-block";
    }
}

function refreshStatus() {
    hpText.innerText = hp;
    monsterHP.innerText = monHp;
    xpText.innerText = xp;
    coinText.innerText = coin;
}

function retryGame() {
    xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0, currentEnemy = -1, monHp = -1;
    refreshStatus();
    goToTown();
}

//Goto Button Functions
function goToTown() {
    monsterStats.style.display = "none";
    changeLoc(locations[0]);
}

function goToMDistrict() {
    changeLoc(locations[1]);
}

function goToStore() {
    changeLoc(locations[2]);
}

function goToBlacksmith() {
    changeLoc(locations[3]);
    if (currentWeap == (weapons.length - 1)) buttons[1].style.display = "none";
    if (currentWeap == 0) buttons[2].style.display = "none";
}

function goToCave() {
    changeLoc(locations[4]);
}

function goToBattle() {
    changeLoc(locations[5]);
    monHp = monsters[currentEnemy].hp;
    monsterStats.style.display = "block";

    monsterHP.innerText = monHp;
    monsterName.innerText = monsters[currentEnemy].name;
}

//Store Functions
function buyBlessings() {
    if (coin >= 10) {
        coin -= 10;
        hp += 10;
        maxhp += 10;

        coinText.innerText = coin;
        hpText.innerText = hp;

        text.innerText = "You've successfully increased your HP to " + hp + ". If there is nothing else you want to do here, you can return to the Town Square using the button above."

    } else {
        text.innerText = "You don't have enough coin to increase your HP. Maybe you can try going to the cave to hunt some monsters for more coins, just be careful not to hurt yourself too much though."
    }
}

function buyPotion() {
    if (coin >= 20) {
        coin -= 20;
        potCount++;

        coinText.innerText = coin;
        text.innerText = "You've successfully bought a potion. Currently, you have a total of " + potCount + " potion(s) in your inventory.";

    } else {
        text.innerText = "You don't have enough coin to buy a potion. Maybe you can try going to the cave to hunt some monsters for more coins, just be careful not to hurt yourself too much though."
    }
}

//Blacksmith Functions
function upgradeWeapon() {
    if (currentWeap == (weapons.length - 1)) {
        text.innerText = "Your weapon is already the greatest out there, maybe you can try challenging the demon lord."
    } else if (coin >= 30) {
        coin -= 30;
        coinText.innerText = coin;

        currentWeap++;
        if (currentWeap == (weapons.length - 1)) {
            buttons[1].style.display = "none";
        } else {
            buttons[1].style.display = "block";
        }

        text.innerText = "You've successfully upgraded your weapon to a " + weapons[currentWeap].name + " with " + weapons[currentWeap].damage + " attack damage! If there is nothing else you want to do here, you can return to the Town Square using the button above."
    } else {
        text.innerText = "You don't have enough coin to upgrade your weapon, maybe you can try going to the cave to hunt some monsters for more coins."
    }
}

function downgradeWeapon() {
    if (currentWeap == 0) {
        text.innerText = "Your weapon is already the worst out there, maybe you can try upgrading your weapon first."
    }

    coin += 15;
    coinText.innerText = coin;
    currentWeap--;
    if (currentWeap == 0) {
        buttons[2].style.display = "none";
    } else {
        buttons[1].style.display = "block";
    }

    text.innerText = "You've successfully downgraded your weapon to a " + weapons[currentWeap].name + " with " + weapons[currentWeap].damage + " attack damage! If there is nothing else you want to do here, you can return to the Town Square using the button above."
}

//Fight Button Functions
function fightSlime() {
    currentEnemy = 0;
    goToBattle();
}

function fightOrc() {
    currentEnemy = 1;
    goToBattle();
}

function fightDemon() {
    currentEnemy = 2;
    goToBattle();
}

//Battle Button Functions
function attack() {
    let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);
    
    if (isHit) {
        text.innerText = "The " + monsters[currentEnemy].name + " attacks you, dealing " + monsters[currentEnemy].damage + " damage to you!\n";
        hp -= monsters[currentEnemy].damage;
        if (hp <= 0){
            refreshStatus();
            lose();
            return;
        }
    } else {
        text.innerText = "The " + monsters[currentEnemy].name + "'s attack missed!\n";
    }

    isHit = (randomInt(0, 100) <= weapons[currentWeap].accuracy ? 1 : 0);
    if (!isHit) {
        text.innerText += "Your attack missed!";
    } else {
        let isCrit = randomInt(0, 1);
        let dmg = weapons[currentWeap].damage + (isCrit * (xp + 1));

        if (isCrit) {
            text.innerText += "You attack the " + monsters[currentEnemy].name + " with your " + weapons[currentWeap].name + ", dealing " + dmg + " critical damage to it!";
        } else {
            text.innerText += "You attack the " + monsters[currentEnemy].name + " with your " + weapons[currentWeap].name + ", dealing " + dmg + " damage to it!";
        }

        monHp -= dmg;
        if (monHp <= 0) killedMonster();
    }
    
    refreshStatus();
}

function usePotion() {
    if (potCount > 0) {
        potCount--;
        if (hp <= (maxhp - 50)) hp += 50;
        else hp = maxhp;

        if (potCount == 0) {
            text.innerText = "You used 1 potion succesfully, healing your HP to " + hp + "HP and emptying your potion stock.\n";
        } else {
            text.innerText = "You used 1 potion succesfully, healing your HP to " + hp + "HP and reducing your potion stock to " + potCount + ".\n";
        }

        let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);
        if (isHit) {
            text.innerText += "The " + monsters[currentEnemy].name + " attacks you, dealing " + monsters[currentEnemy].damage + " damage to you!\n";
            hp -= monsters[currentEnemy].damage;
            if (hp <= 0){
                refreshStatus();
                lose();
                return;
            }
        } else {
            text.innerText += "The " + monsters[currentEnemy].name + "'s attack missed!\n";
        }
    } else {
        text.innerText = "You don't have any potion left in your inventory...";
    }

    refreshStatus();
}

function lose() {
    text.innerText += "You died...";
    buttons[2].innerText = "Retry";
    buttons[2].onclick = retryGame;

    buttons[1].style.display = "none";
    buttons[3].style.display = "none";
    monsterStats.style.display = "none";
}

function killedMonster() {
    if (currentEnemy === (monsters.length - 1)) {
        text.innerText += "Congratulations! You've saved Fantasy Sekai and your name will forever be known as the Saviour...";
        buttons[2].innerText = "Replay";
        buttons[2].onclick = retryGame;

        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    } else {
        xp += monsters[currentEnemy].xp;
        coin += monsters[currentEnemy].coin;
        refreshStatus();

        text.innerText += ("You killed the " + monsters[currentEnemy].name + " and got "
        + monsters[currentEnemy].xp + " XP + " + monsters[currentEnemy].coin + " Coins!");
        
        buttons[2].innerText = "Return";
        buttons[2].onclick = goToCave;
        
        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    }
}