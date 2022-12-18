import {
  Flex,
  Text,
  Button,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
  IconButton,
  AddIcon,
} from "@chakra-ui/react";
import { useUserContext } from "../context/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;
  const [user, loading, error] = useAuthState(auth);
  const {
    contextAllUsers,
    setContextAllUsers,
    contextReviews,
    setContextReviews,
  } = useUserContext();

  useEffect(() => {
    if (contextAllUsers.length == 0) {
      (async () => {
        console.log("user in auth user");
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot, "querySnapshot");
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setContextAllUsers(arr);
      })();
    }
    if (contextReviews.length == 0) {
      (async () => {
        const q = query(collection(db, "teas"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot, "querySnapshot");
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setContextReviews(arr);
      })();
    }
  }, []);
  console.log(contextReviews);
  const currentUser = contextAllUsers.find((e) => e.username == userName);
  console.log(contextAllUsers, currentUser);
  // https://pbs.twimg.com/profile_images/1579465833226522624/aZIswO-u_normal.png
  // https://pbs.twimg.com/profile_images/1579465833226522624/aZIswO-u_400x400.png

  //https://pbs.twimg.com/profile_images/1601791824116731904/-gTOIEEz_normal.jpg
  // https://pbs.twimg.com/profile_images/1601791824116731904/-gTOIEEz_400x400.jpg

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
            <InputGroup
              display={{ base: "none", md: "flex" }}
              width={{ base: "328px", md: "480px" }}
              marginTop={"16px"}
              height={"45px"}
              borderRadius={"12px"}
            >
              <InputLeftElement pointerEvents="none">🔎</InputLeftElement>
              <Input placeholder="Search users by their twitter handle" />
            </InputGroup>
            <Text
              color={"white"}
              fontSize={{ base: "13px", md: "16px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"19px"}
            >
              Your Profile
            </Text>
          </Flex>
        </Flex>

        <InputGroup
          display={{ md: "none", base: "flex" }}
          width={{ base: "328px", md: "480px" }}
          marginTop={"16px"}
          height={"45px"}
          borderRadius={"12px"}
        >
          <InputLeftElement pointerEvents="none">🔎</InputLeftElement>
          <Input placeholder="Search users by their twitter handle" />
        </InputGroup>

        <Flex marginTop={"34px"} gap={"24px"} flexDir={"column"}>
          <Flex
            marginBottom={"8px"}
            paddingBottom={"8px"}
            width={{ base: "328px", md: "640px" }}
            color={"white"}
            background={"#17181C"}
            borderRadius={"24px"}
          >
            <Flex
              paddingBottom={"8px"}
              marginTop={"24px"}
              gap={"32px"}
              paddingLeft={"32px"}
              flexDir={{ base: "column", md: "row" }}
            >
              <Image
                src={currentUser?.photoURL.replace("normal", "400x400")}
                alt={currentUser?.name}
                height={"140px"}
                width={"140px"}
                border={"8px solid black"}
                borderRadius={"24px"}
              />
              <Flex flexDir={"column"}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  fontFamily={"Syne, sans-serif"}
                  fontWeight={"700"}
                >
                  @{currentUser?.username}
                </Text>
                <Text
                  marginTop={"8px"}
                  fontFamily={"Urbanist, sans-serif"}
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight={"400"}
                >
                  Just your friendly neighbourhood anon
                </Text>

                <ButtonGroup
                  marginTop={"15px"}
                  isAttached
                  variant="ghost"
                  width={"200px"}
                  borderRadius={"12px"}
                >
                  <Button
                    borderRadius={"8px"}
                    _hover={{ background: "DE47A5" }}
                    height={"38px"}
                    border={"1px solid #DE47A5"}
                  >
                    <Text
                      fontSize={{ base: "20px", md: "20px" }}
                      fontFamily={"Syne, sans-serif"}
                      fontWeight={"700"}
                    >
                      ☕ {contextReviews.length}
                    </Text>
                  </Button>

                  <Button
                    background={"#DE47A5"}
                    height={"38px"}
                    _hover={{ background: "DE47A5" }}
                  >
                    <Text
                      color={"black"}
                      fontSize={{ base: "20px", md: "20px" }}
                      fontFamily={"Syne, sans-serif"}
                      fontWeight={"700"}
                    >
                      Drop Tea
                    </Text>
                  </Button>
                </ButtonGroup>
              </Flex>
            </Flex>
          </Flex>

          {contextReviews?.map((review) => {
            let upvote = 0;
            let downvote = 0;
            return (
              <Flex
                width={{ base: "328px", md: "640px" }}
                color={"white"}
                background={"#17181C"}
                borderRadius={"24px"}
                flexDir={"column"}
              >
                <Flex
                  paddingBottom={"8px"}
                  marginTop={"24px"}
                  gap={"32px"}
                  paddingLeft={"32px"}
                  flexDir={"column"}
                >
                  <Flex flexDir={"column"}>
                    <Text
                      fontSize={{ base: "16px", md: "16px" }}
                      fontFamily={"Syne, sans-serif"}
                      fontWeight={"700"}
                    >
                      👀 anon#
                      {
                        contextAllUsers.find(
                          (e) => e.twitterID == review?.reviewBy
                        ).anonId
                      }
                    </Text>
                    <Text
                      marginTop={"20px"}
                      fontFamily={"Urbanist, sans-serif"}
                      fontSize={{ base: "16px", md: "16px" }}
                      fontWeight={"400"}
                    >
                      {review?.content}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  background={"#24252B"}
                  marginTop={"24px"}
                  borderBottomRadius={"24px"}
                >
                  <ButtonGroup
                    isAttached
                    variant="ghost"
                    borderRadius={"12px"}
                    justifyContent={"space-between"}
                    width={{ base: "328px", md: "640px" }}
                  >
                    <Button
                      borderRadius={"8px"}
                      height={"48px"}
                      width={"213.33px"}
                      _hover={{ background: "#24252B", color: "white" }}
                    >
                      <Text
                        textAlign={"center"}
                        fontSize={{ base: "20px", md: "20px" }}
                        fontFamily={"Syne, sans-serif"}
                        fontWeight={"700"}
                      >
                        ⬆️{" "}
                        {review?.votes.map((e) => {
                          e.vote == 1 && (upvote = upvote + 1);
                          return upvote;
                        })}
                      </Text>
                    </Button>

                    <Button
                      borderRadius={"8px"}
                      height={"48px"}
                      width={"213.33px"}
                      _hover={{ background: "#24252B", color: "white" }}
                    >
                      <Text
                        fontSize={{ base: "20px", md: "20px" }}
                        fontFamily={"Syne, sans-serif"}
                        fontWeight={"700"}
                      >
                        ⬇️{" "}
                        {review?.votes.map((e) => {
                          e.vote == -1 && (downvote = downvote + 1);
                          return downvote;
                        })}
                      </Text>
                    </Button>
                  </ButtonGroup>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
};

export default Profile;
