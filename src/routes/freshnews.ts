import type { RouterData } from "../types.js";
import type { RouterType } from "../router.types.js";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "freshnews",
    title: "Fresh News",
    type: "推荐榜",
    link: "https://www.freshnewsasia.com/index.php/en/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://dev.nexthubs.fun/webhook/freshnewsapi`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["freshnews"]) => ({
      id: v.docid,
      title: v.title,
      cover: undefined,
      author: v.source,
      hot: undefined,
      url: `https://www.freshnewsasia.com/index.php/en/${v.source}/${v.docid}`,
      mobileUrl: `https://www.freshnewsasia.com/index.php/en/${v.source}/${v.docid}`,
    })),
  };
};
