import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  const cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "<div class='cover'></div>";

  const name = variables.name || "Name";
  const lastName = variables.lastName || "Last Name";
  const role = variables.role || "Role";
  const city = variables.city || "City";
  const country = variables.country || "Country";

  const socialLinks = [
    { name: "twitter", icon: "fab fa-twitter" },
    { name: "github", icon: "fab fa-github" },
    { name: "linkedin", icon: "fab fa-linkedin" },
    { name: "instagram", icon: "fab fa-instagram" }
  ];

  const renderedSocials = socialLinks
    .map(link =>
      variables[link.name]
        ? `<li><a href="https://${link.name}.com/${
            variables[link.name]
          }"><i class="${link.icon}"></i></a></li>`
        : ""
    )
    .join("");

  const positionClass =
    variables.socialMediaPosition === "position-left"
      ? "position-left"
      : "position-right";

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <ul class="${positionClass}">
        ${renderedSocials}
      </ul>
    </div>`;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background:
      "https://images.pexels.com/photos/2946979/pexels-photo-2946979.jpeg?auto=compress&cs=tinysrgb&w=600",
    avatarURL:
      "https://images.pexels.com/photos/4445619/pexels-photo-4445619.jpeg?auto=compress&cs=tinysrgb&w=600",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables);

  document.querySelectorAll(".picker").forEach(elm => {
    elm.addEventListener("change", e => {
      const attribute = e.target.getAttribute("data-attribute");
      const value = e.target.value;

      const parsedValue =
        value === "" || value === "null"
          ? null
          : value === "true"
          ? true
          : value === "false"
          ? false
          : value;

      const updatedVars = { [attribute]: parsedValue };
      render(Object.assign(window.variables, updatedVars));
    });
  });
};
