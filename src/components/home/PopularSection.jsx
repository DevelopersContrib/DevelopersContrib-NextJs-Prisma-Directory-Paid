"use client"
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Text Limit Truncate
import TextLimit from './TextLimit';

const PopularSection = ({popular_domains}) => {
  return (
    <section className="tw-py-12">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h2 className="tw-font-bold tw-text-3xl mb-3">Popular Section</h2>
          </div>
          <div className="col-xl-12 tw-min-h-[200px] lg:tw-min-h-[350px]">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
             {popular_domains.data.domains.map((popular_domain) => (
                <SwiperSlide key={popular_domain.domain_name}>
                  <div className='tw-inline-flex tw-w-full tw-h-full tw-flex-col tw-relative tw-pb-4'>
                    <div className="tw-w-full tw-relative">
                      <Image
                        src={popular_domain.background==='' || popular_domain.background=== null ?'https://cdn.vnoc.com/icons/chat-vertical/chat-popular-image6.png':popular_domain.background}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        className='img-fluid tw-w-full tw-rounded-tr-xl tw-rounded-tl-xl'
                      />
                    </div>
                    <div className="tw-bg-white tw-rounded-br-xl tw-rounded-bl-xl tw-p-2 tw-shadow-[0px_4px_10px_6px_rgb(0_0_0_/_5%)]">
                      <div className="tw-w-[200px] tw-mt-[-45px] tw-mx-auto tw-relative">
                        <Image
                          src={popular_domain.logo==='' || popular_domain.logo=== null ?'https://cdn.vnoc.com/logos/chat-default2.png':popular_domain.logo}
                          width={0}
                          height={0}
                          sizes="100vw"
                          alt=""
                          className='img-fluid tw-w-full tw-rounded-tr-xl tw-rounded-tl-xl'
                        />
                      </div>
                      <div className="tw-w-full text-center">
                        <h2 className='tw-font-semibold tw-text-base tw-mb-4'>
                          <a href={popular_domain.domain_name} target='_blank' className='tw-no-underline'>{popular_domain.domain_name}</a>
                        </h2>
                        <p>
                          <TextLimit text={popular_domain.description} limit={80} />
                        </p>
                        <div className="text-center mb-4">
                          <a href={`https://www.contrib.com/signup/firststep?domain=`+popular_domain.domain_name} className="btn btn-primary">
                            Contribute
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide> 
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularSection