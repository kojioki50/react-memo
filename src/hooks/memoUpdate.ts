/* eslint-disable camelcase */
import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { useSetRecoilState } from "recoil";
import { recoileState } from "../recoile/recoileState";

export const memoUpdate = () => {
  const [load, setLoad] = useState(false)
  const setMemo = useSetRecoilState(recoileState);
  const toast = useToast();
  const token = localStorage.getItem("key");
  const updateInfo = useCallback(
    async (
      id: string,
      title: string,
      category: string,
      description: string,
      date: string,
      mark: number
    ) => {
      setLoad(true);
      axiosInstance
        .put(
          `/memo/${id}`,
          {
            title,
            category,
            description,
            date,
            mark_div: mark,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setLoad(false);
          toast({
            title: "updated",
            duration: 2000,
          });
          setMemo([response.data]);
          console.log(setMemo);
        })
        .catch(() => {
          id ?? alert("IDが不正です");
          title === "" && alert("タイトルは必須です");
          date !== String(date.match(/(\d{4})(\d{2})(\d[2])/)) && alert("日付の形式が不正です");
          mark !== Number(mark) && alert("マーク区分は数値で入力してください");
          setLoad(false);
        });
    },
    []
  );
  return { updateInfo, load };
};
