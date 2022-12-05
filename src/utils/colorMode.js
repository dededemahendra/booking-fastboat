import { useColorMode } from "@chakra-ui/system"

export const useIsDark= ()=> {
  const {colorMode}= useColorMode()

  return colorMode=="dark"
}