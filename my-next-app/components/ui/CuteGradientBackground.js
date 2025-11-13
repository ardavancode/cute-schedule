'use client';

import BackgroundGradientAnimation from './BackgroundGradientAnimation';

/**
 * Cute Gradient Background Component
 * Pre-configured background with Cute Schedule theme colors
 */
export default function CuteGradientBackground() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(3, 121, 113, 0.75)"
      gradientBackgroundEnd="rgba(39, 93, 173, 0.78)"
      firstColor="3, 121, 113"
      secondColor="33, 78, 93"
      thirdColor="39, 93, 173"
      fourthColor="212, 245, 245"
      fifthColor="240, 234, 214"
      pointerColor="39, 93, 173"
      size="88%"
      blendingValue="soft-light"
      containerClassName="fixed inset-0"
      interactive={true}
    />
  );
}
