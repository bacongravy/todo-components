import { Button, Heading, HStack, Icon, useColorMode } from "@chakra-ui/react"
import { FiLogOut } from "react-icons/fi"
import MoonIcon from "./MoonIcon"
import SunIcon from "./SunIcon"

const TodoTopBar = ({ logout, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === "light" ? MoonIcon : SunIcon
  return (
    <HStack width="100%" justifyContent="space-between" {...rest}>
      <Heading
        paddingTop="1"
        as="h1"
        fontSize={{ base: "26px", md: "40px" }}
        fontWeight="bold"
        color="white"
        letterSpacing={{ base: "11px", md: "15px" }}
      >
        TODO
      </Heading>
      <HStack spacing="4">
        <Button
          aria-label="Toggle color mode"
          variant="unstyled"
          minW=""
          onClick={toggleColorMode}
        >
          <ColorModeIcon
            display="inline-block"
            boxSize={{ base: "20px", md: "25px" }}
            marginBottom="1"
          />
        </Button>
        <Button aria-label="Logout" variant="unstyled" minW="" onClick={logout}>
          <Icon
            as={FiLogOut}
            display="inline-block"
            boxSize={{ base: "22px", md: "28px" }}
            marginBottom="1.5px"
            color={"white"}
          />
        </Button>
      </HStack>
    </HStack>
  )
}

export default TodoTopBar
