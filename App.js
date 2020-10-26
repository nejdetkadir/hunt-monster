new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsStarted: false,
    attackMultiple: 15,
    specialAttackMultiple: 25,
    monsterAttackMultiple: 22,
    firstAidMultiple: 18,
    logs: [],
    log_text: {
      attack: "PLAYER ATTACK ",
      monsterAttack: "MONSTER ATTACK ",
      specialAttack: "SPECIAL PLAYER ATTACK ",
      firstAid: "FIRST AID ",
      giveUp: "PLAYER GIVE UP!",
      lose: "You lost this round. Do you want to try again?",
      win: "You win this round. Do you want to game again?"
    }
  },
  methods: {
    startGame: function() {
      this.gameIsStarted = true;
    },
    attack: function() {
      const point = Math.ceil(Math.random() * this.attackMultiple);
      this.monsterHealth -= point;
      this.addLog({turn: "player-turn", text: this.log_text.attack + point});
      this.monsterAttack();
    },
    monsterAttack: function() {
      const point = Math.ceil(Math.random() * this.monsterAttackMultiple);
      this.playerHealth -= point;
      this.addLog({turn: "monster-turn", text: this.log_text.monsterAttack + point});
    },
    specialAttack: function() {
      const point = Math.ceil(Math.random() * this.specialAttackMultiple);
      this.monsterHealth -= point;
      this.addLog({turn: "player-turn", text: this.log_text.specialAttack + point});
      this.monsterAttack();
    },
    firstAid: function() {
      const point = Math.ceil(Math.random() * this.firstAidMultiple);
      this.playerHealth += point;
      this.addLog({turn: "player-turn", text: this.log_text.firstAid + point});
      this.monsterAttack();
    },
    giveUp: function() {
      this.playerHealth = 0;
      this.addLog({turn: "player-turn", text: this.log_text.giveUp});
    },
    addLog: function(log) {
      this.logs.push(log);
    },
    gameFinish: function(type) {
      if(confirm( type === false ? this.log_text.lose : this.log_text.win)) {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.logs = [];
      }
    }
  },
  watch: {
    playerHealth: function(val) {
      if (val <= 0) {
        this.playerHealth = 0;
        this.gameFinish(false);
      } else if (val >= 100) {
        this.playerHealth = 100;
      }
    },
    monsterHealth: function(val) {
      if (val <= 0) {
        this.monsterHealth = 0;
        this.gameFinish(true);
      } else if (val >= 100) {
        this.monsterHealth = 100;
      }
    }
  },
  computed: {
    playerProgress: function() {
      return {
      width: this.playerHealth + '%'
      }
    },
    monsterProgress: function() {
      return {
        width: this.monsterHealth + '%'
      }
    }
  }
});
