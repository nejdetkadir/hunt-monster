new Vue({
  el: "#app",
  data: {
    playerHeal: 100,
    monsterHeal: 100,
    gameIsStarted: false,
    logs: []
  },
  methods: {
    startGame: function() {
      this.gameIsStarted = true;
    },
    attack: function() {
      const point = Math.ceil(Math.random() * 10);
      this.monsterHeal -= point;
      this.addLog({turn: "player-turn", text: `PLAYER ATTACK (${point})`});
      this.monsterAttack();
    },
    monsterAttack: function() {
      const point = Math.ceil(Math.random() * 10);
      this.playerHeal -= point;
      this.addLog({turn: "monster-turn", text: `MONSTER ATTACK (${point})`});
    },
    specialAttack: function() {
      const point = Math.ceil(Math.random() * 25);
      this.monsterHeal -= point;
      this.addLog({turn: "player-turn", text: `SPECIAL PLAYER ATTACK (${point})`});
      this.monsterAttack();
    },
    firstAid: function() {
      const point = Math.ceil(Math.random() * 20);
      this.playerHeal += point;
      this.addLog({turn: "player-turn", text: `FIRST AID (${point})`});
      this.monsterAttack();
    },
    giveUp: function() {
      this.playerHeal = 0;
      this.addLog({turn: "player-turn", text: 'PLAYER GIVE UP!'});
    },
    addLog: function(log) {
      this.logs.push(log);
    }
  },
  watch: {
    playerHeal: function(val) {
      if (val <= 0) {
        this.playerHeal = 0;
        if(confirm("You lost this round. Do you want to try again?")) {
          this.playerHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
        }
      } else if (val >= 100) {
        this.playerHeal = 100;
      }
    },
    monsterHeal: function(val) {
      if (val <= 0) {
        this.monsterHeal = 0;
        if(confirm("You win this round. Do you want to game again?")) {
          this.playerHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
        }
      } else if (val >= 100) {
        this.monsterHeal = 100;
      }
    }
  }
});
