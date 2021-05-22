import { Todo } from 'src/interfaces/todo.interface'
import { Color } from 'src/interfaces/color.interface'
import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL

export const requests = {
  getTodos: async (colorCode = '', dtDo = ''): Promise<Todo[]> => {
    return (await axios.get<Todo[]>(`${apiUrl}/todos?color_code=${colorCode}&dt_do=${dtDo}`)).data
  },
  getColors: async (): Promise<Color[]> => {
    return (await axios.get<Color[]>(`${apiUrl}/colors`)).data
  },
  registTodo: async (data: Todo): Promise<void> => {
    return await axios.post(`${apiUrl}/todos`, data)
  },
  delTodos: async (data: number): Promise<void> => {
    return await axios.post(`${apiUrl}/delTodos`, data)
  },
}
