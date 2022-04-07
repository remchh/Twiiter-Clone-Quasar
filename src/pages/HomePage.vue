<template>
  <q-page >
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQtweet"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
          class="new-qweet"
        >        
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          :disable="!newQtweet"
          class="q-mb-lg"
          no-caps
          unelevated
          rounded
          color="primary"
          label="Qtweet" 
        />
      </div>
    </div>
    <q-separator size="10px" color="grey-2" class="divider"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup(){
    const newQtweet = ref('')
    return { newQtweet }
  }
})

</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>

