import { Flex, Text, Button, Input, Image, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react'

const mainapp = () => {
  return (
    <div className='main'>
    <Flex flexDir={"column"} align={"center"}> 

    <Flex top={"0"} width={"100%"} background={"#17181C"}  justifyitems={"center"} alignItems={"center"} flexDir={"row"} paddingTop={{base:"12px",md:"28px"}} paddingBottom={{base:"12px",md:"28px"}}>
    <Flex paddingLeft={{base:"20px",md:"140px"}} paddingRight={{base:"20px",md:"151px"}} justifyitems={"center"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Text color={"#DE47A5"} fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"38px"}>Grapevine</Text>
        <Text color={"white"} fontSize={{base:"13px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"19px"}>Profile</Text>
    </Flex>

    </Flex>

    <Flex align={"center"} marginBottom={"132px"}  color={"white"} flexDir={"column"} marginTop={{base:"80px",md:"148px"}} width={{base:"328px",md:"680px"}} borderRadius={"24px"} background={"#17181C"} >
    <Flex paddingBottom={"24px"} flexDir={"column"} width={{base:"300px",md:"632px"}}>
    <Image marginTop={"24px"} src={"cryptocunt.png"} alt={"cryptocunt"} height={"140px"} width={"140px"} border={"8px solid black"} borderRadius={"24px"}/>
    <Text marginTop={"32px"} fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>@cryptocunt</Text>
    <Text marginTop={"8px"} fontFamily={"Urbanist, sans-serif"} fontSize={{base:"16px",md:"18px"}} fontWeight={"400"}>Just your friendly neighbourhood anon</Text>
    <Textarea borderRadius={"12px"} marginTop={"32px"} border={"none"}  height={"220px"} placeholder = "Write your review here..." background={"#2C2E36"}></Textarea>
    <Flex justify={"center"}>
    <Button marginTop={{base:"24px",md:"23px"}} background={"#DE47A5"} color={"black"} fontFamily={"Syne, sans-serif"} boxShadow={"3px 3px white"} border={"1px solid black"} lineHeight={"19.2px"} paddingRight={"32px"} paddingLeft={"32px"} paddingTop={"16px"} paddingBottom={"16px"} fontSize={"16px"} fontWeight={"bold"} width={{base:"197px",md:"248px"}} height={"51px"} borderRadius={"12px"} _hover={{background: "#C297B8"}}>Publish Review</Button>
    </Flex>
    </Flex>
    </Flex>
    </Flex>

    </div>
  )
}

export default mainapp