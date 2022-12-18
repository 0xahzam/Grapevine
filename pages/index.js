import { Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth, twitter, app, firebase, db } from "../firebase/clientApp";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { runTransaction } from "firebase/firestore";
import { useUserContext } from "../context/context";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const { contextUser, setContextUser } = useUserContext();

  const router = useRouter();
  const login = async (provider) => {
    if (user) {
      // following should happen if context is null
      console.log("user in auth user");
      const userDoc = doc(db, "users", user.providerData[0].uid);
      const userInDoc = await getDoc(userDoc, user.providerData[0].uid);
      if (userInDoc.exists()) {
        console.log("Document data:", userInDoc.data());
        setContextUser(userInDoc.data());
        router.push("/feed");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        const result = await signOut(auth);
        //error toast
        //logout
      }

      return;
    } else {
      const result = await signInWithPopup(auth, provider);
      console.log(result, "result");
      const userDoc = doc(db, "users", result.user.providerData[0].uid);
      const userInDoc = await getDoc(userDoc, result.user.providerData[0].uid);

      if (userInDoc.exists()) {
        console.log("Document data:", userInDoc.data());
        setContextUser(userInDoc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");

        try {
          await runTransaction(db, async (transaction) => {
            const idRef = doc(db, "users", "--idCount--");
            const idDoc = await transaction.get(idRef);
            console.log(idDoc, "12", idDoc.data());
            if (!idDoc.exists()) {
              throw "Document does not exist!";
            }

            const newId = idDoc.data().idCount + 1;
            transaction.update(idRef, { idCount: newId });
            setContextUser({
              anonId: newId,
              name: result.user.displayName,
              email: result.user.providerData[0].email,
              photoURL: result.user.providerData[0].photoURL,
              twitterID: result.user.providerData[0].uid,
              username: result._tokenResponse.screenName,
            });
            const e = transaction.set(userDoc, {
              anonId: newId,
              name: result.user.displayName,
              email: result.user.providerData[0].email,
              photoURL: result.user.providerData[0].photoURL,
              twitterID: result.user.providerData[0].uid,
              username: result._tokenResponse.screenName,
            });
            console.log(e, "Transaction successfully committed!");
          });
          console.log("Transaction successfully committed!");
        } catch (e) {
          console.log("Transaction failed: ", e);
        }
      }
      router.push("/feed");
      console.log(contextUser, 23);
    }
  };
  const logout = async () => {
    const result = await signOut(auth);
    console.log(result);
  };

  console.log(user, loading, error);

  const breakpoints = {
    sm: "30em",
    md: "48em",
    md: "62em",
    xl: "80em",
    "2xl": "96em",
  };
  return (
    <div className="main">
      <Flex
        flexDir={"column"}
        justifyItems={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
        color={"white"}
      >
        <Flex
          position={"fixed"}
          top={"0"}
          width={"100%"}
          background={"#17181C"}
          justifyItems={"center"}
          alignItems={"center"}
          flexDir={"row"}
          paddingTop={{ base: "12px", md: "28px" }}
          paddingBottom={{ base: "12px", md: "28px" }}
        >
          <Flex
            paddingLeft={{ base: "20px", md: "140px" }}
            paddingRight={{ base: "20px", md: "151px" }}
            justifyItems={"center"}
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
            <Text
              color={"white"}
              fontSize={{ base: "13px", md: "16px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"19px"}
            >
              read memo
            </Text>
            <Text
              color={"white"}
              fontSize={{ base: "13px", md: "16px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"19px"}
              onClick={logout}
            >
              logout
            </Text>
          </Flex>
        </Flex>

        <Flex
          width={{ base: "320px", md: "713px" }}
          justifyItems={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Text
            fontSize={{ base: "32px", md: "48px" }}
            align={"center"}
            fontFamily={"Syne, sans-serif"}
            fontWeight={"700"}
            size={"56px"}
            lineHeight={{ base: "38.4px", md: "67.2px" }}
            width={{ base: "320px", md: "600px" }}
          >
            Give anonymous reviews on Grapevine
          </Text>
          <Text
            marginTop={{ base: "24px", md: "40px" }}
            align={"center"}
            width={{ base: "320px", md: "592px" }}
            fontFamily={"Urbanist, sans-serif"}
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight={"500"}
            lineHeight={{ base: "19.2px", md: "28.8px" }}
          >
            Activate your grapevine profile by connecting with twitter and
            giving an anon review
          </Text>

          <a>
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
              onClick={() => login(twitter)}
            >
              Connect with twitter
            </Button>
          </a>

          <Text
            fontFamily={"Urbanist, sans-serif"}
            fontSize={"12px"}
            fontWeight={"500"}
            opacity={"70%"}
            width={"248px"}
            marginTop={"14px"}
            align={"center"}
            lineHeight={"14.4px"}
          >
            Twitter is only for verification and to prevent bots, your profile
            will be anonymous.
          </Text>
        </Flex>
      </Flex>

      <Flex
        background={"#17181C"}
        justifyItems={"center"}
        alignItems={"center"}
        flexDir={"row"}
        paddingTop={{ base: "8px", md: "20px" }}
        paddingBottom={{ base: "8px", md: "20px" }}
        position={"fixed"}
        bottom={"0"}
        width={"100%"}
      >
        <Flex
          paddingLeft={{ base: "20px", md: "140px" }}
          paddingRight={{ base: "20px", md: "151px" }}
          justifyItems={"center"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Text
            color={"#DE47A5"}
            fontSize={{ base: "16px", md: "24px" }}
            fontFamily={"Syne, sans-serif"}
            fontWeight={"700"}
            lineHeight={"28.8px"}
          >
            Grapevine
          </Text>
          <Text
            color={"white"}
            fontSize={{ base: "12px", md: "16px" }}
            fontFamily={"Syne, sans-serif"}
            fontWeight={"700"}
            lineHeight={"19px"}
          >
            Built with 💖 at cos parivaar
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
