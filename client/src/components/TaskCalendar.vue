<template>
  <div class="weekDays">
    <div class="row calendar-view">
      <DayTasks v-for="day in days" :day="day" />
    </div>
  </div>
</template>

<script>
  import DayTasks from "@/components/DayTasks.vue"

  export default {
    name: "weekDays",
    props: [],
    data() {
      return {
        sunStart: false,
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      }
    },
    mounted() {
      //this.$store.dispatch('getUserTasksByUserId', this.user._id)
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {},
    components: {
      DayTasks
    }
  }
</script>

<style>
  /* .calendarRow {
    display: inline-flexbox;
  } */

  .calendar-view {
    display: grid;
    grid-template: "mon tue wed thu fri sat sun";
    /* grid-template: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday"; */
    grid-template-columns: auto;
  }

  @media screen and (max-width: 700px) {
    .calendar-view {
      grid-template: "mon"
        "tue"
        "wed"
        "thu"
        "fri"
        "sat"
        "sun";
      grid-template-rows: auto;
    }
  }


  .calendar-view.sun-start {
    grid-template: "sun mon tue wed thu fri sat";
  }

  .day {
    background: red;
    border: 1px solid blue;
    min-height: 100px;
    color: white;
  }

  .day:nth-child(even) {
    background: blue;
  }

  /* .mon {
    grid-area: mon
  }

  .tue {
    grid-area: tue
  }

  .wed {
    grid-area: wed
  }

  .thu {
    grid-area: thu
  }

  .fri {
    grid-area: fri
  }

  .sat {
    grid-area: sat
  } */
  /* 
  .sun {
    grid-area: sun
  } */
</style>