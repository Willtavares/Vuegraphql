<template>
  <div>
    <div>{{detailName}} - {{detailEyes}}</div>
    <div />
  </div>
</template>


<script>
export default {
  name: "Personagem",

  props: {
    detailName: {
      type: String,
    },
    detailEyes: {
      type: String,
    },
  },
};
</script>