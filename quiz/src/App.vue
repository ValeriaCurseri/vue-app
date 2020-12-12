<template>
  <div id="app">
    <!-- uso v-bind e attributi personalizzati per passare delle variabili ai template. passo nella variabile numCorrect il dato delle risposte date correttamente, e nella variabile numTotal il dato delle domande affrontate -->
    <Header
      :numCorrect="numCorrect" 
      :numTotal="numTotal"
    />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset-sm="3">
          <!-- uso v-bind e attributi personalizzati per passare delle variabili ai template. passo nella variabile currentQuestion l'istanza index dell'array questions, e nella variabile next la fx next -->
          <!-- v-if aggiunto perchè altrimenti funzionava ma :currentQuestion dava undefined. così ritardiamo il caricamento del box a quando l'array questions è pieno -->
          <QuestionBox
            v-if="questions.length"
            :currentQuestion="questions[index]" 
            :next="next" 
            :increment="increment"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
  name: 'App',
  components: {
    Header,
    QuestionBox
  },
  data() {              // invece di creare un'oggetto 'data' ritorno un oggetto 'data' in una funzione ES6 - necessario quando abbiamo una single page application in cui componenti richiamano dati diversi
    return {
      questions: [],  // creo un array vuoto dove andrò a inserire i dati in formato json
      index: 0,       // index delle domande, come Counter
      numCorrect: 0,  // imposto di default il contatore delle risposte corrette a 0
      numTotal: 0     // imposto di default il contatore delle domande affrontate a 0
    }
  },
  methods: {
    next(){             // incremento l'indice della domanda di 1
      this.index++
    },
    increment(isCorrect){   // parte da QuestionBox.vue
      if (isCorrect) {      // se la variabile sentinella è true e quindi la risposta selezionata è quella corretta
        this.numCorrect++   // incremento il contatore delle risposte corrette di 1
      }
      this.numTotal++       // in ogni caso, incremento il contatore delle domande affrontate di 1
    }
  },
  mounted: function(){                                                          // quando App è stato creato
    fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple', {   // faccio una chiamata all'api
      method: 'get'                                                             // prendo i dati
    })
      .then((response) => {                                                     
        return response.json()                                                  // li ottengo in formato json
      })
      .then((jsonData) => {
        this.questions = jsonData.results                                       // inserisco i dati in formato json nell'array vuoto all'interno della fz data()
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
