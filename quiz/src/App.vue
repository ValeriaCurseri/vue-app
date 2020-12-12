<template>
  <div id="app">
    <Header/>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset-sm="3">
          <!-- uso v-bind e attributi personalizzati per passare delle variabili al template. passo nella variabile currentQuestion l'istanza index dell'array questions, e nella variabile next la fx next -->
          <!-- v-if aggiunto perchè altrimenti funzionava ma :currentQuestion dava undefined. così ritardiamo il caricamento del box a quando l'array questions è pieno -->
          <QuestionBox
            v-if="questions.length"
            :currentQuestion="questions[index]" 
            :next="next"
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
      questions: [],    // creo un array vuoto dove andrò a inserire i dati in formato json
      index: 0          // index delle domande, come counter
    }
  },
  methods: {
    next(){             // incremento l'indice della domanda di 1
      this.index++
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
