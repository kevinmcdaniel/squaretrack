import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { montsie } from '@/ui/fonts';

export const SquareTrackLogo = () => {
  return (
    <div
      className={`${montsie.className} flex flex-row items-center leading-none text-gray-700`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[55px]">[SquareTrack]</p>
    </div>
  );
}
