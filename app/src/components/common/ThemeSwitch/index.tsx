import {Button, IconButton, useColorMode} from "@chakra-ui/react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import {useEffect, useState} from "react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [themeIcon, setThemeIcon] = useState(false);
  
  useEffect(() => {
    if (colorMode === "light") {
      setThemeIcon(true);
    } else {
      setThemeIcon(false);
    }
  }, [colorMode])
  
  return (
    <header>
      <IconButton onClick={toggleColorMode} aria-label='switch theme' icon={themeIcon ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </IconButton>
    </header>
  )
}

export default Index;