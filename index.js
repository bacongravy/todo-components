import { RecipeBuilder, paths } from "@blitzjs/installer"
import { join } from "path"
import j from "jscodeshift"

export default RecipeBuilder()
  .setName("Todo Components")
  .setDescription("Some components for building a todo app")
  .setOwner("David Kramer <bacongravy@icloud.com>")
  .setRepoLink("https://github.com/bacongravy/todo-components")
  .addAddDependenciesStep({
    stepId: "addDeps",
    stepName: "npm dependencies",
    explanation: `Installs the dependencies needed by the todo components`,
    packages: [
      { name: "focus-visible", version: "5.2.0" },
      { name: "immutability-helper", version: "3.1.1" },
      { name: "react-sortable-hoc", version: "1.11.0" },
      { name: "uuid", version: "8.3.2" },
    ],
  })
  .addNewFilesStep({
    stepId: "addComponents",
    stepName: "Components",
    explanation: `Adds the todo components to the project`,
    targetDirectory: "./app/todo/components",
    templatePath: join(__dirname, "app", "src", "todo", "components"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addHooks",
    stepName: "Hooks",
    explanation: `Adds the todo hooks to the project`,
    targetDirectory: "./app/todo/hooks",
    templatePath: join(__dirname, "app", "src", "todo", "hooks"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addTheme",
    stepName: "Theme",
    explanation: `Adds the todo theme to the project`,
    targetDirectory: "./app/todo/theme",
    templatePath: join(__dirname, "app", "src", "todo", "theme"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addAssets",
    stepName: "Assets",
    explanation: `Adds the assets that the todo components and theme depend upon`,
    targetDirectory: "./public",
    templatePath: join(__dirname, "app", "assets"),
    templateValues: {},
  })
  .addTransformFilesStep({
    stepId: "linkToFont",
    stepName: "Link to font",
    explanation: `Modifies _document.tsx to link to Josefin Sans`,
    singleFileSearch: paths.document(),
    transform(program) {
      const newElements = []
      const preconnectAttrs = {
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
      }
      const preconnectElements = findElements(program, "link", preconnectAttrs)
      if (preconnectElements.length === 0) {
        newElements.push("\n", createElement("link", preconnectAttrs))
      }
      const stylesheetAttrs = {
        href:
          "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap",
        rel: "stylesheet",
      }
      const stylesheetElements = findElements(program, "link", stylesheetAttrs)
      if (stylesheetElements.length === 0) {
        newElements.push("\n", createElement("link", stylesheetAttrs))
      }
      return newElements.length === 0
        ? program
        : program.findJSXElements("DocumentHead").at(0).insertAfter(newElements)
    },
  })
  .build()

const createElement = (name, attrs) =>
  j.jsxElement(
    j.jsxOpeningElement(
      j.jsxIdentifier(name),
      Object.entries(attrs).map(([key, value]) =>
        j.jsxAttribute(j.jsxIdentifier(key), j.literal(value)),
      ),
      true,
    ),
    null,
    [],
  )

const findElements = (program, name, attrs) =>
  program
    .findJSXElements(name)
    .filter((path, i) => hasMatchingAttributes(path.node.openingElement, attrs))

const hasMatchingAttribute = (element, key, value) =>
  element.attributes.find((attr) => {
    return attr.name.name === key && attr.value.value === value
  })

const hasMatchingAttributes = (element, attrs) =>
  Object.entries(attrs).every(([key, value]) =>
    hasMatchingAttribute(element, key, value),
  )
