import {
  Flex,
  Text,
  Image,
  InputGroup,
  InputLeftElement,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUserContext } from "../context/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import Link from "next/link";
import {
  SetUserInContext,
  SetUsersInContext,
} from "../context/contextFunctions";
import { logout } from "../utils/authFunctions";

const Mainapp = () => {
  const router = useRouter();
  const toast = useToast();

  const [user, loading, error] = useAuthState(auth);

  console.log(user, loading, error);
  const { contextUser, setContextUser, contextAllUsers, setContextAllUsers } =
    useUserContext();

  useEffect(() => {
    if (contextAllUsers.length == 0) {
      SetUsersInContext(setContextAllUsers);
    }
    if (!user) {
      toast({
        title: `Not authenticated. Redirecting back to home`,
        status: "info",
        isClosable: true,
        duration: 2000,
      });
      router.push("/");
    }
    if (contextUser == null && user) {
      console.log("text");
      SetUserInContext(setContextUser, user, "feed");
    }
  });
  return (
    <div className="main">
      <Flex flexDir={"column"} align={"center"}>
        <Flex
          top={"0"}
          width={"100%"}
          background={"#17181C"}
          justifyitems={"center"}
          alignItems={"center"}
          flexDir={"row"}
          paddingTop={{ base: "12px", md: "28px" }}
          paddingBottom={{ base: "12px", md: "28px" }}
        >
          <Flex
            paddingLeft={{ base: "20px", md: "140px" }}
            paddingRight={{ base: "20px", md: "151px" }}
            justifyitems={"center"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text
              color={"#DE47A5"}
              fontSize={{ base: "24px", md: "32px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"38px"}
            >
              Grapevine
            </Text>
            {contextUser && user && (
              <Menu isLazy>
                <MenuButton>
                  <Flex
                    key={contextUser.anonId}
                    background={"#17181C"}
                    height={"64px"}
                    borderRadius={"12px"}
                    align={"center"}
                  >
                    <Image
                      maxW={"40px"}
                      src={contextUser?.photoURL.replace("normal", "400x400")}
                      alt={contextUser?.name}
                      borderRadius={"50%"}
                      marginLeft={"12px"}
                      marginTop={"8px"}
                      marginBottom={"8px"}
                    />
                    <Text
                      paddingLeft={"12px"}
                      color={"white"}
                      fontFamily={"DM Sans, sans-serif"}
                      fontWeight={"700"}
                      fontSize={"16px"}
                    >
                      @{contextUser.name}
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem>
                    <Text
                      onClick={() =>
                        logout(() => {
                          router.push("/feed");
                          toast({
                            title: `Logged out successfully!`,
                            status: "info",
                            isClosable: true,
                            duration: 2000,
                          });
                        })
                      }
                      color={"white"}
                      fontSize={{ base: "13px", md: "16px" }}
                      fontFamily={"Syne, sans-serif"}
                      fontWeight={"700"}
                      lineHeight={"19px"}
                    >
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        <Flex
          flexDir={"column"}
          color={"white"}
          marginTop={{ base: "67px", md: "131px" }}
          marginBottom={"131px"}
        >
          <Flex
            width={{ base: "328px", md: "533px" }}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Text
              fontSize={{ base: "24px", md: "24px" }}
              align={"center"}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              size={"56px"}
              lineHeight={{ base: "36px", md: "38px" }}
              width={{ base: "320px", md: "540px" }}
            >
              Hello {contextUser?.name}! Welcome to grapevine. <br />
              You will be known as
              <span style={{ color: "#DE47A5" }}>
                {" "}
                anon#{contextUser?.anonId}{" "}
              </span>
              here <br />
              (🤫 don&apos;t tell anyone)
            </Text>

            <Text
              paddingTop={"30px"}
              fontSize={"18px"}
              textAlign={"center"}
              fontFamily={"DM Sans, sans-serif"}
            >
              To get started, drop a tea on anyone from Twitter
            </Text>

            <AutoComplete openOnFocus>
              <InputGroup
                width={{ base: "328px", md: "480px" }}
                marginTop={"16px"}
                marginInline={"auto"}
                height={"45px"}
                borderRadius={"12px"}
              >
                <InputLeftElement pointerEvents="none">🔎</InputLeftElement>
                <AutoCompleteInput placeholder="Search users by their twitter handle" />
              </InputGroup>
              <AutoCompleteList
                border={"1px solid white"}
                marginInline={"auto"}
              >
                {console.log(contextAllUsers, "allusers")}
                {contextAllUsers?.map((twitterUser, cid) => (
                  <Link key={cid} href={`/${twitterUser?.username}`}>
                    <AutoCompleteItem
                      key={`option-${cid}`}
                      value={twitterUser.name}
                      textTransform="capitalize"
                    >
                      {" "}
                      <Avatar
                        borderRadius={"50%"}
                        loading="lazy"
                        w="30px"
                        h="30px"
                        name={twitterUser.name}
                        src={twitterUser.photoURL.replace("normal", "400x400")}
                      />
                      <Flex flexDir="column" justifyContent={"center"}>
                        <Text ml="4" noOfLines={1}>
                          @{twitterUser.username}
                        </Text>
                      </Flex>
                    </AutoCompleteItem>
                  </Link>
                ))}
              </AutoCompleteList>
            </AutoComplete>

            <Text
              paddingTop={"12px"}
              fontSize={"14px"}
              color={"FFFFFF"}
              opacity={"45%"}
              fontFamily={"DM Sans, sans-serif"}
            >
              Your reviews will go by your anon handle.
            </Text>
          </Flex>

          <Flex
            width={{ base: "320px", md: "533px" }}
            justifyitems={"center"}
            flexDir={"column"}
            marginTop={"32px"}
          >
            <Text
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"24px"}
            >
              Top Profiles
            </Text>

            <Flex marginTop={"24px"} gap={"8px"} flexDir={"column"}>
              {contextAllUsers.slice(0, 5).map((userr, cid) => {
                return (
                  <Link key={cid} href={`/${userr?.username}`}>
                    <Flex
                      key={userr.anonId}
                      background={"#17181C"}
                      height={"64px"}
                      borderRadius={"12px"}
                      align={"center"}
                    >
                      <Image
                        maxW={"40px"}
                        src={userr.photoURL.replace("normal", "400x400")}
                        alt={userr.name}
                        borderRadius={"50%"}
                        marginLeft={"12px"}
                        marginTop={"8px"}
                        marginBottom={"8px"}
                      />
                      <Text
                        paddingLeft={"12px"}
                        fontFamily={"DM Sans, sans-serif"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                      >
                        @{userr.name}
                      </Text>
                    </Flex>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Mainapp;
