import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import BootstrapVue  from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(BootstrapVue)

const client = new ApolloClient({
	uri: 'https://swapi.graph.cool/'
})

const apolloProvider = new VueApollo({
	defaultClient: client
})

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
