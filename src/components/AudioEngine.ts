/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;

/**
 * Plays an ultra-premium, ascending synthesizer chime using the Web Audio API.
 * Represents success, luxury, wealth, and the milestone of entering the MZ+ private club.
 */
export function playSuccessChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master gain for smooth volume envelope
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    masterGain.connect(audioCtx.destination);

    // Prosperity & Ascension Chord Frequencies (A major 9th blended with deep sub-resonance)
    // 55Hz (Deep wealth), 110Hz (Stability), 220Hz (A3), 275Hz (C#4), 330Hz (E4), 440Hz (A4), 554Hz (C#5), 659Hz (E5), 880Hz (A5)
    const frequencies = [55, 110, 220, 275, 330, 440, 554, 659, 880];

    frequencies.forEach((freq, index) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      // Deep frequencies are warm triangles, high frequencies are pure sines
      osc.type = freq < 200 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Stagger note triggers for an ascending arpeggio (gateway effect)
      const noteDelay = index * 0.06;
      const noteStart = now + noteDelay;

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.setValueAtTime(0, noteStart);
      
      // Higher frequencies are softer to avoid piercing
      const maxVolume = freq < 200 ? 0.08 : 0.05 / (index + 1);
      oscGain.gain.linearRampToValueAtTime(maxVolume, noteStart + 0.2);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.0);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start(noteStart);
      osc.stop(noteStart + 2.8);
    });

    // Crystalline wealth shimmer (high pitch bell-like chime accents)
    for (let i = 0; i < 5; i++) {
      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();

      bellOsc.type = 'sine';
      const chimeTime = now + 0.6 + i * 0.1;
      const chimeFreq = 1500 + i * 250;

      bellOsc.frequency.setValueAtTime(chimeFreq, chimeTime);

      bellGain.gain.setValueAtTime(0, now);
      bellGain.gain.setValueAtTime(0, chimeTime);
      bellGain.gain.linearRampToValueAtTime(0.02, chimeTime + 0.04);
      bellGain.gain.exponentialRampToValueAtTime(0.00001, chimeTime + 0.5);

      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);

      bellOsc.start(chimeTime);
      bellOsc.stop(chimeTime + 0.6);
    }
  } catch (err) {
    console.warn("Web Audio API was prevented or is not supported in this environment:", err);
  }
}
