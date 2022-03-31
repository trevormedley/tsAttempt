import { Howl } from "howler";
import winChime from "../Sound/WinChime_1.mp3"
import cellClick from "../Sound/cellClick_1.mp3"
import flagClick from "../Sound/flagClick_1.mp3"
import lossSad from "../Sound/lossSad_1.mp3"
import menuClick from "../Sound/menuClick_1.mp3"
import menuClick2 from "../Sound/menuClick2_1.mp3"
import menuClick3 from "../Sound/menuClick3_1.mp3"
import menuClick4 from "../Sound/menuClick4_1.mp3"
import outOfTime from "../Sound/outOfTime_1.mp3"
import timeBomb from "../Sound/timeBomb_1.mp3"
import winPeaceful from "../Sound/winPeaceful_1.mp3"
import explosion from "../Sound/explosion_1.mp3"

export const playWinChime = () => {
  const sound = new Howl({
    src: winChime,
  });
  sound.play();
};

export const playCellClick = () => {
  const sound = new Howl({
    src: cellClick,
  });
  sound.play();
};

export const playFlagClick = () => {
  const sound = new Howl({
    src: flagClick,
  });
  sound.play();
};

export const playLossSad = () => {
  const sound = new Howl({
    src: lossSad,
  });
  sound.play();
};

export const playMenuClick = () => {
  const sound = new Howl({
    src: menuClick,
  });
  sound.play();
};

export const playMenuClick2 = () => {
  const sound = new Howl({
    src: menuClick2,
  });
  sound.play();
};

export const playMenuClick3 = () => {
  const sound = new Howl({
    src: menuClick3,
  });
  sound.play();
};

export const playMenuClick4 = () => {
  const sound = new Howl({
    src: menuClick4,
  });
  sound.play();
};

export const playOutOfTime = () => {
  const sound = new Howl({
    src: outOfTime,
  });
  sound.play();
};

export const playTimeBomb = () => {
  const sound = new Howl({
    src: timeBomb,
  });
  sound.play();
};

export const playWinPeaceful = () => {
  const sound = new Howl({
    src: winPeaceful,
  });
  sound.play();
};

export const playExplosion = () => {
  const sound = new Howl({
    src: explosion,
  });
  sound.play();
};

