function gettestimonialdata(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onerror = () => {
      reject("kacau eh error");
    };
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };

    xhr.send();
  });
}

async function gettestimonialall() {
  const testimonials = await gettestimonialdata(
    "https://api.npoint.io/7078c0f840cddb212b05"
  );

  let testiarray = ``;

  testimonials.forEach((testu) => {
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
