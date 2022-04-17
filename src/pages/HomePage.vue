<template>
  <q-page class='relative-position'>
    <q-scroll-area class='absolute full-width full-height'>
      <div class='q-py-lg q-px-md row items-end q-col-gutter-md'>
        <div class='col'>
          <q-input
            bottom-slots
            v-model='newQtweet'
            placeholder="What's happening?"
            counter
            maxlength='280'
            autogrow
            class='new-qweet'
          >        
          <template v-slot:before>
            <q-avatar size='xl'>
              <img src='https://cdn.quasar.dev/img/avatar5.jpg'>
            </q-avatar>
          </template>
          </q-input>
        </div>
        <div class='col col-shrink'>
          <q-btn
            @click='addNewQtweet'
            :disable='!newQtweet'
            class='q-mb-lg'
            no-caps
            unelevated
            rounded
            color='primary'
            label='Qtweet' 
          />
        </div>
      </div>
        <q-separator size='10px' color='grey-2' class='divider'/>
        <q-list separator>
          <transition-group
            appear
            enter-active-class='animated fadeIn slow'
            leave-active-class='animated fadeOut slow'
            >
            <q-item
                class='q-py-md'
                v-for='qtweet in qtweets'
                :key='qtweet.id'>
              <q-item-section avatar top>
                <q-avatar size='xl'>
                  <img src='https://cdn.quasar.dev/img/avatar5.jpg'>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class='text-subtitle1' >
                  <strong>Ghost Shell</strong>
                  <span class='text-grey-7'> 
                    ghost__shell2022
                    <br class='lt-md'>&bull; {{ relativeDate(qtweet.date) }}
                  </span>
                </q-item-label>
                <q-item-label class='qtweet-content text-body1'>
                  {{qtweet.content}}
                </q-item-label>
                <div class='row justify-between q-mt-sm qtweet-icons '>
                  <q-btn size='sm' flat round color='grey' icon='far fa-comment' />
                  <q-btn size='sm' flat round color='grey' icon='fas fa-retweet' />
                  <q-btn
                    size='sm'
                    flat
                    round
                    :color="qtweet.liked ? 'pink' : 'grey'"
                    :icon="qtweet.liked ? 'fas fa-heart' : 'far fa-heart'" 
                    @click='toggleLiked(qtweet)'/>
                  <q-btn
                    size='sm'
                    flat
                    round
                    color='grey'
                    icon='fas fa-trash'
                    @click='deleteQtweet(qtweet)' />
                </div>
              </q-item-section>
            </q-item>
          </transition-group > 
        </q-list>   
    </q-scroll-area> 
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup(){
    const newQtweet = ref('')
    const qtweets = ref([
      /**{
        id: 'ID1',
        content: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.', 
        date: 1649561350768,
        liked: true
      },
      {
        id: 'ID2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
        date: 1649561360735,
        liked: false
      }**/
    ])
    const addNewQtweet = () => {
      let newQtweetContent = {
        content: newQtweet.value,
        date: Date.now(),
        liked: false
      }
      db.collection('qtweets').add(newQtweetContent).then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
      //qtweets.value.unshift(newQtweetContent)
      newQtweet.value = ''
    }
    const deleteQtweet = qtweet => {
      //let dateToDelete = qtweet.date
      //let index = qtweets.value.findIndex(qtweet => qtweet.date === dateToDelete)
      //qtweets.value.splice(index, 1)
      db.collection('qtweets').doc(qtweet.id).delete().then(() => {
      console.log('Document successfully deleted!')
      }).catch((error) => {
          console.error('Error removing document: ', error)
      })
    }
    const relativeDate = (value) => {
      return formatDistance(value, new Date())
    }
    const toggleLiked = qtweet => {
      db.collection('qtweets').doc(qtweet.id).update({
          liked: !qtweet.liked
      }).then(() => {
          console.log('Document successfully updated!')
      }).catch((error) => {
          console.error('Error updating document: ', error)
      })
    }
    return { newQtweet, qtweets, relativeDate, addNewQtweet, deleteQtweet, toggleLiked }
  },
  //onSnapshot will be fired when que made a change to our collection
  mounted(){
    db.collection('qtweets').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            let qtweetChange = change.doc.data()
            qtweetChange.id = change.doc.id
            if (change.type === 'added') {
                console.log('New qtweet: ', qtweetChange )
                this.qtweets.unshift(qtweetChange)
            }
            if (change.type === 'modified') {
                console.log('Modified qtweet: ', qtweetChange )
                let index = this.qtweets.findIndex(qtweet => qtweet.id === qtweetChange.id)
                Object.assign(this.qtweets[index], qtweetChange)
            }
            if (change.type === 'removed') {
                console.log('Removed qtweet: ', qtweetChange )
                let index = this.qtweets.findIndex(qtweet => qtweet.id === qtweetChange.id)
                this.qtweets.splice(index, 1)
            }
        })
    })
  }
})

</script>

<style lang='sass'>
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

