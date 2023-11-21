// recommendations.js
import busan_img from "./assets/busan.jpg";
import paris_img from "./assets/paris.jpg";
import tokyo_img from "./assets/busan.jpg";

const recommendations = {
  twenties: [
    //20대
    {
      imageUrl: tokyo_img,
      placeName: "Top1 \n Tokyo, Japan",
    },
    {
      imageUrl: busan_img,
      placeName: "Top2 \n Barcelona, Spain",
    },
    {
      imageUrl: busan_img,
      placeName: "Top3 \n New York City, USA",
    },
    {
      imageUrl: "이미지4의 URL",
      placeName: "Top4 \n Bangkok, Thailand",
    },
    {
      imageUrl: "이미지5의 URL",
      placeName: "Top5\nBerlin, Germany",
    },
  ],
  thirties: [
    //30대
    {
      imageUrl: busan_img,
      placeName: "Top1 \n Queenstown, New Zealand",
    },
    {
      imageUrl: busan_img,
      placeName: "Top2 \n Rio de Janeiro, Brazil",
    },
    {
      imageUrl: busan_img,
      placeName: "Top3 \n Kuala Lumpur, Malaysia",
    },
    {
      imageUrl: busan_img,
      placeName: "Top4 \n Prague, Czech Republic",
    },
    {
      imageUrl: busan_img,
      placeName: "Top5\nLondon, UK",
    },
  ],
  forties: [
    // 40대
    {
      imageUrl: busan_img,
      placeName: "Top1 \n Toronto, Canada",
    },
    {
      imageUrl: "이미지2의 URL",
      placeName: "Top2 \n Sydney, Australia",
    },
    {
      imageUrl: "이미지3의 URL",
      placeName: "Top3 \n Reykjavik, Iceland",
    },
    {
      imageUrl: "이미지4의 URL",
      placeName: "Top4 \n Budapest, Hungary",
    },
    {
      imageUrl: "이미지5의 URL",
      placeName: "Top5\nBarcelona, Spain",
    },
  ],
  men: [
    // 남성
    {
      imageUrl: "./assets/busan.jpg",
      placeName: "Top1 \n Doha, Qatar",
    },
    {
      imageUrl: "이미지2의 URL",
      placeName: "Top2 \n Shanghai, China",
    },
    {
      imageUrl: "이미지3의 URL",
      placeName: "Top3 \n Singapore",
    },
    {
      imageUrl: "이미지4의 URL",
      placeName: "Top4 \n Tokyo, Japan",
    },
    {
      imageUrl: "이미지5의 URL",
      placeName: "Top5\nLondon, UK",
    },
  ],
  women: [
    // 여성
    {
      imageUrl: paris_img,
      placeName: "Top1 \n Paris, France",
    },
    {
      imageUrl: paris_img,
      placeName: "Top2 \n Dubai, United Arab Emirates",
    },
    {
      imageUrl: paris_img,
      placeName: "Top3 \n Plaza Mayor, Spain",
    },
    {
      imageUrl: paris_img,
      placeName: "Top4 \n Kyushu, Japan",
    },
    {
      imageUrl: paris_img,
      placeName: "Top5\nCopenhagen, Denmark",
    },
  ],
};

export default recommendations;
