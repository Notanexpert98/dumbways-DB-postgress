// class testimonial {
//   title = "";
//   review = "";
//   author = "";
//   rating = 0;

//   constructor(title, review, author, rating) {
//     this.title = title;
//     this.review = review;
//     this.author = author;
//     this.rating = rating;
//   }

//   getHTML() {
//     return `<div class="testimonial_sub">
//         <h2 class="head2_testi">${this.title}</h2>
//         <br>
//         <p class="p_testi">${this.review}</p>
//         <br>
//         <h3 class="author_testi">${this.author}</h3>
//         <br>
//         <br>
//         <br>
//         <h3 class="rating_testi">${this.rating}</h3></div>`;
//   }
// }

const testall = [
  {
    title: "Facebook",
    content: "my favo social media for 14 years",
    author: "Mark Zukenberg",
    rating: 5,
  },
  {
    title: "Instagram",
    content: "my recent favo social media",
    author: "Kevin Systrom",
    rating: 4,
  },
  {
    title: "Telegram",
    content: "for incignito",
    author: "Ilya Stutker",
    rating: 3,
  },
];

function gettestimonialall() {
  let testiarray = ``;

  testall.forEach((testu) => {
    testiarray += `<div class="testimonial_sub">
         <h2 class="head2_testi">${testu.title}</h2>
         <br>
         <p class="p_testi">${testu.content}</p>
         <br>
         <h3 class="author_testi">${testu.author}</h3>
         <br>
         <br>
         <br>
         <h3 class="rating_testi">${testu.rating}</h3></div>`;
  });

  document.getElementById("filter_content").innerHTML = testiarray;
}

function gettestimonialbyrate(rating) {
  const filteredtesti = testall.filter((testimonial) => {
    if (testimonial.rating === rating) {
      return true;
    }
  });

  let testiarray1 = ``;

  filteredtesti.forEach((testu) => {
    testiarray1 += `<div class="testimonial_sub">
         <h2 class="head2_testi">${testu.title}</h2>
         <br>
         <p class="p_testi">${testu.content}</p>
         <br>
         <h3 class="author_testi">${testu.author}</h3>
         <br>
         <br>
         <br>
         <h3 class="rating_testi">${testu.rating}</h3></div>`;
  });

  document.getElementById("filter_content").innerHTML = testiarray1;
}
