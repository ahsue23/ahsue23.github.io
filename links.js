/*
 * 이 파일에서 링크를 관리하세요. 별도 설치나 빌드 없이 저장하면 반영됩니다.
 * url: ""이면 클릭했을 때 준비 중 안내가 나옵니다.
 * 주소는 https://부터 입력하세요. mailto:와 tel:도 사용할 수 있습니다.
 */
window.AHSUE_LINKS = {
  // 처음 세 카드는 글씨까지 원본 그림에 포함되어 있습니다.
  // 아래 label은 화면 읽기 프로그램과 준비 중 안내에서 사용됩니다.
  featured: {
    youtube: {
      label: "아슈부부 유튜브",
      url: "https://www.youtube.com/@ahsue_23",
    },
    blog: {
      label: "아현의 블로그",
      url: "https://blog.naver.com/ahsue_23",
    },
    studio: {
      label: "진수의 창작실",
      url: "https://zinsue.github.io",
    },
    fourth: {
      label: "네 번째 이야기",
      url: "",
      // 빈 박스 위에 표시할 내용입니다. title을 비워 두면 원본처럼 보입니다.
      title: "",
      description: "",
    },
  },

  // 5번째부터 표시되는 카드입니다. 개수 제한 없이 {} 항목을 추가하세요.
  // 아래 항목을 복사해서 제목·설명·주소를 바꾸세요.
  // paper: 1~4 중 원하는 종이 모양. 생략하면 네 모양이 순서대로 반복됩니다.
  extra: [
    {
       title: "사진으로 남긴 일상",
       description: "우리의 작은 순간들을 모았어요",
       url: "https://example.com",
       tone: "sage", // sage(초록), rose(분홍), blue(파랑), honey(노랑)
       paper: 1,
     },
    {
       title: "이야기 나누기",
       description: "반가운 소식을 기다려요",
       url: "", // 이메일 링크는 mailto:이메일주소
       tone: "rose",
       paper: 2,
     },
  ],

  // true로 바꾸면 웹 링크를 새 탭에서 엽니다.
  openInNewTab: false,
};
