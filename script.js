let userProfile = null;
let pendingContent = "";

function onSignIn(response) {
  const credential = response.credential;
  const payload = JSON.parse(atob(credential.split('.')[1]));
  userProfile = payload;
  document.getElementById("user").innerText = payload.email;
  document.getElementById("app").style.display = "block";
}

function showCaptcha() {
  const content = document.getElementById("note").value.trim();
  if (!content) {
    alert("Cannot save an empty note!");
    return;
  }
  pendingContent = content;
  document.getElementById("captchaBox").style.display = "block";
}

function onCaptchaSuccess() {
  saveFile(pendingContent);
  document.getElementById("captchaBox").style.display = "none";
  grecaptcha.reset(); // reset reCAPTCHA for next time
}

function saveFile(content) {
  const fileName = "note_" + new Date().toLocaleString();
  const fileDiv = document.createElement("div");
  fileDiv.className = "file";
  fileDiv.innerHTML = `<span class="filename">${fileName}</span><br>
                       <pre>${content}</pre>`;
  document.getElementById("fileList").prepend(fileDiv);
  document.getElementById("note").value = "";
}
