/**
 * Animation utilities for element interactions
 */

export const MERGE_ANIMATION_DURATION = 400; // ms
export const SHAKE_ANIMATION_DURATION = 300; // ms

/**
 * Play merge animation - simple fade out for both elements
 */
export function playMergeAnimation(
  el1Id: string,
  el2Id: string,
  midpoint: { x: number; y: number }
): Promise<void> {
  return new Promise((resolve) => {
    const el1 = document.getElementById(el1Id);
    const el2 = document.getElementById(el2Id);

    if (!el1 || !el2) {
      resolve();
      return;
    }

    // Simple fade animation using Web Animations API
    const fadeAnimation = [
      { opacity: 1 },
      { opacity: 0 }
    ];

    const animationOptions: KeyframeAnimationOptions = {
      duration: MERGE_ANIMATION_DURATION,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    el1.animate(fadeAnimation, animationOptions);
    el2.animate(fadeAnimation, animationOptions);

    setTimeout(() => {
      resolve();
    }, MERGE_ANIMATION_DURATION);
  });
}

/**
 * Play shake animation - subtle horizontal shake
 */
export function playShakeAnimation(elId: string): void {
  const el = document.getElementById(elId);
  if (!el) return;

  // Subtle shake animation using Web Animations API
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-2px)' },
    { transform: 'translateX(2px)' },
    { transform: 'translateX(-2px)' },
    { transform: 'translateX(0)' }
  ], {
    duration: SHAKE_ANIMATION_DURATION,
    easing: 'ease-in-out'
  });
}

/**
 * Play appear animation for newly created element
 */
export function playAppearAnimation(elId: string): void {
  const el = document.getElementById(elId);
  if (!el) return;

  // Gentle appear animation using Web Animations API
  el.animate([
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ], {
    duration: 300,
    easing: 'ease-out',
    fill: 'forwards'
  });
}

/**
 * CSS keyframes for animations (to be added to global styles or component)
 */
export const animationStyles = `
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-5px) rotate(-5deg); }
  75% { transform: translateX(5px) rotate(5deg); }
}

@keyframes appear {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.shake-animation {
  animation: shake ${SHAKE_ANIMATION_DURATION}ms ease-in-out;
}

.appear-animation {
  animation: appear 300ms ease-out;
}
`;
