/**
 * Balinese Music Audio Engine
 * Primary: Official "Balinese Harmony" (YouTube ID: XInueyp7hmg) via YouTube IFrame API
 * Fallback: Authentic Balinese Gamelan & Suling Web Audio Synthesizer
 */

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

class BalineseMusicManager {
  private ytPlayer: any = null;
  private isYtReady: boolean = false;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private pendingPlay: boolean = false;
  private listeners: ((playing: boolean) => void)[] = [];
  private fallbackEngine: WebAudioGamelanEngine | null = null;
  private useFallback: boolean = false;

  public readonly songTitle = 'Balinese Harmony';
  public readonly videoId = 'XInueyp7hmg';

  constructor() {
    if (typeof window !== 'undefined') {
      this.initYouTube();
    }
  }

  private initYouTube() {
    // Create hidden container for YouTube player
    if (!document.getElementById('yt-balinese-container')) {
      const container = document.createElement('div');
      container.id = 'yt-balinese-container';
      container.style.position = 'fixed';
      container.style.bottom = '-200px';
      container.style.right = '-200px';
      container.style.width = '10px';
      container.style.height = '10px';
      container.style.opacity = '0.01';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-9999';

      const playerDiv = document.createElement('div');
      playerDiv.id = 'yt-balinese-player';
      container.appendChild(playerDiv);
      document.body.appendChild(container);
    }

    const setupPlayer = () => {
      try {
        this.ytPlayer = new window.YT.Player('yt-balinese-player', {
          height: '100',
          width: '100',
          videoId: this.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: this.videoId, // Required for loop in YouTube iframe
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              this.isYtReady = true;
              event.target.setVolume(75);
              if (this.pendingPlay) {
                this.pendingPlay = false;
                event.target.playVideo();
                this.isPlaying = true;
                this.notify();
              }
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                this.isPlaying = true;
                this.notify();
              } else if (event.data === 2 || event.data === 0) {
                this.isPlaying = false;
                this.notify();
              }
            },
            onError: () => {
              console.warn('YouTube audio player error, switching to native Gamelan fallback');
              this.switchToFallback();
            },
          },
        });
      } catch (err) {
        console.warn('Error setting up YouTube player:', err);
        this.switchToFallback();
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      // Save existing callback if any
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setupPlayer();
      };

      // Load YouTube IFrame API script if not loaded
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }

  private switchToFallback() {
    this.useFallback = true;
    if (!this.fallbackEngine) {
      this.fallbackEngine = new WebAudioGamelanEngine();
    }
    if (this.isPlaying || this.pendingPlay) {
      this.fallbackEngine.play();
    }
  }

  public play() {
    if (this.useFallback) {
      this.fallbackEngine?.play();
      this.isPlaying = true;
      this.notify();
      return;
    }

    if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      try {
        this.ytPlayer.playVideo();
        if (this.isMuted) {
          this.ytPlayer.mute();
        } else {
          this.ytPlayer.unMute();
        }
        this.isPlaying = true;
        this.notify();
      } catch (e) {
        console.warn('Unable to play via YouTube player:', e);
        this.switchToFallback();
      }
    } else {
      this.pendingPlay = true;
      this.isPlaying = true;
      this.notify();

      // If YouTube doesn't become ready within 2.5s, trigger fallback so music still plays
      setTimeout(() => {
        if (!this.isYtReady && this.pendingPlay) {
          console.log('YouTube initialization delayed, activating Balinese Gamelan synth fallback');
          this.switchToFallback();
        }
      }, 2500);
    }
  }

  public pause() {
    this.pendingPlay = false;
    this.isPlaying = false;

    if (this.useFallback) {
      this.fallbackEngine?.pause();
    } else if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try {
        this.ytPlayer.pauseVideo();
      } catch (e) {
        console.warn('Error pausing YouTube:', e);
      }
    }
    this.notify();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.useFallback) {
      this.fallbackEngine?.setMuted(muted);
    } else if (this.isYtReady && this.ytPlayer) {
      try {
        if (muted) {
          this.ytPlayer.mute();
        } else {
          this.ytPlayer.unMute();
        }
      } catch (e) {
        console.warn('Error setting YouTube mute:', e);
      }
    }
    this.notify();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }
}

/**
 * Fallback Web Audio Gamelan Synthesizer
 * Ensures peaceful traditional Balinese gamelan music is always available
 */
class WebAudioGamelanEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;
  private readonly notes = [164.81, 185.0, 220.0, 246.94, 277.18, 369.99, 415.3, 440.0, 554.37, 739.99];

  private initAudio() {
    if (this.audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.audioCtx = new AudioContextClass();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);
  }

  public play() {
    this.initAudio();
    if (!this.audioCtx || !this.masterGain) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isPlaying = true;
    this.scheduleNotes();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.35, this.audioCtx.currentTime);
    }
  }

  private scheduleNotes() {
    if (!this.isPlaying || !this.audioCtx || !this.masterGain) return;

    const freq = this.notes[Math.floor(Math.random() * this.notes.length)];
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.8);

    const nextDelay = 450 + Math.random() * 600;
    this.timer = window.setTimeout(() => this.scheduleNotes(), nextDelay);
  }
}

export const gamelanAudio = new BalineseMusicManager();
