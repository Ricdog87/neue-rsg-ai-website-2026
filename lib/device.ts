/**
 * Erkennt iOS / iPadOS — inkl. iPadOS 13+, das sich als MacIntel meldet.
 * Wird beim ElevenLabs-Sprachagenten genutzt, um auf iOS auf `websocket`
 * statt `webrtc` zu wechseln: der WebSocket-Pfad hat seit @elevenlabs/client
 * v1.8.1 das dokumentierte iOS-Audio-Priming (Gesten-Unlock + 100 ms-Stille
 * + explizites audioElement.play()). Der WebRTC-Pfad delegiert dagegen an
 * LiveKit, das `playsInline` nur auf Video-Elemente setzt — auf iPadOS
 * Safari bleibt das <audio> dadurch stumm.
 */
export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/.test(ua)) return true;
  // iPadOS 13+ meldet sich als MacIntel; Touch-Points verraten den iPad.
  return navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1;
}
