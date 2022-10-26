import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'


const Header = () => {
  return (
    <div>
        <Flex position={"fixed"} top={"0"} width={"100%"} background={"#17181C"}  justifyItems={"center"} alignItems={"center"} flexDir={"row"} paddingTop={{base:"12px",md:"28px"}} paddingBottom={{base:"12px",md:"28px"}}>
        <Flex paddingLeft={{base:"20px",md:"140px"}} paddingRight={{base:"20px",md:"151px"}} justifyItems={"center"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Text color={"#DE47A5"} fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"38px"}>Grapevine</Text>
        <Text color={"white"} fontSize={{base:"13px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"19px"}>read memo</Text>
        </Flex>
    </Flex>
    </div>
  )
}

export default Header