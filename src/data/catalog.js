// Demo content shared by the page views.
export const featuredProducts = [
    { id: 1, name: "Acid Logo Tee", category: "Heavyweight Cotton", price: "$35", image: "./assets/images/photo-1521572163474-6864f9cf17ab.jpg" },
    { id: 2, name: "Studio Tote", category: "Canvas 12oz", price: "$22", image: "./assets/images/studio-tote.jpg" },
    { id: 3, name: "Chaos Mug", category: "Ceramic 11oz", price: "$18", image: "./assets/images/photo-1514228742587-6b1558fcca3d.jpg" },
];

export const allProducts = [
    ...featuredProducts,
    { id: 4, name: "Slime Sticker Pack", category: "Die-cut Vinyl", price: "$12", image: "./assets/images/photo-1582213782179-e0d53f98f2ca.jpg" },
    { id: 5, name: "Varsity Hoodie", category: "Fleece 400gsm", price: "$65", image: "./assets/images/photo-1556821840-3a63f95609a7.jpg" },
    { id: 6, name: "Custom Mailer", category: "Branded Packaging", price: "Custom", image: "./assets/images/custom-mailer.jpg" },
    { id: 7, name: "Embroidered Cap", category: "Headwear", price: "$28", image: "./assets/images/photo-1588850561407-ed78c282e89b.jpg" },
    { id: 8, name: "Art Print A3", category: "Giclée Print", price: "$40", image: "./assets/images/photo-1513519245088-0e12902e5a38.jpg" },
];

export const testimonials = [
    { id: 1, author: "Sarah Jenkins", company: "Neon Records", text: "CoolConcept took our festival merch from basic to sold-out in hours. The quality of the prints and the weird, wonderful illustrations are unmatched." },
    { id: 2, author: "Marcus Tran", company: "Ramen Boy", text: "The custom packaging they designed for our pop-up was insanely good. People were taking photos of the boxes before they even saw the food." },
    { id: 3, author: "Elena Rostova", company: "Independent Artist", text: "Working with them on my first apparel drop was seamless. They understood my vision and translated it perfectly onto heavyweight garments." }
];

export const portfolioItems = [
    { title: "Neon Tokyo Drop", category: "Apparel & Illustration", image: "./assets/images/hero-shirt.jpg" },
    { title: "Brew Co. Packaging", category: "Branding", image: "./assets/images/photo-1614735241165-6756e1df61ab.jpg" },
    { title: "Skate Deck Series", category: "Custom Merch", image: "./assets/images/photo-1564982752979-3f7bc974d29a.jpg" },
    { title: "Festival Identity", category: "Graphic Design", image: "./assets/images/photo-1514525253161-7a46d19cd819.jpg" },
    { title: "Vinyl Sticker Pack", category: "Illustration", image: "./assets/images/photo-1572375992501-4b0892d50c69.jpg" },
    { title: "Cafe Rebrand", category: "Branding", image: "./assets/images/photo-1497935586351-b67a49e012bf.jpg" },
];

export const servicesList = [
    { id: 1, title: "Custom Merchandise", desc: "Premium blank sourcing, screen printing, DTG, embroidery, and custom tag manufacturing. We handle production from start to finish." },
    { id: 2, title: "Brand Identity", desc: "Logos, color systems, typography, and brand guidelines that stand out in a saturated digital landscape." },
    { id: 3, title: "Illustration", desc: "Bespoke vector and raster artwork for apparel, posters, album covers, and editorial use." },
    { id: 4, title: "Packaging Design", desc: "Custom mailers, labels, poly bags, and retail packaging that elevate the unboxing experience." }
];
