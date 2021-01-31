import update from "immutability-helper"

export function getDefaultTodos({ getId } = {}) {
  return [
    {
      ...(getId && { id: getId() }),
      text: "Complete online JavaScript course",
      completed: true,
    },
    {
      ...(getId && { id: getId() }),
      text: "Jog around the park 3x",
      completed: false,
    },
    {
      ...(getId && { id: getId() }),
      text: "10 minutes meditation",
      completed: false,
    },
    {
      ...(getId && { id: getId() }),
      text: "Read for 1 hour",
      completed: false,
    },
    {
      ...(getId && { id: getId() }),
      text: "Pick up groceries",
      completed: false,
    },
    {
      ...(getId && { id: getId() }),
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
    },
  ]
}

export function useTodos(state, { getId } = {}) {
  const [todos, setTodos] = state
  if (!todos || !setTodos) {
    const noop = () => {}
    return [todos, noop, noop, noop, noop, noop]
  }
  const addTodo = ({ text }) => {
    setTodos([
      ...todos,
      { ...(getId && { id: getId() }), text, completed: false },
    ])
  }
  const moveTodo = ({ oldIndex, newIndex }) => {
    if (newIndex !== oldIndex) {
      const newTodos = update(todos, {
        $splice: [
          [oldIndex, 1],
          [newIndex, 0, todos[oldIndex]],
        ],
      })
      setTodos(newTodos)
    }
  }
  const updateTodo = ({ index, completed }) => {
    const newTodos = [...todos]
    newTodos[index].completed = completed
    setTodos(newTodos)
  }
  const removeTodo = ({ index }) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  const removeCompletedTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }
  return {
    todos,
    addTodo,
    moveTodo,
    updateTodo,
    removeTodo,
    removeCompletedTodos,
  }
}
