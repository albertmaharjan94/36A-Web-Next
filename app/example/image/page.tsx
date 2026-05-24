import Image from "next/image";
// assets must be imported
import img1 from "@/app/assets/img2.avif";

export default function ImagePage() {
    return (
        <div>
            Mero Image Page
            <img src="https://images.unsplash.com/photo-1773332598289-ed0444ad1d6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"/>
            
            <Image
                src="https://images.unsplash.com/photo-1779226347540-0393047b97b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Mero Image"
                height={100}
                width={100}
            />

            <img src="/img1.avif"/>
            <Image 
                src="/img1.avif"
                alt="Mero Local Image" 
                height={100} 
                width={200} 
            />

            <Image
                src={img1}
                alt="Mero Imported Image"
                height={100}
                width={200}
            />
        </div>
    );
}