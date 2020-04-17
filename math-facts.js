function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const left = [
  "admiring",
  "adoring",
  "affectionate",
  "agitated",
  "amazing",
  "angry",
  "awesome",
  "beautiful",
  "blissful",
  "bold",
  "boring",
  "brave",
  "busy",
  "charming",
  "clever",
  "cool",
  "compassionate",
  "competent",
  "confident",
  "cranky",
  "crazy",
  "dazzling",
  "determined",
  "distracted",
  "dreamy",
  "eager",
  "ecstatic",
  "elastic",
  "elated",
  "elegant",
  "eloquent",
  "epic",
  "exciting",
  "fervent",
  "festive",
  "focused",
  "friendly",
  "frosty",
  "funny",
  "gallant",
  "gifted",
  "goofy",
  "gracious",
  "great",
  "happy",
  "hardcore",
  "hopeful",
  "hungry",
  "infallible",
  "inspiring",
  "interesting",
  "intelligent",
  "jolly",
  "jovial",
  "keen",
  "kind",
  "laughing",
  "loving",
  "lucid",
  "magical",
  "mystifying",
  "modest",
  "musing",
  "nervous",
  "nice",
  "nifty",
  "nostalgic",
  "objective",
  "optimistic",
  "peaceful",
  "practical",
  "priceless",
  "quirky",
  "quizzical",
  "recursing",
  "relaxed",
  "reverent",
  "sad",
  "serene",
  "sharp",
  "silly",
  "sleepy",
  "stoic",
  "strange",
  "stupefied",
  "suspicious",
  "sweet",
  "tender",
  "thirsty",
  "trusting",
  "unruffled",
  "upbeat",
  "vibrant",
  "vigilant",
  "vigorous",
  "wizardly",
  "wonderful",
  "youthful",
  "zealous",
  "zen",
]

const right = [
  "Mario",
  "Link",
  "Master Chief",
  "Solid Snake",
  "Cloud Strife",
  "PAC-Man",
  "Lara Croft",
  "Gordon Freeman",
  "Kratos",
  "Sonic",
  "Crash",
  "“Soap” MacTavish",
  "Nico Bellic",
  "Samus Aran",
  "Ratchet",
  "Nathan Drake",
  "Captain Price",
  "Kirby",
  "Marcus Fenix",
  "Pikachu",
  "Yoshi",
  "“CJ” Johnson",
  "Mega Man",
  "Sam Fisher",
  "Shadow",
  "Jak",
  "Duke Nukem",
  "Dante",
  "Naruto",
  "Altair",
  "Zelda",
  "Sephiroth",
  "Donkey Kong",
  "Ezio",
  "Leon S",
  "Ash Ketchum",
  "Guybrush Threepwood",
  "Spyro",
  "“Ghost” Riley",
  "Goku",
  "Max Payne",
  "Jill Valentine",
  "Princess Peach",
  "Larry Laffer",
  "Augustus Cole",
  "Bowser",
  "Eddie Riggs",
  "Ryu",
  "Sackboy",
]

const words = [

]

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
    studyMode: false,
    showAnswer: false,
    streak: 0,
    highScore: 0,
    skipsAllowed: 3,
    skipsRemaining: 3,
    feedbackModulus: generateRandomInt(5, 9),
    feedback: null,
    answerVisible: false, // lets us know if the answer is on screen for clicking/arrow through facts
    enableSounds: false,
  },
  methods: {
    generateFacts: function () {
      const range = this.$refs.slider.noUiSlider.get().map(fact => parseInt(fact))
      let newFacts = [generateRandomInt(range[0], range[1]), generateRandomInt(range[0], range[1])].sort((a, b) => (a - b)).reverse();
      if (JSON.stringify(newFacts) == this.facts) {
        newFacts = [generateRandomInt(range[0], range[1]), generateRandomInt(range[0], range[1])].sort((a, b) => (a - b)).reverse();
      }
      this.facts = newFacts;

      // Let display answer determine what to render
      this.displayAnswer();
    },
    displayAnswer: function () {
      // If using this to study they may want to show answer
      if (this.studyMode && this.showAnswer) {
        this.answer = this.getAnswer();
        this.answerVisible = true;
      } else {
        this.answer = null;
        this.answerVisible = false;
      }
    },
    getAnswer: function () {
      return this.facts.reduce((m, n) => m * n);
    },
    resetStreak: function () {
      this.streak = 0;
      this.skipsRemaining = this.skipsAllowed;
    },
    setStreak: function () {
      this.streak = this.streak + 1;
      if (this.streak > this.highScore) {
        this.highScore = this.streak;
      }
      // If they hit the feedback 
      if ((this.streak % this.feedbackModulus) === 0) {
        const leftRandom = generateRandomInt(0, left.length - 1);
        const rightRandom = generateRandomInt(0, right.length - 1);
        this.feedback = `${left[leftRandom].toLowerCase()} ${right[rightRandom].toLowerCase()}`;

        // Make it interesting by randomizing this around more
        this.feedbackModulus = generateRandomInt(5, 9);

        setTimeout(function () {
          this.feedback = null
        }.bind(this), 4000);
      }
    },
    skipFact: function () {
      if (this.skipsRemaining > 0) {
        this.skipsRemaining = this.skipsRemaining - 1;
        this.generateFacts();
        this.answer = null;
      }
    },
    validate: function () {
      const answer = this.getAnswer();
      if (answer === parseInt(this.answer)) {
        // Great Job!
        this.isIncorrect = false;
        this.answer = null;
        this.generateFacts();
        this.setStreak();
      } else {
        // Lets keep trying...

        // If already incorrect lets not spam the state and let animation stick around
        if (!this.isIncorrect) {
          this.isIncorrect = true;
        }
        this.answer = null;
        this.resetStreak();
      }
    },
    toggleStudyMode: function () {

      const enableStudyMode = function () {
        this.displayAnswer();

        this.resetStreak();
      }.bind(this);

      if (this.studyMode) {
        // Lets not be jerks and clear a high score, thats just mean..
        // Check and see if they really want to
        if (this.streak > 0 && this.streak === this.highScore) {
          swal({
            title: "Hold On!",
            text: "You are on a hot streak! \n Quitting now will stop your streak, are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((resetStreak) => {
            if (resetStreak) {
              enableStudyMode();
            } else {
              // Keep this mode disabled
              this.studyMode = false;
              this.generateFacts();
            }
          })
        } else {
          enableStudyMode();
        }

      } else {
        this.generateFacts();
      }

    },
    toggleShowAnswer: function () {
      if (this.showAnswer) {

      }
      console.log(`set to ${this.showAnswer}`)
    },
    factsHandler: function () {
      if (this.studyMode) {
        // Alright we are in study mode and there are two paths
        // 1. Always show answers is enabled and we can just generate and be happy
        // 2. It is NOT enabled and we need to do a pattern along the lines of
        // generate -> show answer -> generate next -> answer -> repeat
        if (this.showAnswer) {
          // This is the step 1 scenario
          this.generateFacts();
        } else {
          // This is the step 2 scenario
          if (this.answer === null) {
            this.answer = this.getAnswer();
          } else {
            this.generateFacts();
          }

        }
      }
    },
    onKeydown: function (event) {
      const key = event.which || event.keyCode;
      console.log(event);
      // Look for right arrow key
      if (key === 39) {
        if (this.studyMode) {
          this.factsHandler()
        } else {
          this.skipFact();
        }
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

    document.addEventListener("keydown", this.onKeydown)

    this.generateFacts()

  },
  destroyed() {
    document.removeEventListener("keydown", this.onKeydown)
  }
})

