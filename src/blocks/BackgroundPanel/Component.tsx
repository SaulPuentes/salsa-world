import clsx from 'clsx';
import Image from 'next/image';
import { CMSLink } from '@/components/Link';
import { BackgroundPanelBlock as BackgroundPanelProps } from '@/payload-types';
import { isMedia } from '@/utilities/isMedia';

export const BackgroundPanelBlock: React.FC<BackgroundPanelProps> = ({
  link,
  height = 'md',
  showLogo = false,
  textContent,
  backgroundImageDesktop,
  backgroundImageMobile,
}) => {
  const heightClasses = {
    sm: 'h-[344px]',
    md: 'h-[417px]',
    lg: 'h-[531px]',
  };

  return (
    <div
      className={clsx(
        'relative w-full flex items-center justify-center text-center overflow-hidden',
        heightClasses[height]
      )}
    >
      {isMedia(backgroundImageMobile) && (
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${backgroundImageMobile.url})` }}
        />
      )}
      {isMedia(backgroundImageDesktop) && (
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${backgroundImageDesktop.url})` }}
        />
      )}

      {/* Overlay content */}
      <div className="relative z-10 px-4 text-white flex flex-col gap-4 items-center">
        {showLogo && (
          <Image
            src={'/img/isotype.svg'}
            alt={'Logo'}
            width={146}
            height={191}
            className="object-cover"
            priority
          />
        )}
        {textContent && (
          <h2 className="text-3xl md:text-[64px] md:leading-[1.3em] max-w-[700px] mx-auto">
            {textContent}
          </h2>
        )}
        {link?.label && link?.url && (
          <CMSLink
            url={link.url}
            className="text-xl md:text-2xl bg-orange text-white px-12 h-12 mt-3"
            appearance="orange"
          >
            {link.label}
          </CMSLink>
        )}
      </div>

      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};
