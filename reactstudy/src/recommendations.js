// recommendations.js
import paris_img from "./assets/paris_img.jpg";
import tokyo_img from "./assets/tokyo_img.jpg";
import barcelona_img from "./assets/barcelona_img.jpg";
import newyork_img from "./assets/newyork_img.jpg";
import bangkok_img from "./assets/bangkok_img.jpg";
import berlin_img from "./assets/berlin_img.jpg";
import queenstown_img from "./assets/queenstown_img.jpg";
import rio_img from "./assets/rio_img.jpg";
import kualalumpur_img from "./assets/kualalumpur_img.jpg";
import prague_img from "./assets/prague_img.jpg";
import london_img from "./assets/london_img.jpg";
import toronto_img from "./assets/toronto_img.jpg";
import sydney_img from "./assets/sydney_img.jpg";
import reykjavik_img from "./assets/reykjavik_img.jpg";
import budapest_img from "./assets/budapest_img.jpg";
import doha_img from "./assets/doha_img.jpg";
import shanghai_img from "./assets/shanghai_img.jpg";
import singapore_img from "./assets/singapore_img.jpg";
import dubai_img from "./assets/dubai_img.jpg";
import madrid_img from "./assets/madrid_img.jpg";
import kyushu_img from "./assets/kyushu_img.jpg";
import copenhagen_img from "./assets/copenhagen_img.jpg";

const recommendations = {
  twenties: [
    //20대
    {
      imageUrl: tokyo_img,
      placeName: "Top1 \n Tokyo, Japan",
    },
    {
      imageUrl: barcelona_img,
      placeName: "Top2 \n Barcelona, Spain",
    },
    {
      imageUrl: newyork_img,
      placeName: "Top3 \n New York City, USA",
    },
    {
      imageUrl: bangkok_img,
      placeName: "Top4 \n Bangkok, Thailand",
    },
    {
      imageUrl: berlin_img,
      placeName: "Top5\nBerlin, Germany",
    },
  ],
  thirties: [
    //30대
    {
      imageUrl: queenstown_img,
      placeName: "Top1 \n Queenstown, New Zealand",
    },
    {
      imageUrl: rio_img,
      placeName: "Top2 \n Rio de Janeiro, Brazil",
    },
    {
      imageUrl: kualalumpur_img,
      placeName: "Top3 \n Kuala Lumpur, Malaysia",
    },
    {
      imageUrl: prague_img,
      placeName: "Top4 \n Prague, Czech Republic",
    },
    {
      imageUrl: london_img,
      placeName: "Top5\nLondon, UK",
    },
  ],
  forties: [
    // 40대
    {
      imageUrl: toronto_img,
      placeName: "Top1 \n Toronto, Canada",
    },
    {
      imageUrl: sydney_img,
      placeName: "Top2 \n Sydney, Australia",
    },
    {
      imageUrl: reykjavik_img,
      placeName: "Top3 \n Reykjavik, Iceland",
    },
    {
      imageUrl: budapest_img,
      placeName: "Top4 \n Budapest, Hungary",
    },
    {
      imageUrl: barcelona_img,
      placeName: "Top5\nBarcelona, Spain",
    },
  ],
  man: [
    // 남성
    {
      imageUrl: doha_img,
      placeName: "Top1 \n Doha, Qatar",
    },
    {
      imageUrl: shanghai_img,
      placeName: "Top2 \n Shanghai, China",
    },
    {
      imageUrl: singapore_img,
      placeName: "Top3 \n Singapore",
    },
    {
      imageUrl: tokyo_img,
      placeName: "Top4 \n Tokyo, Japan",
    },
    {
      imageUrl: london_img,
      placeName: "Top5\nLondon, UK",
    },
  ],
  woman: [
    // 여성
    {
      imageUrl: paris_img,
      placeName: "Top1 \n Paris, France",
    },
    {
      imageUrl: dubai_img,
      placeName: "Top2 \n Dubai, United Arab Emirates",
    },
    {
      imageUrl: madrid_img,
      placeName: "Top3 \n Madrid, Spain",
    },
    {
      imageUrl: kyushu_img,
      placeName: "Top4 \n Kyushu, Japan",
    },
    {
      imageUrl: copenhagen_img,
      placeName: "Top5\nCopenhagen, Denmark",
    },
  ],
};

export default recommendations;