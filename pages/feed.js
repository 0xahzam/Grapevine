import {
  Flex,
  Text,
  Button,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useLayoutEffect, useEffect, useState } from "react";
import { getTokenFromCode } from "../utils/getTokenFromCode";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

import { LSPrefix } from "../constants";

const mainapp = () => {
  const { query, push: redirect, isReady } = useRouter();

  const [token, setToken] = useState();
  const removeLSData = async () => {
    localStorage.removeItem(`${LSPrefix}_temp_codev`);
    localStorage.removeItem(`${LSPrefix}_temp_state`);
    Cookies.remove("token");
    Router.push("/");
  };

  // const initFlags = {
  //   search: "",
  //   userSearch: { id: "", username: "" },
  //   dateFrom: "",
  //   dateTo: "",
  //   deletedTweets: [],
  //   sort: "latest", //oldest
  // };
  // const [flags, setFlags] = useState({ ...initFlags });
  const bookmarkQuery = {
    "tweet.fields":
      "created_at,author_id,id,conversation_id,attachments,entities",
    expansions: "author_id,attachments.media_keys",
    "user.fields": "created_at,profile_image_url,name,username",
    "media.fields": "height,type,url,preview_image_url",
    // max_results: 100,
  };
  // const [deleteLoader, setDeleteLoader] = useState(false);
  // localStorage.setItem("chakra-ui-color-mode", "dark");

  // console.log(data);
  const fetchBookmarks = async (accessToken) => {
    try {
      const resData = await axios.post("/api/twitter/bookmarks", {
        token: accessToken,
        query: Object.keys(bookmarkQuery)
          .map((key) => key + "=" + bookmarkQuery[key])
          .join("&"),
      });
      const res = resData.data;

      if (!res?.success) return;

      let bookmarks = res.data.bookmarks;
      let users = res.data.users;

      users = users.map((e) => {
        return {
          ...e,
          count: bookmarks.filter((f) => f.author_id == e.id).length,
        };
      });
      setData({ bookmarks, media: res.data.media, users, user: res.data.user });
      setPagination(res.data["next-token"]);
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  const cookie = Cookies.get("token");
  useLayoutEffect(() => {
    if (!isReady) return;
    console.log(Cookies.get("token"), query, 55);

    if (Cookies.get("token")) {
      const token = JSON.parse(Cookies.get("token"));
      const { accessToken, refreshToken, expiresAt } = token;
      console.log("token in cookies", token);
      console.log(expiresAt < new Date().getTime());
      if (expiresAt < new Date().getTime()) {
        console.log("token is expired");

        try {
          const fetch = async () => {
            const accessTokenRes = await getTokenFromCode(
              "",
              "",
              token.refreshToken
            );
            console.log(accessTokenRes, "ressssss");
            if (!accessTokenRes?.success) {
              console.log(1);
              return;
            }

            const { accessToken, refreshToken } = accessTokenRes;
            if (!accessToken) {
              console.log(1);
              return;
            }
            Cookies.set(
              "token",
              JSON.stringify({
                accessToken,
                refreshToken,
                expiresAt: new Date().getTime() + 120 * 60 * 1000,
              })
            );
            setToken(accessToken);
          };
          fetch();
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("fetching bookmark with current token");
        //fetchBookmarks(accessToken);
      }
    } else {
      if (query.code) {
        const tempState = query.state || "";
        const lsTempState =
          localStorage && localStorage.getItem(`${LSPrefix}_temp_state`);
        const codeV = localStorage.getItem(`${LSPrefix}_temp_codev`);
        const authCode = query?.code || "";

        if (!codeV || !authCode || !lsTempState || tempState !== lsTempState) {
          console.log(
            1,
            "codev",
            codeV,
            "authcode",
            authCode,
            "lstemp",
            lsTempState,
            "temp",
            tempState
          );
          return;
        }
        try {
          const fetch = async () => {
            const accessTokenRes = await getTokenFromCode(
              authCode,
              codeV,
              undefined
            );
            console.log(accessTokenRes, "ressssss");
            if (!accessTokenRes?.success) {
              console.log(1);
              return;
            }

            const { accessToken, refreshToken } = accessTokenRes;
            if (!accessToken) {
              console.log(1);
              return;
            }
            Cookies.set(
              "token",
              JSON.stringify({
                accessToken,
                refreshToken,
                expiresAt: new Date().getTime() + 120 * 60 * 1000,
              })
            );
            fetchBookmarks(accessToken);
          };
          fetch();

          // if (!Cookies.get("token")) {
          //   alert("cookie not there. Go login again");
          // }
          //fetchBookmarks(accessToken);
        } catch (err) {
          console.error(err);
        }
        // make a req to get new token with the auth code
        // save the new token and ref token in state and cookies
        // }
      } else {
        console.log(query.code, 45);
        toast({
          title: `No token available`,
          status: "warning",
          isClosable: true,
          position: "top",
          duration: 3000,
          //variant: "left-accent",
        });
        Router.push("/");
        console.log("noo cookie , noo query , going for auth1");
      }
    }
  }, [query, cookie, token, isReady]);

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
            <Text
              color={"white"}
              fontSize={{ base: "13px", md: "16px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"19px"}
              onClick={removeLSData}
            >
              Logout
            </Text>
            <Text
              color={"white"}
              fontSize={{ base: "13px", md: "16px" }}
              fontFamily={"Syne, sans-serif"}
              fontWeight={"700"}
              lineHeight={"19px"}
            >
              Profile
            </Text>
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
              Hello bionic! Welcome to grapevine. <br />
              You will be known as
              <span style={{ color: "#DE47A5" }}> anon#8008 </span>
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

            <InputGroup
              width={{ base: "328px", md: "480px" }}
              marginTop={"16px"}
              height={"45px"}
              borderRadius={"12px"}
            >
              <InputLeftElement pointerEvents="none">🔎</InputLeftElement>
              <Input placeholder="Search users by their twitter handle" />
            </InputGroup>

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
              <Flex
                background={"#17181C"}
                height={"64px"}
                borderRadius={"12px"}
                align={"center"}
              >
                <Image
                  src="chris.png"
                  alt="chris evans"
                  height={"60px"}
                  paddingLeft={"12px"}
                  paddingTop={"8px"}
                  paddingBottom={"8px"}
                />
                <Text
                  paddingLeft={"12px"}
                  fontFamily={"DM Sans, sans-serif"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                >
                  @somedude
                </Text>
              </Flex>

              <Flex
                background={"#17181C"}
                height={"64px"}
                borderRadius={"12px"}
                align={"center"}
              >
                <Image
                  src="chris.png"
                  alt="chris evans"
                  height={"60px"}
                  paddingLeft={"12px"}
                  paddingTop={"8px"}
                  paddingBottom={"8px"}
                />
                <Text
                  paddingLeft={"12px"}
                  fontFamily={"DM Sans, sans-serif"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                >
                  @somedude
                </Text>
              </Flex>

              <Flex
                background={"#17181C"}
                height={"64px"}
                borderRadius={"12px"}
                align={"center"}
              >
                <Image
                  src="chris.png"
                  alt="chris evans"
                  height={"60px"}
                  paddingLeft={"12px"}
                  paddingTop={"8px"}
                  paddingBottom={"8px"}
                />
                <Text
                  paddingLeft={"12px"}
                  fontFamily={"DM Sans, sans-serif"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                >
                  @somedude
                </Text>
              </Flex>

              <Flex
                background={"#17181C"}
                height={"64px"}
                borderRadius={"12px"}
                align={"center"}
              >
                <Image
                  src="chris.png"
                  alt="chris evans"
                  height={"60px"}
                  paddingLeft={"12px"}
                  paddingTop={"8px"}
                  paddingBottom={"8px"}
                />
                <Text
                  paddingLeft={"12px"}
                  fontFamily={"DM Sans, sans-serif"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                >
                  @somedude
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default mainapp;
