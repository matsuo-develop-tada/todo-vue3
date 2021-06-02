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
  registTodo: async (createTodoDto: {
    content: string
    color_code: string
    checked: boolean
    dt_do: string
  }): Promise<Todo> => {
    return (await axios.post<Todo>(`${apiUrl}/todos`, createTodoDto)).data
  },
  delTodos: async (ids: number[]): Promise<void> => {
    return (await axios.post(`${apiUrl}/delTodos`, ids)).data
  },
  getSingleTodo: async (id: string): Promise<Todo> => {
    return (await axios.get(`${apiUrl}/getSingleTodo?id_todo=${id}`)).data
  },
  updateTodo: async (todo: Todo): Promise<void> => {
    return await axios.post(`${apiUrl}/updateTodo`, todo)
  },
}
