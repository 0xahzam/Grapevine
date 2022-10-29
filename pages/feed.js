import { Flex, Text, Button, Input, Image, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'

const mainapp = () => {
  return (
    <div className='main'>
    <Flex flexDir={"column"} align={"center"}> 

    <Flex top={"0"} width={"100%"} background={"#17181C"}  justifyitems={"center"} alignItems={"center"} flexDir={"row"} paddingTop={{base:"12px",md:"28px"}} paddingBottom={{base:"12px",md:"28px"}}>
    <Flex paddingLeft={{base:"20px",md:"140px"}} paddingRight={{base:"20px",md:"151px"}} justifyitems={"center"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Text color={"#DE47A5"} fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"38px"}>Grapevine</Text>
        <Text color={"white"} fontSize={{base:"13px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"19px"}>read memo</Text>
    </Flex>

    </Flex>

    <Flex flexDir={"column"} color={"white"}  marginTop={"131px"} marginBottom={"131px"}>
    <Flex width={{base:"320px",md:"533px"}}  alignItems={"center"} flexDir={"column"}>
        <Text fontSize={{base:"24px",md:"24px"}} align={"center"} fontFamily={"Syne, sans-serif"} fontWeight={"700"} size={"56px"} lineHeight={{base:"38px",md:"38px"}} width={{base:"320px",md:"540px"}}>
        Hello bionic! Welcome to grapevine. <br/>
        You will be known as 
        <span style={{color:"#DE47A5"}} > anon#8008 </span> 
        here <br/>
        (🤫 don&apos;t tell anyone)
        </Text>

        <Text paddingTop={"30px"} fontSize={"18px"} fontFamily={"DM Sans, sans-serif"}>
        To get started, drop a tea on anyone from Twitter   
        </Text>

        <InputGroup  marginTop={"16px"} width={"480px"} height={"45px"} borderRadius={"12px"}>
        <InputLeftElement children='🔎' background={"None"}/>
        <Input placeholder = "Search users by their twitter handle" />
        </InputGroup>

        <Text paddingTop={"12px"} fontSize={"14px"} color={"FFFFFF"} opacity={"45%"} fontFamily={"DM Sans, sans-serif"}>
        Your reviews will go by your anon handle.
        </Text>
    </Flex>

    <Flex width={{base:"320px",md:"533px"}} justifyitems={"center"} flexDir={"column"} marginTop={"32px"}>
    <Text fontFamily={"Syne, sans-serif"} fontWeight={"700"} fontSize={"20px"} lineHeight={"24px"}>
      Top Profiles
    </Text>

    <Flex marginTop={"24px"} gap={"8px"} flexDir={"column"}>
    <Flex background={"#17181C"} height={"64px"} borderRadius={"12px"} align={"center"} >
        <Image src='chris.png' alt='chris evans' height={"60px"} paddingLeft={"12px"} paddingTop={"8px"} paddingBottom={"8px"}/>
        <Text paddingLeft={"12px"}  fontFamily={"DM Sans, sans-serif"} fontWeight={"700"} fontSize={"16px"}>
          @somedude

        </Text>
    </Flex>

    <Flex background={"#17181C"} height={"64px"} borderRadius={"12px"} align={"center"} >
        <Image src='chris.png' alt='chris evans' height={"60px"} paddingLeft={"12px"} paddingTop={"8px"} paddingBottom={"8px"}/>
        <Text paddingLeft={"12px"}  fontFamily={"DM Sans, sans-serif"} fontWeight={"700"} fontSize={"16px"}>
          @somedude

        </Text>
    </Flex>

    <Flex background={"#17181C"} height={"64px"} borderRadius={"12px"} align={"center"} >
        <Image src='chris.png' alt='chris evans' height={"60px"} paddingLeft={"12px"} paddingTop={"8px"} paddingBottom={"8px"}/>
        <Text paddingLeft={"12px"}  fontFamily={"DM Sans, sans-serif"} fontWeight={"700"} fontSize={"16px"}>
          @somedude

        </Text>
    </Flex>

    <Flex background={"#17181C"} height={"64px"} borderRadius={"12px"} align={"center"} >
        <Image src='chris.png' alt='chris evans' height={"60px"} paddingLeft={"12px"} paddingTop={"8px"} paddingBottom={"8px"}/>
        <Text paddingLeft={"12px"}  fontFamily={"DM Sans, sans-serif"} fontWeight={"700"} fontSize={"16px"}>
          @somedude

        </Text>
    </Flex>

    </Flex>
    </Flex>

    </Flex>
    </Flex>

    </div>
  )
}

export default mainapp