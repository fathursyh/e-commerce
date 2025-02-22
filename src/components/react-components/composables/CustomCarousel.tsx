import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

type CarouselProps = {
  imageLink: string[]
}

export default function CustomCarousel({imageLink} : CarouselProps) {
    const listItems = imageLink.map(link =>
    <CarouselItem key={link} className="px-0">
      <img srcSet={link} alt="carousel image" referrerPolicy='no-referrer' className='w-full h-full object-cover' loading='lazy' decoding='async'/>
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
    </Carousel>
  )
}
