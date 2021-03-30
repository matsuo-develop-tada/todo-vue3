import { Todo } from 'src/interfaces/todo.interface'
import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL

export async function getTodos(): Promise<Todo[]> {
  return (await axios.get<Todo[]>(`${apiUrl}/todos`)).data
}
