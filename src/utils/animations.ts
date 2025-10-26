/**
 * Animation utilities for element interactions
 */

export const MERGE_ANIMATION_DURATION = 300; // ms
export const SHAKE_ANIMATION_DURATION = 400; // ms

/**
 * Play merge animation - moves elements toward midpoint
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

    // Add merge animation class
    el1.style.transition = `all ${MERGE_ANIMATION_DURATION}ms ease-in-out`;
    el2.style.transition = `all ${MERGE_ANIMATION_DURATION}ms ease-in-out`;

    el1.style.transform = 'scale(1.1)';
    el2.style.transform = 'scale(1.1)';
    el1.style.opacity = '0.5';
    el2.style.opacity = '0.5';

    // Move to midpoint
    el1.style.left = `${midpoint.x}px`;
    el1.style.top = `${midpoint.y}px`;
    el2.style.left = `${midpoint.x}px`;
    el2.style.top = `${midpoint.y}px`;

    setTimeout(() => {
      resolve();
    }, MERGE_ANIMATION_DURATION);
  });
}

/**
 * Play shake animation - horizontal shake motion
 */
export function playShakeAnimation(elId: string): void {
  const el = document.getElementById(elId);
  if (!el) return;

  // Add shake class
  el.classList.add('shake-animation');

  // Remove after animation completes
  setTimeout(() => {
    el.classList.remove('shake-animation');
  }, SHAKE_ANIMATION_DURATION);
}

/**
 * Play appear animation for newly created element
 */
export function playAppearAnimation(elId: string): void {
  const el = document.getElementById(elId);
  if (!el) return;

  el.classList.add('appear-animation');

  setTimeout(() => {
    el.classList.remove('appear-animation');
  }, 300);
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
