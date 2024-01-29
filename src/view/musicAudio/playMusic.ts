import { playMusicButtonOff, playMusicButtonOn } from '../options/optionsElements';
import nfsMp3 from '../../../assets/music/nfs.mp3';

export const playMusic = () => {
    let isPlaying = false;
    const audio = new Audio(nfsMp3);

    playMusicButtonOn.addEventListener('click', async () => {
        if (!isPlaying) {
            await audio.play();

            isPlaying = true;
            playMusicButtonOn.disabled = true;
        }
    });

    playMusicButtonOff.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;

        isPlaying = false;
        playMusicButtonOn.disabled = false;
    });
};
