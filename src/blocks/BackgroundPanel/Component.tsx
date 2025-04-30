import clsx from 'clsx';
import Image from 'next/image';

type Media = {
  url?: string;
  alt?: string;
};

type BackgroundPanelProps = {
  backgroundImageDesktop?: Media;
  backgroundImageMobile?: Media;
  showLogo?: boolean;
  heading?: string;
  height?: 'sm' | 'md' | 'lg';
};

export const BackgroundPanelBlock: React.FC<BackgroundPanelProps> = ({
  backgroundImageDesktop,
  backgroundImageMobile,
  showLogo = false,
  heading,
  height = 'md',
}) => {
  const heightClasses = {
    sm: 'h-40 md:h-[344px]',
    md: 'h-[417px]',
    lg: 'h-96 md:h-[531px]',
  };

  return (
    <div
      className={clsx(
        'relative w-full flex items-center justify-center text-center overflow-hidden',
        heightClasses[height]
      )}
    >
      {backgroundImageMobile?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${backgroundImageMobile.url})` }}
        />
      )}
      {backgroundImageDesktop?.url && (
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
            fill
            className="object-cover"
            priority
          />
        )}
        {heading && <h2 className="text-xl md:text-3xl font-bold">{heading}</h2>}
      </div>

      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};
