import { inter, montsie } from "@/ui/fonts";
import { SquareTrackLogo } from "@/ui/elements/logo";

/**
 * Home now renders inside the app shell (the sidebar provides navigation, and the
 * squareset picture lives in the sidebar header). The right pane is a simple
 * welcome: the wordmark logo, name, and tagline.
 */
export default function Home() {
  return (
    <section className="flex h-full flex-col justify-center gap-6">
      <SquareTrackLogo />
      <p className={`${montsie.className} text-xl text-gray-700 md:text-3xl md:leading-normal`}>
        <strong>Go Square Tracking</strong>
      </p>
      <p className={`${inter.className} text-xl text-gray-500 md:text-2xl md:leading-normal`}>
        All you need to know about square dance.
      </p>
    </section>
  );
}
