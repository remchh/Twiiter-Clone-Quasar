<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
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
            @click="addNewQtweet"
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
        <q-list separator>
          <transition-group
            appear
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
            >
            <q-item
                class="q-py-md"
                v-for="qtweet in qtweets"
                :key="qtweet.date">
              <q-item-section avatar top>
                <q-avatar size="xl">
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1" >
                  <strong>Ghost Shell</strong>
                  <span class="text-grey-7"> 
                    ghost__shell2022
                    <br class="lt-md">&bull; {{ relativeDate(qtweet.date) }}
                  </span>
                </q-item-label>
                <q-item-label class="qtweet-content text-body1">
                  {{qtweet.content}}
                </q-item-label>
                <div class="row justify-between q-mt-sm qtweet-icons ">
                  <q-btn size='sm' flat round color="grey" icon="far fa-comment" />
                  <q-btn size='sm' flat round color="grey" icon="fas fa-retweet" />
                  <q-btn size='sm' flat round color="grey" icon="far fa-heart" />
                  <q-btn
                    size='sm'
                    flat
                    round
                    color="grey"
                    icon="fas fa-trash"
                    @click="deleteQtweet(qtweet)" />
                </div>
              </q-item-section>
            </q-item>
          </transition-group > 
        </q-list>   
    </q-scroll-area> 
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup(){
    const newQtweet = ref('')
    const qtweets = ref([
      {content: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.', date: 1649561350768},
      {content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.', date: 1649561360735}
    ])
    const addNewQtweet = () => {
      let newQtweetContent = {
        content: newQtweet.value,
        date: Date.now()
      }
      qtweets.value.unshift(newQtweetContent)
      newQtweet.value = ''
    }
    const deleteQtweet = qtweet => {
      let dateToDelete = qtweet.date
      let index = qtweets.value.findIndex(qtweet => qtweet.date === dateToDelete)
      qtweets.value.splice(index, 1)
    }
    const relativeDate = (value) => {
      return formatDistance(value, new Date())
    }
    return { newQtweet, qtweets, relativeDate, addNewQtweet, deleteQtweet }
  },
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
.qtweet-content
  white-space: pre-line
.qtweet-icons
  margin-left: -5px

</style>

