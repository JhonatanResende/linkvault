import axios from 'axios'

// Cria uma instância do axios já configurada
// com o endereço base da nossa API
const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export default api