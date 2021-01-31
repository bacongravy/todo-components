import { useState } from "react"
import { Box, VStack } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import TodoTopBar from "./TodoTopBar"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoListItem from "./TodoListItem"
import TodoListFooter from "./TodoListFooter"
import TodoBottomBar from "./TodoBottomBar"
import TodoFilterRadioGroup from "./TodoFilterRadioGroup"
import TodoBottomText from "./TodoBottomText"
import TodoAttribution from "./TodoAttribution"

const SortableTodoList = SortableContainer(TodoList)
const SortableTodoListItem = SortableElement(TodoListItem)

const TodoApp = ({
  todos,
  addTodo,
  moveTodo,
  updateTodo,
  removeTodo,
  removeCompletedTodos,
  logout,
}) => {
  const [filterSelection, setFilterSelection] = useState("all")
  const activeCount = todos ? todos.filter((todo) => !todo.completed).length : 0
  return (
    <VStack margin="auto" paddingX="6" maxW="588px" align="stretch">
      <TodoTopBar
        as="header"
        paddingTop={{ base: "32px", md: "62px" }}
        paddingBottom={{ base: "22px", md: "28px" }}
        logout={logout}
      />
      {todos ? (
        <VStack as="main" align="stretch" spacing={{ base: "4", md: "6" }}>
          <TodoInput role="form" onCommit={addTodo} />
          <SortableTodoList
            items={todos}
            shouldCancelStart={({ target }) =>
              target.closest("label") || target.closest("button")
            }
            onSortStart={(_, e) => e.preventDefault()}
            onSortEnd={moveTodo}
            helperClass="todo-list-item-dragging"
          >
            {todos.map(({ id, text, completed }, index) => {
              return (
                ((completed && filterSelection !== "active") ||
                  (!completed && filterSelection !== "completed")) && (
                  <SortableTodoListItem
                    index={index}
                    key={id || "new"}
                    sortIndex={index}
                    text={text}
                    completed={completed}
                    onChange={updateTodo}
                    onClear={removeTodo}
                  />
                )
              )
            })}
            <TodoListFooter count={activeCount} onClear={removeCompletedTodos}>
              <TodoFilterRadioGroup
                display={{ base: "none", md: "flex" }}
                value={filterSelection}
                onChange={setFilterSelection}
              />
            </TodoListFooter>
          </SortableTodoList>
          <TodoBottomBar display={{ base: "flex", md: "none" }}>
            <TodoFilterRadioGroup
              value={filterSelection}
              onChange={setFilterSelection}
            />
          </TodoBottomBar>
          <TodoBottomText paddingTop={{ base: "7", md: "8" }} />
        </VStack>
      ) : (
        <Box height="60vh" />
      )}
      <TodoAttribution
        as="footer"
        paddingTop={{ base: "4", md: "6" }}
        paddingBottom="8"
      />
    </VStack>
  )
}

export default TodoApp
