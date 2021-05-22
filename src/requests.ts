import { Todo } from 'src/interfaces/todo.interface'
import { Color } from 'src/interfaces/color.interface'
import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL

export const requests = {
  getTodos: async (): Promise<Todo[]> => {
    return (await axios.get<Todo[]>(`${apiUrl}/todos`)).data
  },
  getColors: async (): Promise<Color[]> => {
    return (await axios.get<Color[]>(`${apiUrl}/colors`)).data
  },
  registTodo: async (data: Todo): Promise<Todo> => {
    return await axios.post(`${apiUrl}/todos`, data)
  },
  delTodos: async (data: number): Promise<void> => {
    return await axios.post(`${apiUrl}/delTodos`, data)
  },
}
