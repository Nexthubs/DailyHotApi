import type { RouterData } from "../types.js";
import type { RouterType } from "../router.types.js";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "yahoojp",
    title: "Yahoo 日本热搜",
    type: "热搜榜",
    link: "https://search.yahoo.co.jp/realtime",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `http://192.168.6.177:5678/webhook/yahoojp`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["freshnews"]) => ({
      id: v.docid,
      title: v.title,
      url: `https://search.yahoo.co.jp/realtime/${v.source}&rkf=1&ifr=tp_bz`,
      mobileUrl: `https://search.yahoo.co.jp/realtime/${v.source}&rkf=1&ifr=tp_bz`,
    })),
  };
};
