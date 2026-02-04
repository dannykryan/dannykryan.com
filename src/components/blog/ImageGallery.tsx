'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageBlock {
    id: string;
    image: {
        caption?: Array<{ plain_text: string }>;
        external?: { url: string };
        file?: { url: string };
    };
}

interface ImageGalleryProps {
    images: ImageBlock[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    return (
        <div className="mb-8 mt-4">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="rounded-lg"
            >
                {images.map((block) => {
                    const imageUrl = block.image?.external?.url || block.image?.file?.url;
                    const caption = block.image?.caption?.map((text) => text.plain_text).join('') || '';
                    
                    if (!imageUrl) return null;
                    
                    return (
                        <SwiperSlide key={block.id}>
                            <div className="relative w-full h-[600px]">
                                <Image
                                    src={`/api/notion-image/${block.id}`}
                                    alt={caption || 'Gallery image'}
                                    className="object-cover rounded"
                                    fill={true}
                                />
                            </div>
                            {caption && (
                                <p className="caption text-sm mt-2 text-center">{caption}</p>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}