/**
 * Ref-counted scroll lock.
 *
 * Adds / removes `scroll-locked` class on <html>.
 * Because html has `scrollbar-gutter: stable`, the gutter space
 * is preserved even when overflow is hidden → ZERO layout shift.
 *
 * Multiple consumers (LoaderOverlay, FullScreenNav, route transitions)
 * can call lock/unlock independently; native scroll only resumes
 * when ALL consumers have released their lock.
 */

let lockCount = 0;

export function lockBodyScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    document.documentElement.classList.add("scroll-locked");
  }
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.classList.remove("scroll-locked");
  }
}
