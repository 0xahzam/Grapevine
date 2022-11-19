import { Flex, Text, Button, Input, Image, InputGroup, InputLeftElement, ButtonGroup, IconButton, AddIcon } from '@chakra-ui/react'

const mainapp = () => {
  return (
    <div className='main'>
    <Flex flexDir={"column"} align={"center"}> 

    <Flex top={"0"} width={"100%"} background={"#17181C"}  justifyitems={"center"} alignItems={"center"} flexDir={"row"} paddingTop={{base:"12px",md:"28px"}} paddingBottom={{base:"12px",md:"28px"}}>
    <Flex paddingLeft={{base:"20px",md:"140px"}} paddingRight={{base:"20px",md:"151px"}} justifyitems={"center"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Text color={"#DE47A5"} fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"38px"}>Grapevine</Text>
        <InputGroup display={{base:"none",md:"flex"}} width={{base:"328px",md:"480px"}} marginTop={"16px"} height={"45px"} borderRadius={"12px"}>
        <InputLeftElement pointerEvents='none'>
          🔎
        </InputLeftElement>
        <Input placeholder = "Search users by their twitter handle" />
        </InputGroup>
        <Text color={"white"} fontSize={{base:"13px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} lineHeight={"19px"}>Your Profile</Text>
    </Flex>



    </Flex>

    <InputGroup display={{md:"none",base:"flex"}} width={{base:"328px",md:"480px"}} marginTop={"16px"} height={"45px"} borderRadius={"12px"}>
        <InputLeftElement pointerEvents='none'>
          🔎
        </InputLeftElement>
        <Input placeholder = "Search users by their twitter handle" />
        </InputGroup>

    <Flex marginTop={"34px"} gap={"24px"} flexDir={"column"}>
        <Flex marginBottom={"8px"} paddingBottom={"8px"} width={{base:"328px",md:"640px"}} color={"white"} background={"#17181C"} borderRadius={"24px"}>
            <Flex  paddingBottom={"8px"} marginTop={"24px"} gap={"32px"} paddingLeft={"32px"} flexDir={{base:"column",md:"row"}} >
                <Image src={"cryptocunt.png"} alt={"cryptocunt"} height={"140px"} width={"140px"} border={"8px solid black"} borderRadius={"24px"}/>
                <Flex flexDir={"column"}>
                <Text fontSize={{base:"24px",md:"32px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>@cryptocunt</Text>
                <Text marginTop={"8px"} fontFamily={"Urbanist, sans-serif"} fontSize={{base:"16px",md:"18px"}} fontWeight={"400"}>Just your friendly neighbourhood anon</Text>
                
                <ButtonGroup marginTop={"15px"} isAttached variant="ghost" width={"200px"}   borderRadius={"12px"}>
                <Button borderRadius={"8px"} _hover={{background:"DE47A5"}} height={"38px"} border={"1px solid #DE47A5"}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ☕ 12
                </Text>
                </Button>

                <Button background={"#DE47A5"} height={"38px"} _hover={{background:"DE47A5"}}>
                <Text color={"black"} fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>
                        Drop Tea
                </Text>
                </Button>
                
                </ButtonGroup>

                </Flex>
            </Flex>
            
        </Flex>

        <Flex width={{base:"328px",md:"640px"}} color={"white"} background={"#17181C"} borderRadius={"24px"} flexDir={"column"}>
            <Flex  paddingBottom={"8px"} marginTop={"24px"} gap={"32px"} paddingLeft={"32px"} flexDir={"column"} >
                <Flex flexDir={"column"}>
                <Text fontSize={{base:"16px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>👀 anon#8008</Text>
                <Text marginTop={"20px"} fontFamily={"Urbanist, sans-serif"} fontSize={{base:"16px",md:"16px"}} fontWeight={"400"}>Your review goes here</Text>
                
                

                </Flex>

                
            </Flex>

            <Flex background={"#24252B"} marginTop={"24px"} borderBottomRadius={"24px"} >
                <ButtonGroup isAttached variant="ghost" borderRadius={"12px"} justifyContent={"space-between"} width={{base:"328px",md:"640px"}} >
                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text textAlign={"center"} fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬆️ 23
                </Text>
                </Button>

                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬇️ 08
                </Text>
                </Button>

                <Button borderRadius={"8px"}height={"48px"}  width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        💬 23
                </Text>
                </Button>


                
                </ButtonGroup>
                </Flex>  
            
        </Flex>

        <Flex width={{base:"328px",md:"640px"}} color={"white"} background={"#17181C"} borderRadius={"24px"} flexDir={"column"}>
            <Flex  paddingBottom={"8px"} marginTop={"24px"} gap={"32px"} paddingLeft={"32px"} flexDir={"column"} >
                <Flex flexDir={"column"}>
                <Text fontSize={{base:"16px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>👀 anon#8008</Text>
                <Text marginTop={"20px"} fontFamily={"Urbanist, sans-serif"} fontSize={{base:"16px",md:"16px"}} fontWeight={"400"}>
                    Its a bit sad to see such tweets from leaders of top L1s. They should focus on spending more time improving their own products than shitting on Eth. That strategy worked in the noise of bull markets but now people want to see the products and the products are currently very weak.
                    </Text>
                
                

                </Flex>

                
            </Flex>

            <Flex background={"#24252B"} marginTop={"24px"} borderBottomRadius={"24px"} >
                <ButtonGroup isAttached variant="ghost" borderRadius={"12px"} justifyContent={"space-between"} width={{base:"328px",md:"640px"}} >
                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text textAlign={"center"} fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬆️ 23
                </Text>
                </Button>

                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬇️ 08
                </Text>
                </Button>

                <Button borderRadius={"8px"}height={"48px"}  width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        💬 23
                </Text>
                </Button>


                
                </ButtonGroup>
                </Flex>  
            
        </Flex>

        <Flex width={{base:"328px",md:"640px"}} color={"white"} background={"#17181C"} borderRadius={"24px"} flexDir={"column"}>
            <Flex  paddingBottom={"8px"} marginTop={"24px"} gap={"32px"} paddingLeft={"32px"} flexDir={"column"} >
                <Flex flexDir={"column"}>
                <Text fontSize={{base:"16px",md:"16px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"}>👀 anon#8008</Text>
                <Text marginTop={"20px"} fontFamily={"Urbanist, sans-serif"} fontSize={{base:"16px",md:"16px"}} fontWeight={"400"}>
                    Its a bit sad to see such tweets from leaders of top L1s. They should focus on spending more time improving their own products than shitting on Eth. That strategy worked in the noise of bull markets but now people want to see the products and the products are currently very weak.
                    </Text>
                
                

                </Flex>

                
            </Flex>

            <Flex background={"#24252B"} marginTop={"24px"} borderBottomRadius={"24px"} >
                <ButtonGroup isAttached variant="ghost" borderRadius={"12px"} justifyContent={"space-between"} width={{base:"328px",md:"640px"}} >
                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text textAlign={"center"} fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬆️ 23
                </Text>
                </Button>

                <Button borderRadius={"8px"} height={"48px"} width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        ⬇️ 08
                </Text>
                </Button>

                <Button borderRadius={"8px"}height={"48px"}  width={"213.33px"}  _hover={{background:"#24252B", color:"white"}}>
                <Text  fontSize={{base:"20px",md:"20px"}} fontFamily={"Syne, sans-serif"} fontWeight={"700"} >
                        💬 23
                </Text>
                </Button>


                
                </ButtonGroup>
                </Flex>  
            
        </Flex>




    </Flex>

    </Flex>

    </div>
  )
}

export default mainapp