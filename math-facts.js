function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.component('stopwatch', {
  data: function () {
    return {
      time: '00:00:00.000',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      clock: {
        time: "00:00:00.000"
      }
    }
  },
  methods: {
    start: function () {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
    },
    stop: function () {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    reset: function () {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.clock.time = "00:00:00.000";
    },
    zeroPrefix: function (num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    clockRunning: function () {
      var currentTime = new Date()
        , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

      this.clock.time =
        this.zeroPrefix(hour, 2) + ":" +
        this.zeroPrefix(min, 2) + ":" +
        this.zeroPrefix(sec, 2) + "." +
        this.zeroPrefix(ms, 3);
    }
  },
  template: `
    <div class="stopwatch">
      <div class="grey-text lighten-4">HH MM SS MS</div>
      <span class="time">{{ clock.time }}</span>
      <br />   
      <div class="btn-container">
        <a id="start" v-on:click="start">Start</a>
        <a id="stop" v-on:click="stop">Stop</a>
        <a id="reset" v-on:click="reset">Reset</a>
      </div>
    </div>
  `
})

var app = new Vue({
  el: '#math-app',
  data: {
    message: 'Hello Vue!',
    slider: {
      min: 0,
      max: 20,
      startMin: 1,
      startMax: 10,
      step: 1
    },
    facts: [],
    answer: null,
    isIncorrect: false,
    showAnswer: false,
  },
  methods: {
    generateFacts: function () {
      const range = this.$refs.slider.noUiSlider.get().map(fact => parseInt(fact))
      this.facts = [generateRandomInt(range[0], range[1]), generateRandomInt(range[0], range[1])].sort((a, b) => (a - b)).reverse();

      // If using this to study they may want to show answer
      if (this.showAnswer) {
        this.answer = this.facts.reduce((m, n) => m * n);
      }
    },
    validate: function () {
      const answer = this.facts.reduce((m, n) => m * n);
      console.log(`actual answer ${answer} => user answer ${this.answer}`)
      if (answer === parseInt(this.answer)) {
        // Great Job!
        this.isIncorrect = false;
        this.answer = null;
        this.generateFacts();
      } else {
        // Lets keep trying...
        this.isIncorrect = true;
      }
      console.log(`actual answer ${answer} => user answer ${this.answer}`, this.isIncorrect, this.answer)
    },
    toggleShowAnswer: function () {
      console.log('hit')
      if (this.showAnswer) {
        this.answer = this.facts.reduce((m, n) => m * n);
      }
    },
    factsHandler: function () {
      if (this.showAnswer) {
        // They probably are looking to proceed to next set of facts
        this.generateFacts();
      }
    }
  },
  mounted: function () {
    noUiSlider.create(this.$refs.slider, {
      start: [this.slider.startMin, this.slider.startMax],
      step: this.slider.step,
      connect: true,
      range: {
        'min': this.slider.min,
        'max': this.slider.max
      },
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    });

    this.$refs.slider.noUiSlider.on('update', (values, handle) => {
      this[handle ? 'maxRange' : 'minRange'] = parseInt(values[handle]);
    });

    this.generateFacts()
  }
})

