<template>
    <div class="question-box-container">
        <b-jumbotron>
            <template #lead>
                {{ currentQuestion.question }} <!-- stampo la domanda contenuta nell'oggetto passato tramite la variabile currentQuestion da App.vue -->
            </template>
            
            <hr class="my-4">
            
            <ul>
                <!-- ciclo tutto l'array answers e stampo le risposte -->
                <li v-for="(answer, index) in answers" :key="index">{{ answer }}</li>
            </ul>
            
            <b-button variant="primary" href="#">Submit</b-button>
            <b-button @click="next" variant="success" href="#">    <!-- al click sul btn next attivo la fz next -->
                Next
            </b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    // per fare in modo che l'oggetto che passo nella variabile currentQuestion venga stampato in {{}} serve un passaggio nello script e nei props
    export default {
        props: {
            currentQuestion: Object,
            next: Function
        },
        computed: {
            answers() {                                                     // memorizzo nella cache - una volta
                let answers = [...this.currentQuestion.incorrect_answers]   // inserisco nell'array answers tutte le risposte sbagliate
                answers.push(this.currentQuestion.correct_answers)          // inserisco nell'array answers la risposta corretta
                return answers
            }
        }
    }

</script>