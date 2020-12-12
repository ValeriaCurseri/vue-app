<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled><b>Fancy Quiz App</b></b-nav-item>
            <!-- stampo le due variabili passate in App.vue -->
            <b-nav-item disabled>Risposte corrette: {{ numCorrect }}/{{ numTotal }}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    // per fare in modo che l'oggetto che passo nel template Header da App venga stampato in {{}} serve un passaggio nello script e nei props
    export default {
        props: [
            'numCorrect',
            'numTotal'
        ],
    }

</script>