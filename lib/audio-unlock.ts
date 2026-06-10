/**
 * iOS-Audio-Unlock — entsperrt sowohl den HTMLAudioElement- als auch den
 * Web-Audio-Pfad innerhalb einer User-Geste, BEVOR der ElevenLabs-SDK
 * irgendetwas tut.
 *
 * Warum nötig: iOS Safari/iPadOS lehnt jeden Audio-Output ab, der nicht
 * aus einer aktiven User-Geste startet. Sobald nach dem Click ein `await`
 * läuft, ist die User-Activation futsch — und der SDK kann sein Audio
 * danach nicht mehr abspielen, egal ob WebRTC (über LiveKit + <audio>) oder
 * WebSocket (über AudioContext + Worklet).
 *
 * Lösung: synchron im Click-Handler beide Audio-APIs anstoßen, BEVOR
 * irgendein async-Code läuft. play()/resume() liefern Promises, die
 * dürfen wir fire-and-forget halten — entscheidend ist, dass der CALL
 * synchron in der Geste passiert.
 *
 * Dieses Modul wird auch vom voice-console und live-voice-agent
 * importiert. Der AudioContext wird auf Modul-Ebene gecached, damit
 * Folge-Sessions denselben (bereits entsperrten) Context wiederverwenden.
 */

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

let cached: AudioContext | null = null;

/**
 * MUSS synchron im Click-/Touch-Handler aufgerufen werden, vor jedem await.
 * No-op auf SSR und beim Stille-Audio-Patcher schwerelos (kein Fehler-Werfen).
 */
export function unlockAudio(): void {
  if (typeof window === 'undefined') return;

  // 1) HTMLAudioElement-Unlock — für den LiveKit-/WebRTC-Pfad,
  //    der intern <audio>-Elemente attached.
  //    Das ist ein gültiges 1-Frame-Silent-WAV.
  try {
    const a = new Audio(
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
    );
    a.muted = false;
    (a as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    a.volume = 0;
    void a.play().catch(() => {});
  } catch {
    /* noop */
  }

  // 2) AudioContext-Unlock — für den ElevenLabs-WebSocket-Pfad
  //    (Web Audio API + AudioWorklet).
  try {
    const AC = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
    if (!AC) return;
    if (!cached) cached = new AC({ latencyHint: 'interactive' });
    if (cached.state === 'suspended') void cached.resume();

    // 1 Sample Stille spielen — cementiert den Unlock auf älteren iOS-Builds.
    const buf = cached.createBuffer(1, 1, 22050);
    const src = cached.createBufferSource();
    src.buffer = buf;
    src.connect(cached.destination);
    src.start(0);
  } catch {
    /* noop */
  }
}
