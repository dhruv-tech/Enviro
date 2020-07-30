/*
    Written by Dhruv, JS for Loading Screen.
*/

export default {
    props: ["location"],
    data() {
      return {
      }
    },
    computed: {
        color() {
            return this.location.msg.split(" ")[0];
        }
    },
    created() {
        
    }
  };