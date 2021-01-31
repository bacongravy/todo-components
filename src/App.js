import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import TodoTheme from "./todos/theme"
import TodoApp from "./todos/components/TodoApp"
import TodoBackground from "./todos/components/TodoBackground"
import { useTodos, getDefaultTodos } from "./todos/hooks/useTodos"
import { useLocalState } from "./todos/hooks/useLocalState"

const DEFAULT_TODOS = getDefaultTodos({ getId: uuidv4 })

const App = () => {
  // const state = useState(DEFAULT_TODOS)
  const state = useLocalState("todos", DEFAULT_TODOS)
  const todos = useTodos(state, { getId: uuidv4 })
  return (
    <ChakraProvider theme={extendTheme(TodoTheme)}>
      <TodoBackground>
        <TodoApp {...todos} />
      </TodoBackground>
    </ChakraProvider>
  )
}

export default App
