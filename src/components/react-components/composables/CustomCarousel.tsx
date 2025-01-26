import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselProps = {
  imageLink: string[]
}

export default function CustomCarousel({imageLink} : CarouselProps) {
    const listItems = imageLink.map(link =>
    <CarouselItem key={link} className="px-0">
      <img src={link} alt="" referrerPolicy='no-referrer' className='w-full h-full object-cover' />
    </CarouselItem>
  );
  return (
    <Carousel plugins={[
      Autoplay({
        stopOnMouseEnter: true,
        delay: 6000,
        stopOnInteraction: true,
      }),
    ]}  opts={{ loop: true, duration: 100 }}>
      <CarouselContent>
        {listItems}
      </CarouselContent>
      <CarouselPrevious className='translate-x-20 bg-white/60' />
      <CarouselNext className='-translate-x-20 bg-white/60' />
    </Carousel>
  )
}
