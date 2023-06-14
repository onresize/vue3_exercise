import { getCurrentInstance } from "vue";
import BtnAudio from "@/assets/audio/3761.wav";

let soundName = "",
  soundObj = ["3761"]; // 音频命名数组
const sound = {
  mounted(el, binding) {
    // console.log("sound指令：", el, binding);
    soundName = binding?.value;
    el.addEventListener("click", handleClick);
  },
  beforeUnmount(el) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

function handleClick(this) {
  // const { proxy, appContext } = getCurrentInstance();
  console.log("点击sound指令：", this);
  if (soundName && soundObj.indexOf(soundName) > -1) {
    console.log(`开始播放${soundName}.mp3-----------------`);
    let buttonAudio = document.getElementById("eventAudio");
    // buttonAudio.setAttribute("src", new URL(`@/assets/audio/${soundName}.wav`, import.meta.url).href);
    buttonAudio.setAttribute("src", BtnAudio);
    buttonAudio.play();
  }
}

export default sound;
