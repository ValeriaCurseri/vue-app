<template>
    <div class="question-box-container">
        <b-jumbotron>
            <template #lead>
                {{ currentQuestion.question }} <!-- stampo la domanda contenuta nell'oggetto passato tramite la variabile currentQuestion da App.vue -->
            </template>
            
            <hr class="my-4">
            
            <!-- ciclo tutto l'array answers e stampo le risposte -->
            <!-- al click su una risposta memorizzo l'index e lo passo alla fz selectAnswer, che la salverà tra i data del component -->
            <b-list-group>
                <b-list-group-item 
                    v-for="(answer, index) in shuffledAnswers" 
                    :key="index"
                    @click="selectAnswer(index)" 
                    :class="[selectedIndex === index ? 'selected' : '']"
                >
                    {{ answer }}
                </b-list-group-item>
            </b-list-group>
            
            <b-button variant="primary" href="#">Submit</b-button>
            <b-button @click="next" variant="success" href="#">    <!-- al click sul btn next attivo la fz next -->
                Next
            </b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    // importo la libreria lodash per stampare le risposte in ordine casuale
    import _ from 'lodash'

    // per fare in modo che l'oggetto che passo nella variabile currentQuestion venga stampato in {{}} serve un passaggio nello script e nei props
    export default {
        props: {
            currentQuestion: Object,
            next: Function
        },
        data() {
            return {
                selectedIndex: null,        // imposto selectedIndex a null e lo sovrascrivo al click con la fz selectAnswer
                shuffledAnswers: []         // imposto un array vuoto in cui andrò a pushare le risposte in ordine casuale
            }
        },
        computed: {
            answers() {                                                     // memorizzo nella cache - una volta
                let answers = [...this.currentQuestion.incorrect_answers]   // inserisco nell'array answers tutte le risposte sbagliate
                answers.push(this.currentQuestion.correct_answer)           // inserisco nell'array answers la risposta corretta
                return answers
            }
        },
        watch: {  // se inserisco delle fz, partiranno quando la currentQuestion nei props cambierà
            currentQuestion:{                   // siccome ho inserito un oggetto
                immediate:true,                 // partirà subito
                handler() {                     // svolgendo queste fz. anche quando la currentQuestion nei props cambierà
                    this.selectedIndex = null   // imposto selectedIndex nuovamente a null così potrò sovrascriverlo di nuovo al click con la fz selectAnswer
                    this.shuffleAnswers()       // avvio la fz shuffleAnswers() che tramite shuffle riempie l'array shuffledAnswers[] con le answers in ordine casuale
                }
            }
        },
        methods: {
            selectAnswer(index) {                                                   
                this.selectedIndex = index   // sovrascrivo il valore del data selectedIndex
            },
            shuffleAnswers() {
                let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
                this.shuffledAnswers = _.shuffle(answers)   // _ appartiene alla sintassi di shuffle e l'ho importato all'inizio dello script
            }
        }
    }

</script>

<style scoped>
    .list-group {
        margin-bottom: 15px;
    }
    .list-group-item:hover{
        background-color: #eee;
        cursor: pointer;
    }
    .selected{
        background-color: lightblue;
    }
    .correct{
        background-color: green;
    }
    .incorrect{
        background-color: red;
    }
    .btn{
        margin:0 5px;
    }
</style>