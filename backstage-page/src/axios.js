import axios from 'axios'
import Vue from 'vue'

const env = process.env.NODE_ENV 
let baseURL = env == 'development' ? '/api' : '/'

const instance = axios.create({
    baseURL,
    timeout: 10000,
})

const xhr = {

}

Vue.prototype.$axios = xhr