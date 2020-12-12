<template>
  <div id="app">
    <Header/>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset-sm="3">
          <QuestionBox />
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
  mounted: function(){                                                          // quando App è stato creato
    fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple', {   // faccio una chiamata all'api
      method: 'get'                                                             // prendo i dati
    })
      .then((response) => {                                                     // li stampo
        console.log(response.json())
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
