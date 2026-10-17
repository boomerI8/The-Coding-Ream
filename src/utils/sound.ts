/**
 * Procedural Web Audio API sound synthesizer for CodeQuest.
 * Generates retro 8-bit chimes, fanfare, coin rings, and clicks in-browser
 * with zero external asset dependencies.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio playback safely ignored if disabled in environment
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // Arpeggio C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.16);
      });
    } catch {
      // Audio safely ignored
    }
  }

  public playCoin() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc1.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
      osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6
      osc2.frequency.setValueAtTime(1396.91, ctx.currentTime + 0.08); // F6

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio safely ignored
    }
  }

  public playError() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // Audio safely ignored
    }
  }

  public playLevelUp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // Fanfare: G4, C5, E5, G5, long high C6
      const notes = [
        { freq: 392.00, dur: 0.1, delay: 0 },
        { freq: 523.25, dur: 0.1, delay: 0.1 },
        { freq: 659.25, dur: 0.1, delay: 0.2 },
        { freq: 783.99, dur: 0.15, delay: 0.3 },
        { freq: 1046.50, dur: 0.5, delay: 0.45 },
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.delay);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + n.delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.delay + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + n.delay);
        osc.stop(ctx.currentTime + n.delay + n.dur);
      });
    } catch {
      // Audio safely ignored
    }
  }

  public playBossAlert() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio safely ignored
    }
  }

  public playBossVictory() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // High triumphant melody
      const notes = [
        { f: 587.33, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.12 },
        { f: 783.99, d: 0.12, t: 0.24 },
        { f: 880.00, d: 0.18, t: 0.36 },
        { f: 1046.50, d: 0.18, t: 0.54 },
        { f: 1174.66, d: 0.4, t: 0.72 },
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + n.t);
        osc.stop(ctx.currentTime + n.t + n.d);
      });
    } catch {
      // Audio safely ignored
    }
  }
}

export const sounds = new SoundManager();
