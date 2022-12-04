<script setup>
import { computed, ref } from 'vue';
import { api } from './utils/api';
const form = ref({
  term: '',
  entity: 'song',
  attribute: 'songTerm',
  media: 'music',
  limit: 50,
  offset: 0
})

const medias = computed(() => api.medias);
const attributes = computed(() => api.attributes[form.value.media] || []);
const entities = computed(() => api.entities[form.value.media] || []);

const data = ref([]);

const search = async () => {
  const f = form.value;
  const { results } = await api.search(f.term, f.media, f.entity, f.attribute, f.limit, f.offset);
  console.log(results);
  data.value = results;

}
</script>

<template>
  <div id="app" class="container-md">
    <div class="row">

      <header class="col-md-3">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="search">


              <select v-model="form.media" required class="form-control mb-2">
                <option v-for="m in medias" :value="m">{{ m }}</option>
              </select>

              <select v-model="form.entity" required class="form-control mb-2">
                <option v-for="e in entities" :value="e">{{ e }}</option>
              </select>

              <select v-model="form.attribute" required class="form-control mb-2">
                <option v-for="a in attributes" :value="a">{{ a }}</option>
              </select>

              <input type="search" v-model="form.term" class="form-control mb-2" placeholder="Search on iTunes"
                required>

              <button type="submit" class="btn btn-secondary">Enviar</button>
            </form>
          </div>
        </div>
      </header>
      <main class="col-md-9">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div v-for="a in data" class="col-md-4 col-6 mb-3">
                <div class="card rounded-lg overflow-hidden">
                  <img :src="a.artworkUrl100" alt="">
                  <div class="card-body p-1">
                    <p><strong>{{ a.artistName }}</strong></p>
                    <p>{{ a.trackCensoredName }} <br>{{ a.primaryGenreName }}</p>
                  </div>
                  <div class="card-footer p-0">
                    <audio :src="a.previewUrl" type="audio/x-m4a" controls> </audio>
                  </div>
                  <!-- <pre v-text="a"></pre> -->
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>
