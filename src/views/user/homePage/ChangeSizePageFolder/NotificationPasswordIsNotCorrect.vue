<template>
  <span style="color: red; width: 85%; display: block; margin-left: auto">
    Password must have from 6 to 20 characters which contain at least one
    numeric digit, one uppercase and one lowercase letter</span
  >
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "NotificationPasswordIsNotCorrect",
})
export default class extends Vue {}
</script>

<style>
</style>