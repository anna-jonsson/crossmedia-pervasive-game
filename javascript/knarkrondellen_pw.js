// await function Knark_pw(password) {

//     const password_knarkrondellen = await check_password("knarkrondellen", password);

// };

function input_fields() {
  let wrapper = document.querySelector("#mainContent");
  wrapper.innerHTML = ` 
      <form>
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      </form>`;

  document.querySelectorAll(".inputs").forEach((input) => {
    input.addEventListener("keyup", function (e) {
      if (this.value.length == this.maxLength) {
        e.preventDefault();

        if (this.nextElementSibling != null) {
          this.nextElementSibling.focus();
        }
      } else if (e.key === "Backspace") {
        if (this.previousElementSibling != null) {
          this.previousElementSibling.focus();
        }
      }
    });
  });
}

input_fields();
