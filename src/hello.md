<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

计数是: {{ count }}

<button :class="$style.button" @click="count++">点击计数+1</button>

<style module>
.button {
  color: #000;
  font-weight: bold;
  background: #f2f2f2;
  padding: 6px 16px;
  border-radius: 4px;
  min-width: 120px;
  transition: all ease 0.1s;
}
.button:hover {
  background: rgba(0,0,0,0.1);
}
</style>