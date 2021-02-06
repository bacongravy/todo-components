import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import TodoTheme from "./todo/theme"
import TodoApp from "./todo/components/TodoApp"
import TodoBackground from "./todo/components/TodoBackground"
import { useTodos, getDefaultTodos } from "./todo/hooks/useTodos"
import { useLocalState } from "./todo/hooks/useLocalState"

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
