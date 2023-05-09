function input_fields() {
  let PW = [];

  let Inputwrapper = document.createElement("div");
  Inputwrapper.innerHTML = ` 
      <form>
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      <input class="inputs" type="text" pattern="[0-9]" maxlength="1" />
      </form>
      `;
  document.querySelector("#mainContent").appendChild(Inputwrapper);
  document.querySelectorAll(".inputs").forEach((input) => {
    input.addEventListener("keyup", function (e) {
      if (this.value.length == this.maxLength) {
        e.preventDefault();

        if (PW.length != 6) {
          console.log(PW.push(input.value));
        }
        if (this.nextElementSibling != null) {
          this.nextElementSibling.focus();
        }

        if (this.previousElementSibling == null) {
          this.nextElementSibling.focus();
        }
      }

      if (e.key === "Backspace") {
        if (this.previousElementSibling != null) {
          this.previousElementSibling.value = "";
          var index = PW.indexOf(this.input, this.value);
          console.log(PW.splice(index, 1));
          this.previousElementSibling.focus();
        }
        if (this.nextElementSibling === null || this.previousElementSibling === null) {
          var index = PW.indexOf(this.input, this.value);
          console.log(PW.splice(index, 1));
        }
      }
      if (isNaN(input.value)) {
        //put user_feedback(wrong input here)
        console.log("this must be a number");
        return;
      }
      if (input.value === "" || input.value == " ") {
        return;
      }
    });
    return PW;
  });
}
