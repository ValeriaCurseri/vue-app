<template>
    <div class="question-box-container">
        <b-jumbotron>
            <template #lead>
                {{ currentQuestion.question }} <!-- stampo la domanda contenuta nell'oggetto passato tramite la variabile currentQuestion da App.vue -->
            </template>
            
            <hr class="my-4">
            
            <!-- ciclo tutto l'array answers e stampo le risposte -->
            <!-- al click su una risposta memorizzo l'index e lo passo alla fz selectAnswer, che la salverà tra i data del component -->
            <!-- invece di mettere in :class tutte le condizioni per determinare il colore di sfondo della casella, le inserisco in un metodo che richiamo in :class -->
            <b-list-group>
                <b-list-group-item 
                    v-for="(answer, index) in shuffledAnswers" 
                    :key="index"
                    @click="selectAnswer(index)" 
                    :class="answerClass(index)"
                >
                    {{ answer }}
                </b-list-group-item>
            </b-list-group>
            
            <!-- al click sul btn next attivo la fz submitAnswer che verifica se la risposta è corretta o meno -->
            <!-- il btn submit è disattivato se non ho selezionato nessuna risposta e se ho già cliccato submit-->
            <b-button 
                @click="submitAnswer" 
                variant="primary" 
                :disabled="selectedIndex === null || answered"
            >
            Submit
            </b-button>

            <!-- al click sul btn next attivo la fz next -->
            <b-button @click="next" variant="success">
                Next
            </b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    // importo la libreria lodash per stampare le risposte in ordine casuale
    import _ from 'lodash'

    // per fare in modo che l'oggetto che passo nel template currentQuestion da App venga stampato in {{}} serve un passaggio nello script e nei props
    export default {
        props: {
            currentQuestion: Object,
            next: Function,
            increment: Function
        },
        data() {
            return {
                selectedIndex: null,        // imposto selectedIndex a null e lo sovrascrivo al click con la fz selectAnswer
                correctIndex: null,         // imposto correctIndex a null e lo sovrascrivo al click con la fz shuffleAnswers
                shuffledAnswers: [],        // imposto un array vuoto in cui andrò a pushare le risposte in ordine casuale
                answered: false             // imposto la variabile answered a false. diventerà true quando una risposta verrà selezionata, nella fz submitAnswer
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
                    this.answered = false       // al next, answered rimarrà false
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
                this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer) // restituisce l'index della risposta corretta (this.currentQuestion.correct_answer) all'interno dell'array in cui le risposte sono in ordine casuale (this.shuffledAnswers)
            },
            submitAnswer(){
                let isCorrect = false                           // imposto una variabile sentinella a false
                if (this.selectedIndex === this.correctIndex) { // se l'index della risposta selezionata corrisponde all'index della risposta corretta
                    isCorrect = true                            // la variabile sentinella diventa true
                }
                this.answered = true
                this.increment(isCorrect)                       // se la variabile sentinella è true, parte la fz increment (settata tra i props, si trova in App.vue e stampa su Header.vue )
            },
            answerClass(index){
                let answerClass = ""
                if (!this.answered && this.selectedIndex === index) {
                    answerClass = 'selected'
                } else if (this.answered && this.correctIndex === index) {
                    answerClass = 'correct'
                } else if (this.answered && this.selectedIndex === index && this.selectedIndex !== this.correctIndex) {
                    answerClass = 'incorrect'
                }
                return answerClass
                //  [
                //      !answered && selectedIndex === index ? 'selected' : '',
                //      answered && correctIndex === index ? 'correct' : '',
                //      answered && selectedIndex === index && selectedIndex !== correctIndex ? 'incorrect' : ''
                //  ]
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
        background-color: lightblue!important;
    }
    .correct{
        background-color: green!important;
        color:#fff;
    }
    .incorrect{
        background-color: red!important;
        color:#fff;
    }
    .btn{
        margin:0 5px;
    }
</style>