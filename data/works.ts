export type Lang = "ko" | "en";

export type LocalizedText = {
  ko: string;
  en: string;
};

export type WorkLink = {
  label: LocalizedText;
  href: string;
};

export type WorkLayoutType = "default" | "tennis" | "book" | "motion";

export type WorkMediaItem = {
  src: string;
  alt?: LocalizedText;
};

export type WorkMediaBlock =
  | {
      type: "full";
      src: string;
      alt?: LocalizedText;
      marginTop?: number;
    }
  | {
      type: "split";
      items: WorkMediaItem[];
    }
  | {
      type: "collage";
      left: WorkMediaItem;
      right: [WorkMediaItem, WorkMediaItem];
    }
  | {
      type: "center";
      src: string;
      alt?: LocalizedText;
      width?: "small" | "medium" | "large" | "full";
      marginTop?: number;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      width?: "small" | "medium" | "large" | "full";
      autoPlay?: boolean;
    }
  | {
      type: "sectionText";
      title?: LocalizedText;
      description: LocalizedText;
      marginTop?: number;
    };

export type Work = {
  slug: string;

  title: LocalizedText;
  category: LocalizedText;
  description?: LocalizedText;

  thumbnail: string;
  thumbnailType?: "image" | "video";

  date?: string;
  client?: string;

  media?: WorkMediaBlock[];

  credit?: LocalizedText;
  note?: LocalizedText;
  externalLinks?: WorkLink[];

  wide?: boolean;
  layoutType?: WorkLayoutType;
};

export const works: Work[] = [
  // Hey JUD - Work hard, play heart!
  {
    slug: "work-hard-play-heart",

    title: {
      ko: "Work hard, play heart!",
      en: "Work hard, play heart!",
    },

    category: {
      ko: "애니메이션 & 광고",
      en: "Animation & Advertising",
    },

    description: {
      ko: "Hey JUD의 SS 신상품인 오렌지 노트북 가방과 테니스 가방을 홍보하기 위해 짧은 인스타그램 릴스 형식의 애니메이션을 제작했습니다.",
      en: "I created a short Instagram Reel-style animation to promote Hey JUD’s SS products: an orange laptop bag and a tennis bag.",
    },

    date: "Jul 2026",
    client: "Hey JUD",

    thumbnail: "/images/work-hard-play-heart/work-hard-play-heart.mp4",
    thumbnailType: "video",

    layoutType: "motion",

    media: [
      {
        type: "full",
        src: "/images/work-hard-play-heart/character-sheet.png",
      },
      {
        type: "full",
        src: "/images/work-hard-play-heart/tennis-character.png",
      },
      {
        type: "full",
        src: "/images/work-hard-play-heart/product.png",
      },
      {
        type: "full",
        src: "/images/work-hard-play-heart/storyboard.png",
      },
      {
        type: "video",
        src: "/images/work-hard-play-heart/work-hard-play-heart.mp4",
        autoPlay: false,
      },
    ],

    credit: {
      ko: `-Created & Directed by Jimi Lee
    -Image Generation : Nano Banana 2
    -Video Generation : Kling AI, Seedance 2.0

    -Music: “Garden Waltz for monsters” by The Green orbs,
    "Teddy Bear Waltz" by Kevin MacLeod
    Licensed under Creative Commons: By Attribution 4.0`,

      en: `-Created & Directed by Jimi Lee
    -Image Generation : Nano Banana 2
    -Video Generation : Kling AI, Seedance 2.0

    -Music: “Garden Waltz for monsters” by The Green orbs,
    "Teddy Bear Waltz" by Kevin MacLeod
    Licensed under Creative Commons: By Attribution 4.0`,
    },
  },

  // I Want Wing Clothes!
  {
    slug: "i-want-wing-clothes",

    title: {
      ko: "나도, 날개옷!",
      en: "I Want Wing Clothes!\n[나도, 날개옷!]",
    },

    category: {
      ko: "북 일러스트레이션 & 편집 디자인",
      en: "Book Illustration & Editorial Design",
    },

    description: {
      ko: "『나도, 날개옷!』은 날다람쥐와 청설모가 서로의 신체적 특징을 활용해 도움을 주고받으며 서로를 이해해 가는 이야기입니다. 멸종위기 동물에 대한 관심과 서로를 배려하고 사랑하는 마음을 전하고자 제작한 동화책입니다. 우수 프로젝트로 선정되어 언론에 소개되었습니다.",
      en: "I Want Wing Clothes! is a picture book about a flying squirrel and a red squirrel who learn to understand and help each other by using their unique physical strengths. The story explores empathy, care, and awareness of endangered animals. The project was selected as an excellent work and featured in the news.",
    },

    date: "Aug 2024",
    client: "NEWDOT",

    thumbnail: "/images/i-want-wing-clothes/thumbnail.png",

    media: [
      {
        type: "full",
        src: "/images/i-want-wing-clothes/book-cover.png",
      },
      {
        type: "full",
        src: "/images/i-want-wing-clothes/book-mockup.png",
      },
      {
        type: "video",
        src: "/images/i-want-wing-clothes/book.mov",
        width: "full",
        autoPlay: false,
      },
    ],

    externalLinks: [
      {
        label: {
          ko: "관련 기사 보기",
          en: "View Featured Article",
        },
        href: "https://www.kyeonggi.com/article/20241126580201",
      },
    ],

    layoutType: "book",
  },

  // Hey JUD 2026 SS Product Design & Development
  {
    slug: "hey-jud-2026-ss-product-design",

    title: {
      ko: "Hey JUD 2026 SS Product Design & Development",
      en: "Hey JUD 2026 SS Product Design & Development",
    },

    category: {
      ko: "그래픽 & 제품 디자인",
      en: "Graphic & Product Design",
    },

    description: {
      ko: "Hey JUD의 2026 SS 컬렉션을 위해 노트북 가방과 테니스 가방의 제품 디자인 및 라벨 그래픽을 디자인했습니다. 또한 컬렉션과 함께 활용되는 키링과 패키지 디자인을 진행했습니다.",
      en: "Designed products and label graphics for Hey JUD’s 2026 SS collection, including laptop bags and tennis bags. I also developed matching keyrings and packaging for the collection.",
    },

    date: "May 2026",
    client: "Hey JUD",

    externalLinks: [
      {
        label: {
          ko: "Hey JUD 웹사이트",
          en: "Hey JUD Website",
        },
        href: "http://www.heyjud.com",
      },
    ],

    thumbnail: "/images/hey-jud-2026-ss/label-design.png",

    media: [
      // Label Design
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/label-design.png",
      },

      // Orange Laptop Bag
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/laptop-bag-orange.jpg",
      },

      // Navy Laptop Bag
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/laptop-bag-navy.jpg",
      },

      // Orange Tennis Bag
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/tennis-bag-orange.png",
      },

      // Navy Tennis Bag
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/tennis-bag-navy.png",
      },

      // Character Keyrings
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/keyrings.png",
      },

      // Packaging
      {
        type: "full",
        src: "/images/hey-jud-2026-ss/packaging.png",
      },
    ],
  },

  // Korean Christmas Ornament Card
  {
    slug: "korean-christmas-ornament-card",

    title: {
      ko: "한국 크리스마스 오너먼트 카드",
      en: "Korean Christmas Ornament Card\n[복(福)을 담은 크리스마스 카드]",
    },

    category: {
      ko: "패키징 & 광고",
      en: "Packaging & Advertising",
    },

    description: {
      ko: "Hey JUD를 위해 크리스마스 카드와 프로모션 영상을 디자인했습니다. 한국의 전통 문양과 색감, 조각보, 매듭, 갓 등의 요소를 활용한 작업입니다.",
      en: "Designed a Christmas card and promotional video for Hey JUD. The artwork blends traditional Korean motifs—such as Hanbok patterns, Saekdong color palettes, Jeogori, magpies, and the Gat.",
    },

    date: "Apr 2025",
    client: "Hey JUD",

    thumbnail: "/images/christmas-card/mockup.png",

    media: [
      {
        type: "full",
        src: "/images/christmas-card/mockup.png",
      },
      {
        type: "split",
        items: [
          {
            src: "/images/christmas-card/tree.png",
          },
          {
            src: "/images/christmas-card/card.JPG",
          },
        ],
      },
      {
        type: "video",
        src: "/images/christmas-card/card.MP4",
        autoPlay: false,
      },
    ],
  },

  // Merry Christmas with SOULMATE TENNIS CLUB
  {
    slug: "merry-christmas-soulmate-tennis-club",

    title: {
      ko: "Merry Christmas with SOULMATE TENNIS CLUB",
      en: "Merry Christmas with SOULMATE TENNIS CLUB",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "Soulmate Tennis Club의 크루 멤버 Jako, Radu, Soul이 함께 따뜻한 크리스마스를 보내는 모습을 담은 크리스마스 카드를 제작했습니다.",
      en: "Created a Christmas card featuring Soulmate Tennis Club crew members Jako, Radu, and Soul enjoying a warm holiday season together.",
    },

    date: "Nov 2024",
    client: "Hey JUD",

    thumbnail: "/images/soulmate-christmas/card.jpg",

    media: [
      {
        type: "full",
        src: "/images/soulmate-christmas/card.jpg",
      },
      {
        type: "full",
        src: "/images/soulmate-christmas/mockup.png",
      },
    ],
  },

  // SOULMATE TENNIS CLUB
  {
    slug: "soulmate-tennis-club",

    title: {
      ko: "SOULMATE TENNIS CLUB",
      en: "SOULMATE TENNIS CLUB",
    },

    category: {
      ko: "캐릭터 디자인 & 일러스트레이션",
      en: "Character Design & Illustration",
    },

    description: {
      ko: "테니스를 사랑하는 다양한 캐릭터들의 이야기를 담은 SOULMATE TENNIS CLUB 프로젝트입니다. 캐릭터 디자인을 중심으로 일러스트레이션, 포스터, 신문, 굿즈 및 전시 디스플레이까지 다양한 매체로 확장하여 하나의 브랜드 세계관을 구축했습니다.",
      en: "SOULMATE TENNIS CLUB is a character-driven project inspired by the stories of people who love tennis. The project expands its visual world through character design, illustration, posters, newspapers, merchandise, and exhibition displays.",
    },

    date: "Mar 2023",
    client: "Personal",

    thumbnail: "/images/soulmate-tennis/thumbnail.MP4",
    thumbnailType: "video",

    media: [
      {
        type: "center",
        src: "/images/soulmate-tennis/logo.png",
        width: "small",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/illustration_tennis.jpg",
      },
      {
        type: "center",
        src: "/images/soulmate-tennis/character.png",
        width: "small",
        marginTop: 180,
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/tennis_characters.png",
      },
      {
        type: "center",
        width: "small",
        src: "/images/soulmate-tennis/illustration.png",
        marginTop: 180,
      },
      {
        type: "sectionText",

        title: {
          ko: "Grand Slam Episode Illustrations",
          en: "Grand Slam Episode Illustrations",
        },

        description: {
          ko: "4대 그랜드 슬램 테니스 대회의 특징적인 콘셉트와 클럽 크루를 담은 네 개의 에피소드 포스터를 제작했습니다.",
          en: "I drew four episode posters featuring the distinct concepts of the four major Grand Slam tennis venues—Wimbledon, the US Open, the Australian Open, and Roland-Garros—along with the club crew.",
        },
      },
      {
        type: "full",
        src: "/images/soulmate-tennis-club/grand-slam-series.png",
      },
      {
        type: "sectionText",
        marginTop: 220,

        title: {
          ko: "SOULMATE TENNIS CLUB Newspaper Illustration",
          en: "SOULMATE TENNIS CLUB Newspaper Illustration",
        },

        description: {
          ko: "SOULMATE TENNIS CLUB의 흥미로운 소식을 뉴스레터를 통해 전합니다! 여러분, Soul과 Ladoo가 결혼한다는 소식 들으셨나요?",
          en: "Delivering exciting news from SOULMATE TENNIS CLUB through our newsletter! Everyone, have you heard the news that Soul and Ladoo are getting married?",
        },
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/newspaper.jpg",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/newspaper-mockup.png",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/card.png",
      },
      {
        type: "split",
        items: [
          {
            src: "/images/soulmate-tennis/product-keyring.png",
          },
          {
            src: "/images/soulmate-tennis/product-clothes.png",
          },
        ],
      },
      {
        type: "center",
        width: "small",
        src: "/images/soulmate-tennis/display.png",
        marginTop: 180,
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/display-main.png",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis/display-table.png",
      },
      {
        type: "split",
        items: [
          {
            src: "/images/soulmate-tennis/display-people.png",
          },
          {
            src: "/images/soulmate-tennis/display-shirts.png",
          },
        ],
      },
    ],
  },

  // Who is the Quickest?
  {
    slug: "who-is-the-quickest",

    title: {
      ko: "Who is the Quickest?",
      en: "Who is the Quickest?",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "Soulmate Tennis Club의 캐릭터를 활용해 세계 4대 테니스 대회를 각각의 특징과 유머러스한 장면으로 표현한 일러스트레이션 시리즈입니다. Wimbledon 편에서는 Joko의 강력하고 빠른 서브를 역동적인 장면으로 표현했습니다.",
      en: "Joko’s sppedy shots are so hard to return in Wimbledon.",
    },

    date: "Mar 2023",
    client: "Personal",

    thumbnail: "/images/soulmate-tennis-club/wimbledon.webp",

    media: [
      {
        type: "full",
        src: "/images/soulmate-tennis-club/wimbledon.webp",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis-club/grand-slam-series.png",
      },
    ],
  },

  // Who is Fall in Love?
  {
    slug: "who-is-fall-in-love",

    title: {
      ko: "Who is Fall in Love?",
      en: "Who is Fall in Love?",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "Soulmate Tennis Club의 캐릭터 Soul과 Radu가 US Open에서 사랑에 빠지는 장면을 유쾌하게 표현한 일러스트레이션입니다. 세계 4대 테니스 대회의 특징과 캐릭터들의 이야기를 결합한 Grand Slam 일러스트레이션 시리즈의 US Open 편입니다.",
      en: "Soul and Radu fell in love at the US Open!",
    },

    date: "Mar 2023",
    client: "Personal",

    thumbnail: "/images/soulmate-tennis-club/rado.webp",

    media: [
      {
        type: "full",
        src: "/images/soulmate-tennis-club/rado.webp",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis-club/grand-slam-series.png",
      },
    ],
  },

  // Who is the Winner? - Australian Open
  {
    slug: "who-is-the-winner",

    title: {
      ko: "Who is the Winner?",
      en: "Who is the Winner?",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "Soulmate Tennis Club의 캐릭터 Soul과 Sera가 Australian Open에서 펼치는 이야기를 유쾌하게 표현한 일러스트레이션입니다.",
      en: "Soul was completely defeated by Sera at the Aus Open!",
    },

    date: "Mar 2023",
    client: "Personal",

    thumbnail: "/images/soulmate-tennis-club/sera.webp",

    media: [
      {
        type: "full",
        src: "/images/soulmate-tennis-club/sera.webp",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis-club/grand-slam-series.png",
      },
    ],
  },

  // Roland Garros
  {
    slug: "who-is-the-strongest",

    title: {
      ko: "Who is the Strongest?",
      en: "Who is the Strongest?",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "Soulmate Tennis Club의 Grand Slam 일러스트레이션 시리즈 중 Roland Garros를 표현한 작품입니다.",
      en: "Nadal’s powerful forehand caused chaos at Roland Garros!",
    },

    date: "Mar 2023",
    client: "Personal",

    thumbnail: "/images/soulmate-tennis-club/nadal.webp",

    media: [
      {
        type: "full",
        src: "/images/soulmate-tennis-club/nadal.webp",
      },
      {
        type: "full",
        src: "/images/soulmate-tennis-club/grand-slam-series.png",
      },
    ],
  },

  // Bustling Gym
  {
    slug: "bustling-gym",

    title: {
      ko: "우당탕탕 헬스장",
      en: "Bustling Gym\n[우당탕탕 헬스장]",
    },

    category: {
      ko: "북 일러스트레이션",
      en: "Book Illustration",
    },

    description: {
      ko: "『우당탕탕 헬스장』은 헬스장에 모인 다양한 사람들과 직원들의 모습을 유쾌하게 담아낸 일러스트레이션 프로젝트입니다.",
      en: "Bustling Gym is an illustration project featuring a lively cast of people and staff gathered at a gym. From those who came to exercise to characters with unexpected reasons for being there, the series playfully captures the diverse personalities and amusing situations found in a bustling gym?",
    },

    date: "Apr 2024",
    client: "Personal",

    thumbnail: "/images/bustling-gym/cover.png",

    media: [
      {
        type: "full",
        src: "/images/bustling-gym/cover.png",
      },
      {
        type: "full",
        src: "/images/bustling-gym/mockup.png",
      },
      {
        type: "full",
        src: "/images/bustling-gym/illustrations.png",
      },
      {
        type: "video",
        src: "/images/bustling-gym/illustrations.mov",
        width: "full",
        autoPlay: false,
      },
    ],
  },

  // Animals Are Not For Sale
  {
    slug: "animals-are-not-for-sale",

    title: {
      ko: "Animals Are Not For Sale",
      en: "Animals Are Not For Sale",
    },

    category: {
      ko: "일러스트레이션",
      en: "Illustration",
    },

    description: {
      ko: "동물 판매, 학대, 상품화에 대한 비판과 동물 보호 메시지를 전달하기 위해 제작한 캠페인 포스터입니다.",
      en: "This poster was created as part of an animal protection campaign that critiques the sale, abuse, and commercialization of animals.",
    },

    date: "May 2024",
    client: "Personal",

    thumbnail: "/images/animals-are-not-for-sale/thumbnail.webp",

    media: [
      {
        type: "full",
        src: "/images/animals-are-not-for-sale/poster.webp",
      },
    ],
  },

  // Dustin's Awesome Pack
  {
    slug: "dustins-awesome-pack",

    title: {
      ko: "Dustin's Awesome Pack",
      en: "Dustin's Awesome Pack",
    },

    category: {
      ko: "문구 & 제품 디자인",
      en: "Stationery & Product Design",
    },

    description: {
      ko: "가상의 미국 소년 캐릭터 Dustin의 세계관을 바탕으로 노트, 엽서, 핀배지, 스티커 등 다양한 문구 제품을 디자인했습니다.",
      en: "A stationery collection inspired by Dustin, a fictional American kid character. The series includes notebooks, postcards, pin badges, stickers, and other paper goods, featuring Dustin's Awesome Pack and Dustin's Records Sticker Pack. The collection was produced and sold through an independent stationery brand.",
    },

    date: "Dec 2023",
    client: "Personal",

    thumbnail: "/images/dustins-awesome-pack/awesome-pack.jpg",

    media: [
      {
        type: "video",
        src: "/images/dustins-awesome-pack/superman.mp4",
        width: "small",
        autoPlay: true,
      },
      {
        type: "sectionText",

        description: {
          ko: "I developed Dustin, a stationery collection based on the concept of a fictional American kid, and launched it through my independent stationery brand.",
          en: "I developed Dustin, a stationery collection based on the concept of a fictional American kid, and launched it through my independent stationery brand.",
        },
      },
      {
        type: "full",
        src: "/images/dustins-awesome-pack/dustins_open.png",
      },
      {
        type: "full",
        src: "/images/dustins-awesome-pack/awesome-pack.jpg",
      },
      {
        type: "full",
        src: "/images/dustins-awesome-pack/awesome-pack-info.png",
      },
      {
        type: "collage",

        left: {
          src: "/images/dustins-awesome-pack/awesome-pack-products-1.jpg",
        },

        right: [
          {
            src: "/images/dustins-awesome-pack/awesome-pack-products-2.jpg",
          },
          {
            src: "/images/dustins-awesome-pack/awesome-pack-products-3.jpg",
          },
        ],
      },
      {
        type: "full",
        src: "/images/dustins-awesome-pack/records-info.png",
      },
      {
        type: "full",
        src: "/images/dustins-awesome-pack/records-products-1.jpg",
      },

      {
        type: "split",
        items: [
          {
            src: "/images/dustins-awesome-pack/records-products-2.jpg",
            alt: {
              ko: "더스틴 노트",
              en: "Dustin's notebook",
            },
          },
          {
            src: "/images/dustins-awesome-pack/records-products-3.jpg",
            alt: {
              ko: "더스틴 스티커",
              en: "Dustin's sticker",
            },
          },
        ],
      },

      {
        type: "video",
        src: "/images/dustins-awesome-pack/restock_list.mp4",
        width: "small",
        autoPlay: true,
      },
    ],
  },

  // Find Jiho
  {
    slug: "find-jiho",

    title: {
      ko: "지호를 찾아라!",
      en: "Find Jiho!",
    },

    category: {
      ko: "캠페인 포스터",
      en: "Campaign Poster",
    },

    description: {
      ko: "학대 피해 아동의 징후를 발견하고 관심을 가질 수 있도록 제작한 아동학대 예방 캠페인 포스터입니다.",
      en: "A child abuse awareness campaign poster designed to encourage people to recognize the signs of abuse and identify children who may need help.",
    },

    date: "May 2024",
    thumbnail: "/images/find-jiho/thumbnail.webp",
    client: "Personal",

    media: [
      {
        type: "full",
        src: "/images/find-jiho/poster.webp",
        alt: {
          ko: "아동학대 피해 아동 발견 캠페인 포스터 - 지호를 찾아라!",
          en: "Child Abuse Awareness Campaign Poster - Find Jiho!",
        },
      },
    ],
  },

  // Let's Clay Sticker
  {
    slug: "lets-clay-sticker",

    title: {
      ko: "Let's Clay Sticker",
      en: "Let's Clay Sticker",
    },

    category: {
      ko: "문구 디자인",
      en: "Stationery Design",
    },

    description: {
      ko: "어린아이가 직접 만든 듯한 클레이 오브제를 활용해 다채로운 스토리를 담은 문구 브랜드를 제작했습니다.",
      en: "I created clay-like story figures inspired by a child's handmade creations and developed them into a colorful stationery brand.",
    },

    thumbnail: "/images/lets-clay-sticker/illustration.jpg",

    date: "Dec 2023",
    client: "Personal",

    media: [
      {
        type: "center",
        src: "/images/lets-clay-sticker/illustration.jpg",
        alt: {
          ko: "Let's Clay Sticker 메인 일러스트",
          en: "Let's Clay Sticker main illustration",
        },
        width: "small",
      },
      {
        type: "full",
        src: "/images/lets-clay-sticker/info.png",
        alt: {
          ko: "스티커와 엽서 구성 안내",
          en: "Sticker and postcard information",
        },
        marginTop: 180,
      },
      {
        type: "full",
        src: "/images/lets-clay-sticker/products-1.jpg",
        alt: {
          ko: "Let's Clay Sticker 제품 이미지",
          en: "Let's Clay Sticker product image",
        },
      },
      {
        type: "split",
        items: [
          {
            src: "/images/lets-clay-sticker/sticker-1.jpg",
            alt: {
              ko: "클레이 스티커 활용 이미지",
              en: "Clay sticker application",
            },
          },
          {
            src: "/images/lets-clay-sticker/sticker-2.jpg",
            alt: {
              ko: "클레이 스티커 활용 이미지",
              en: "Clay sticker application",
            },
          },
        ],
      },
      {
        type: "split",
        items: [
          {
            src: "/images/lets-clay-sticker/sticker-3.jpg",
            alt: {
              ko: "클레이 스티커 활용 이미지",
              en: "Clay sticker application",
            },
          },
          {
            src: "/images/lets-clay-sticker/sticker-4.jpg",
            alt: {
              ko: "클레이 스티커 활용 이미지",
              en: "Clay sticker application",
            },
          },
        ],
      },
    ],
  },
];

export const getWorkBySlug = (slug: string): Work | undefined => {
  return works.find((work) => work.slug === slug);
};
