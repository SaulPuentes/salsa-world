import { HeadingSectionBlock as HeadingSectionProps} from '@/payload-types';
import clsx from 'clsx';


export const HeadingSectionBlock: React.FC<HeadingSectionProps> = ({
  heading,
  description,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-[42px]',
    xl: 'text-5xl md:text-6xl',
  };

  return (
    <section className="text-center px-4 pt-8 pb-8 lg:pb-16">
      <h2 className={clsx('font-bold', sizeClasses[size])}>
        {heading}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg">
          {description}
        </p>
      )}
    </section>
  );
};