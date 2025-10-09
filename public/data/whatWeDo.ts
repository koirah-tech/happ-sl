
/** 1) define the shape of each item */
interface ServiceItem {
    iconHref: string
    service: string
    description: string
}

export const services: ServiceItem[] = [
    {
        iconHref: "/icons/sprite.svg#briefcase-vector-icon",
        service: 'Business Consulting',
        description:
            'Practical, affordable guidance to help you structure, grow, and sustain your small business.',
    },
    {
        iconHref: "/icons/sprite.svg#video-player-icon",
        service: 'Educational Classes',
        description:
            'Online and interactive training on essential business and marketing skills. Learn how to grow your business the smart and sustainable way.',
    },
    {
        iconHref: "/icons/sprite.svg#shop-online-store-ecommerce icon",
        service: 'Community Marketplace',
        description:
            'Join a network of fellow Latter-day Saint small entrepreneurs who share your values and uplift one another.',
    },
    {
        iconHref: "/icons/sprite.svg#group-vector-icon",
        service: 'Trusted Community',
        description:
            'Connect, collaborate, and find support among like-minded business owners across Africa.',
    },
]