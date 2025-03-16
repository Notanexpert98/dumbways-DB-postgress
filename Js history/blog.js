const blogs = [];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const convertdata1 = getFulltimeblog(new Date());

function Distancetime_F(timePost) {
  const time_now = new Date();
  const distance_time = time_now - timePost;
  const second_F = Math.floor(distance_time / 1000);
  const minutes_F = Math.floor(second_F / 60);
  const hours_F = Math.floor(minutes_F / 60);
  const day_F = Math.floor(hours_F / 1000);

  if (second_F < 60) {
    return `${second_F} second ago`;
  } else if (minutes_F < 60) {
    return `${minutes_F} minutes ago`;
  } else if (hours_F < 24) {
    return `${hours_F} hours ago`;
  } else {
    return `${day_F} days ago`;
  }
}

function getFulltimeblog(time) {
  const Date1 = time.getDate();
  const monthindex1 = time.getMonth();
  const years1 = time.getFullYear();
  let hours1 = time.getHours();
  let minutes1 = time.getMinutes();

  if (hours1 < 10) {
    hours1 = "0" + hours1;
  }

  if (minutes1 < 10) {
    minutes1 = "0" + minutes1;
  }

  return `${Date1} ${bulan[monthindex1]} ${years1}, Pukul ${hours1}:${minutes1} WIB`;
}
function addblog(event) {
  event.preventDefault();

  const input_title = document.getElementById("inputtitle-blog").value;
  const input_content = document.getElementById("inputcontent-blog").value;
  const input_img = document.getElementById("inputfile-blog").files;

  const blob_img = URL.createObjectURL(input_img[0]);

  const data = {
    title: input_title,
    content: input_content,
    image: blob_img,
    createdAt: new Date(),
  };

  blogs.unshift(data);
}

console.log(blogs);

function render_blog() {
  let html2 = ``;

  for (let i = 0; i < blogs.length; i++) {
    html2 += `<div class="dinamisslot">
        <img src="${blogs[i].image}" alt="" id="img_card">
        <div class="card_content">
        <h2>Riko Oktari Heriawan</h2>
        <br>
        <p class = "font_slot">Dibuat pada : ${getFulltimeblog(
          blogs[i].createdAt
        )}</p>
        <br>
        <p class = "font_slot">${blogs[i].content}</p>
 <br>
        <p class = "font_slot">${Distancetime_F(blogs[i].createdAt)}</p>
      </div></div>`;
  }

  document.getElementById("slot-blog").innerHTML = html2;
}

setInterval(() => {
  render_blog();
}, 1000);
