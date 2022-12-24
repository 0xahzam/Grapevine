import {
  Flex,
  Text,
  Button,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Link,
  Avatar,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import {
  doc,
  addDoc,
  serverTimestamp,
  collection,
  query,
  onSnapshot,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useUserContext } from "../context/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, twitter } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  SetReviewsInContext,
  SetUsersInContext,
  SetUserInContext,
} from "../context/contextFunctions";
import { login, logout } from "../utils/authFunctions";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();

  const {
    contextUser,
    setContextUser,
    contextAllUsers,
    setContextAllUsers,
    contextReviews,
    setContextReviews,
  } = useUserContext();

  useEffect(() => {
    console.log("in navbar", user);

    if (contextUser == null && user) {
      console.log("setting context");
      console.log("text");
      SetUserInContext(setContextUser, user, "username");
    }
  }, [user]);

  return (
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

        {contextUser !== null && (
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
            <AutoCompleteList border={"1px solid white"} marginInline={"auto"}>
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
        )}

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

        {!user && (
          <Text
            onClick={() => login(twitter, user, contextUser, setContextUser)}
            color={"white"}
            fontSize={{ base: "13px", md: "16px" }}
            fontFamily={"Syne, sans-serif"}
            fontWeight={"700"}
            lineHeight={"19px"}
          >
            Login
          </Text>
        )}
        {console.log(user, "user befor logout")}
        {/* {user && (
          
        )} */}
      </Flex>
    </Flex>
  );
};

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;
  const [review, setReview] = useState("");
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenAddTea,
    onOpen: onOpenAddTea,
    onClose: onCloseAddTea,
  } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const {
    contextUser,
    setContextUser,
    contextAllUsers,
    setContextAllUsers,
    contextReviews,
    setContextReviews,
  } = useUserContext();

  const userContext = useUserContext();
  const toast = useToast();
  const dropTea = () => {
    alert("droppin tea");
    //check if user is there
    (async () => {
      const reviewData = {
        content: review,
        reviewBy: contextUser.twitterID,
        reviewFor: currentUser.twitterID,
        upvotes: [],
        downvotes: [],
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, "teas"), reviewData);
        setReview("");
        alert("review added");
      } catch (err) {
        alert("error");
        console.log(err, "err while adding new review");
      }
    })();
  };

  useEffect(() => {
    if (contextAllUsers.length == 0) {
      SetUsersInContext(setContextAllUsers);
    }
    if (contextReviews.length == 0) {
      SetReviewsInContext(setContextReviews);
    }
  }, []);
  console.log(contextReviews);
  const currentUser = contextAllUsers.find((e) => e.username == userName);
  const currentUserReviews = contextReviews.filter(
    (e) => e.reviewFor == currentUser.twitterID
  );
  console.log(contextAllUsers, currentUser, currentUserReviews, 149);

  return (
    <div className="main">
      <Flex flexDir={"column"} align={"center"}>
        <Navbar />

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
                      ☕ {currentUserReviews?.length}
                    </Text>
                  </Button>

                  <Button
                    background={"#DE47A5"}
                    height={"38px"}
                    _hover={{ background: "DE47A5" }}
                  >
                    <Text
                      onClick={user ? onOpenAddTea : onOpenLogin}
                      color={"black"}
                      fontSize={{ base: "20px", md: "20px" }}
                      fontFamily={"Syne, sans-serif"}
                      fontWeight={"700"}
                    >
                      Drop Tea
                    </Text>
                  </Button>

                  <Modal isOpen={isOpenLogin} isCentered onClose={onCloseLogin}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Create Account</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>
                          {" "}
                          Activate your grapevine profile by connecting with
                          twitter and giving an anon review on someone from
                          Twitter
                        </Text>
                        <Button
                          marginTop={{ base: "24px", md: "40px" }}
                          background={"#DE47A5"}
                          color={"black"}
                          fontFamily={"Syne, sans-serif"}
                          boxShadow={"3px 3px white"}
                          border={"1px solid black"}
                          lineHeight={"19.2px"}
                          paddingRight={"32px"}
                          paddingLeft={"32px"}
                          paddingTop={"16px"}
                          paddingBottom={"16px"}
                          fontSize={"16px"}
                          fontWeight={"bold"}
                          width={"248px"}
                          height={"51px"}
                          borderRadius={"12px"}
                          _hover={{ background: "#C297B8" }}
                          onClick={() => {
                            login(
                              twitter,
                              user,
                              contextUser,
                              setContextUser,
                              () => {
                                toast({
                                  title: `Logged in successfully!`,
                                  status: "success",
                                  isClosable: true,
                                  duration: 2000,
                                });
                              }
                            );
                            onCloseLogin();
                          }}
                        >
                          Connect with twitter
                        </Button>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={onCloseLogin}
                        >
                          Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </ButtonGroup>
              </Flex>
            </Flex>
          </Flex>
          {/* check for key id */}
          {currentUserReviews?.map((review) => {
            const upvoteFunc = (reviewId, currentUserId) => {
              if (review.upvotes.some((e) => e == currentUserId)) {
                //removing upvote
                (async () => {
                  const teaRef = doc(db, "teas", reviewId);
                  const res = await updateDoc(teaRef, {
                    upvotes: arrayRemove(currentUserId),
                  });
                  let updatedReviews = contextReviews.map((r) =>
                    r.id == reviewId
                      ? {
                          ...r,
                          upvotes: r.upvotes.filter((u) => u !== currentUserId),
                        }
                      : r
                  );
                  setContextReviews(updatedReviews);
                })();
              } else {
                //check if downvotted before upvoting
                if (review.downvotes.some((e) => e == currentUserId)) {
                  alert("already downvotted , remove downvote first");
                } else {
                  (async () => {
                    const teaRef = doc(db, "teas", reviewId);
                    const res = await updateDoc(teaRef, {
                      upvotes: arrayUnion(currentUserId),
                    });
                    let updatedReviews = contextReviews.map((r) =>
                      r.id == reviewId
                        ? {
                            ...r,
                            upvotes: [...r.upvotes, currentUserId],
                          }
                        : r
                    );
                    setContextReviews(updatedReviews);
                    console.log(res, "res");
                  })();
                }
              }
            };
            const downvoteFunc = (reviewId, currentUserId) => {
              if (review.downvotes.some((e) => e == currentUserId)) {
                //removing upvote
                (async () => {
                  const teaRef = doc(db, "teas", reviewId);
                  const res = await updateDoc(teaRef, {
                    downvotes: arrayRemove(currentUserId),
                  });
                  let updatedReviews = contextReviews.map((r) =>
                    r.id == reviewId
                      ? {
                          ...r,
                          downvotes: r.downvotes.filter(
                            (u) => u !== currentUserId
                          ),
                        }
                      : r
                  );
                  setContextReviews(updatedReviews);
                  console.log(res, "res");
                })();
              } else {
                //check if downvotted before upvoting
                if (review.upvotes.some((e) => e == currentUserId)) {
                  alert("already upvotted , remove upvote first");
                } else {
                  (async () => {
                    const teaRef = doc(db, "teas", reviewId);
                    const res = await updateDoc(teaRef, {
                      downvotes: arrayUnion(currentUserId),
                    });
                    console.log(res, "res");
                    let updatedReviews = contextReviews.map((r) =>
                      r.id == reviewId
                        ? {
                            ...r,
                            downvotes: [...r.downvotes, currentUserId],
                          }
                        : r
                    );
                    setContextReviews(updatedReviews);
                  })();
                }
              }
            };
            return (
              <Flex
                key={review.reviewFor}
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
                      onClick={() => {
                        user
                          ? upvoteFunc(review.id, currentUser.twitterID)
                          : onOpenLogin;
                      }}
                    >
                      <Text
                        textAlign={"center"}
                        fontSize={{ base: "20px", md: "20px" }}
                        fontFamily={"Syne, sans-serif"}
                        fontWeight={"700"}
                        opacity={
                          review?.upvotes?.some(
                            (e) => e == currentUser.twitterID
                          )
                            ? "100%"
                            : "50%"
                        }
                      >
                        ⬆️ {review?.upvotes?.length}
                      </Text>
                    </Button>

                    <Button
                      borderRadius={"8px"}
                      height={"48px"}
                      width={"213.33px"}
                      _hover={{ background: "#24252B", color: "white" }}
                      onClick={() => {
                        user
                          ? downvoteFunc(review.id, currentUser.twitterID)
                          : onOpenLogin;
                      }}
                    >
                      <Text
                        fontSize={{ base: "20px", md: "20px" }}
                        fontFamily={"Syne, sans-serif"}
                        fontWeight={"700"}
                        opacity={
                          review?.downvotes?.some(
                            (e) => e == currentUser.twitterID
                          )
                            ? "100%"
                            : "50%"
                        }
                      >
                        ⬇️ {review?.downvotes?.length}
                      </Text>
                    </Button>
                  </ButtonGroup>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpenAddTea}
        onClose={onCloseAddTea}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent
          align={"center"}
          color={"white"}
          flexDir={"column"}
          p={"24px"}
          borderRadius={"24px"}
          background={"#17181C"}
          textAlign={"left"}
          border={"1px solid #4b4b4b"}
        >
          {/* <ModalHeader>Modal Title</ModalHeader> */}

          <Image
            src={currentUser?.photoURL.replace("normal", "400x400")}
            alt={currentUser?.name}
            height={"140px"}
            width={"140px"}
            border={"8px solid black"}
            borderRadius={"24px"}
          />
          <Text
            marginTop={"24px"}
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
            {currentUser?.name}
          </Text>
          <Textarea
            borderRadius={"12px"}
            marginTop={"32px"}
            border={"none"}
            rows={6}
            placeholder="Write your review here..."
            background={"#2C2E36"}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></Textarea>
          <Flex justify={"center"}>
            <Button
              marginTop={{ base: "24px", md: "23px" }}
              background={"#DE47A5"}
              color={"black"}
              fontFamily={"Syne, sans-serif"}
              boxShadow={"3px 3px white"}
              border={"1px solid black"}
              lineHeight={"19.2px"}
              paddingRight={"32px"}
              paddingLeft={"32px"}
              paddingTop={"16px"}
              paddingBottom={"16px"}
              fontSize={"16px"}
              fontWeight={"bold"}
              width={{ base: "197px", md: "248px" }}
              height={"51px"}
              borderRadius={"12px"}
              _hover={{ background: "#C297B8" }}
              onClick={dropTea}
            >
              Publish Review
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Profile;
