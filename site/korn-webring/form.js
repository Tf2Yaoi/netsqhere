const s_formId = '1FAIpQLSfLbjC3QA18vrPyb5EcLQ37fG5HLuh_hPErmlExKJd9NoskCQ';
const s_websiteUrlId = '469989046';
const s_websiteNameId = '1784106642';
const s_albumId = '1643393115';
const s_songId = '534532198';
const s_descriptionId = '1057042515';
const s_siteButtonId = '1521879818';
const s_emailId = '1952867200';

const s_maxLength = 500;
const s_maxLengthName = 50;

const s_commentsOpen = true;

const v_mainHtml = `
<div id="c_inputDiv">
  <form id="c_form" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse">
  </form>
  <div id="c_message" style="color:green; margin-top:10px; display:none;">Thank you! Your application has been received.</div>
</div>
`;

const v_formHtml = `
<div class="c-inputWrapper">
  <label for="entry.${s_websiteUrlId}">Website URL<span>*</span></label>
  <input name="entry.${s_websiteUrlId}" id="entry.${s_websiteUrlId}" type="url" pattern="https://.*" required>
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_websiteNameId}">Website name or Your name<span>*</span></label>
  <input name="entry.${s_websiteNameId}" id="entry.${s_websiteNameId}" type="text" maxlength="${s_maxLengthName}" required>
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_siteButtonId}">Site Button URL<span>*</span></label>
  <input name="entry.${s_siteButtonId}" id="entry.${s_siteButtonId}" type="url" pattern="https://.*" placeholder="https://example.com/button.gif" required>
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_albumId}">Favourite album?<span>*</span></label>
  <select name="entry.${s_albumId}" id="entry.${s_albumId}" required>
    <option value="" disabled selected>Select an album...</option>
    <option value="Korn">Korn</option>
    <option value="Life Is Peachy">Life Is Peachy</option>
    <option value="Follow the Leader">Follow the Leader</option>
    <option value="Issues">Issues</option>
    <option value="Untouchables">Untouchables</option>
    <option value="Take a Look in the Mirror">Take a Look in the Mirror</option>
    <option value="See You on the Other Side">See You on the Other Side</option>
    <option value="Untitled album">Untitled album</option>
    <option value="Korn III: Remember Who You Are">Korn III: Remember Who You Are</option>
    <option value="The Path of Totality">The Path of Totality</option>
    <option value="The Paradigm Shift">The Paradigm Shift</option>
    <option value="The Serenity of Suffering">The Serenity of Suffering</option>
    <option value="The Nothing">The Nothing</option>
    <option value="Requiem">Requiem</option>
  </select>
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_songId}">Favourite Song?<span>*</span></label>
  <input name="entry.${s_songId}" id="entry.${s_songId}" type="text" maxlength="${s_maxLength}" required>
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_descriptionId}">Short description</label>
  <input name="entry.${s_descriptionId}" id="entry.${s_descriptionId}" type="text" maxlength="${s_maxLength}">
</div>

<div class="c-inputWrapper">
  <label for="entry.${s_emailId}">Email</label>
  <input name="entry.${s_emailId}" id="entry.${s_emailId}" type="email">
</div>

<input id="c_submitButton" type="submit" value="Send" disabled>
`;

document.getElementById('c_widget').innerHTML = v_mainHtml;
const c_form = document.getElementById('c_form');
if (s_commentsOpen) { c_form.innerHTML = v_formHtml; }
else { c_form.innerHTML = '<p>Form is closed.</p>'; }

let v_submitted = false;
let c_hiddenIframe = document.createElement('iframe');
c_hiddenIframe.id = 'c_hiddenIframe';
c_hiddenIframe.name = 'c_hiddenIframe';
c_hiddenIframe.style.display = 'none';
c_hiddenIframe.onload = () => {
  if (v_submitted) {
    v_submitted = false;
    c_form.reset();
    c_submitButton.disabled = true;
    document.getElementById('c_message').style.display = 'block';
  }
};
c_form.appendChild(c_hiddenIframe);

let c_submitButton = document.getElementById('c_submitButton');

function checkFormFilled() {
  const websiteUrl = document.getElementById(`entry.${s_websiteUrlId}`).value.trim();
  const websiteName = document.getElementById(`entry.${s_websiteNameId}`).value.trim();
  const album = document.getElementById(`entry.${s_albumId}`).value;
  const song = document.getElementById(`entry.${s_songId}`).value.trim();
  const siteButton = document.getElementById(`entry.${s_siteButtonId}`).value.trim();

  if (websiteUrl && websiteName && album && song && siteButton) {
    c_submitButton.disabled = false;
  } else {
    c_submitButton.disabled = true;
  }
}

document.getElementById(`entry.${s_websiteUrlId}`).addEventListener('input', checkFormFilled);
document.getElementById(`entry.${s_websiteNameId}`).addEventListener('input', checkFormFilled);
document.getElementById(`entry.${s_albumId}`).addEventListener('change', checkFormFilled);
document.getElementById(`entry.${s_songId}`).addEventListener('input', checkFormFilled);
document.getElementById(`entry.${s_siteButtonId}`).addEventListener('input', checkFormFilled);
checkFormFilled();

c_form.onsubmit = () => {
  v_submitted = true;
  c_submitButton.disabled = true;
  document.getElementById('c_message').style.display = 'none';
};