new Vue({
  el: "#app",
  data: {
    playerHeal: 100,
    monsterHeal: 100,
    gameIsStarted: false
  },
  methods: {
    startGame: function() {
      this.gameIsStarted = true;
    },
    attack: function() {
      const point = Math.ceil(Math.random() * 10);
      this.monsterHeal -= point;
      this.monsterAttack();
    },
    monsterAttack: function() {
      const point = Math.ceil(Math.random() * 10);
      this.playerHeal -= point;

    },
    specialAttack: function() {
      const point = Math.ceil(Math.random() * 25);
      this.monsterHeal -= point;
      this.monsterAttack();
    },
    firstAid: function() {
      const point = Math.ceil(Math.random() * 20);
      this.playerHeal += point;
      this.monsterAttack();
    },
    giveUp: function() {
      this.playerHeal = 0;
    }
  },
  watch: {
    playerHeal: function(val) {
      if (val <= 0) {
        this.playerHeal = 0;
      } else if (val >= 100) {
        this.playerHeal = 100;
      }
    },
    monsterHeal: function(val) {
      if (val <= 0) {
        this.monsterHeal = 0;
      } else if (val >= 100) {
        this.monsterHeal = 100;
      }
    }
  }
});
